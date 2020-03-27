import { Request, Response, response } from "express";
import express from 'express';
import pool from '../../modules/pool';
import rejectUnauthenticated from '../../modules/authentication-middleware';

const router: express.Router = express.Router();

router.post('/', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.body.userId);
    const label: string | null = <string>req.body.label.toLowerCase();
    const hex_code: string | null = <string>req.body.hex_code;
    let colors_id: number | null;
    const achievementsId: number | null = <number>req.body.achievementsId;
    let pointsAwarded: number | null;

     //Posts the color to the colors table, returns id
    // console.log(userId);
    const queryText: string = `INSERT INTO "colors" ("label", "hex_code")
                                VALUES ($1, $2)
                                RETURNING id;`;
    pool.query(queryText, [label, hex_code])
    .then((response1) => {
        const colorsId = response1.rows.map((item, index) => {
            return colors_id = <number>item.id;
        })
        //Posts to the colors_users table uses returned id to associate color with user
        const queryText: string = `INSERT INTO "colors_user" ("user_id", "colors_id", "achievements_id")
                                    VALUES ($1, $2, $3);`;
        pool.query(queryText, [userId, ...colorsId, achievementsId])
        .then(response2 => {
            //Get request for achievements points
            const queryText = `SELECT "points" FROM "achievements"
                                WHERE "id" = $1;`;
            pool.query(queryText, [achievementsId])
            .then((response3) => {
                const pointsToAdd = response3.rows.map((item, index) => {
                    return pointsAwarded = <number>item.points;
                })
                //PUT request to add points to user
                const queryText = `UPDATE "user"
                                    SET "points" = "points" + $1
                                    WHERE "id" = $2
                                    RETURNING "points", "user_levels";`;
                pool.query(queryText, [...pointsToAdd, userId])
                .then((response4) => {
                    const newPointsTotal: number = response4.rows[0].points;
                    const currentUserLevel: number = response4.rows[0].user_levels;
                    //Gets level ids and qualifiers
                    const queryText = `SELECT * FROM "levels";`;
                    pool.query(queryText)
                    .then((response5) => {
                        const levelQualifiers: any = response5.rows.map((item, index) => {
                            return <number>item.qualifier;
                        })
                        //Creates a number-type variable of that equals the next level qualifier
                        let nextLvl: number = parseInt(levelQualifiers[(currentUserLevel)])

                        const levelsId = response5.rows.map((item, index) => {
                            return <number>item.id;
                        })
                        if(currentUserLevel >= levelQualifiers.length) {
                            res.sendStatus(201);   
                            } else if (newPointsTotal >= nextLvl){

                                console.log(newPointsTotal)
                                console.log(levelQualifiers[(currentUserLevel)])
                                console.log(currentUserLevel)

                                const queryText = `UPDATE "user"
                                                    SET "user_levels" = "user_levels" + 1
                                                    WHERE "id" = $1;`;
                                pool.query(queryText, [userId])
                                .then((response6) => {
                                    res.sendStatus(201);
                                })
                                .catch((err) => {
                                    res.sendStatus(500);
                                    console.log(err)
                                })
                            } else {
                                res.sendStatus(201);
                            }
                        })
                    .catch((err) => {
                        res.sendStatus(500);
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                })
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            })
        })                          
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    })
    .catch((err) => {
        console.log(`error posting color ${err}`)
        res.sendStatus(500);
    })
});

export default router;