import { Request, Response, response } from "express";
import express from 'express';
import pool from '../../modules/pool';
import rejectUnauthenticated from '../../modules/authentication-middleware';

const router: express.Router = express.Router();


//POST Request to add block by user
router.post('/', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.body.userId);
    const colorsId: number | null = <number>parseInt(req.body.colorsId);
    const achievementsId: number | null = <number>req.body.achievementsId;
    let pointsAwarded: number | null;
    // const pointsId: number | null = <number>req.body.pointsId;
    const queryText: string = `INSERT INTO "blocks" ("user_id", "colors_id", "achievements_id")
                                VALUES ($1, $2, $3);`;
    pool.query(queryText, [userId, colorsId, achievementsId])
    .then((response1) => {
        // res.send(response1.rows)
        //GET request for achievements points
        const queryText = `SELECT "points" FROM "achievements"
                            WHERE "id" = $1;`;
        pool.query(queryText, [achievementsId])
        .then((response2) => {
            const pointsToAdd = response2.rows.map((item, index) => {
                return pointsAwarded = <number>item.points;
            })
            //PUT request to add points to user
            const queryText = `UPDATE "user"
                                SET "points" = "points" + $1
                                WHERE "id" = $2
                                RETURNING "points", "user_levels";`;
            pool.query(queryText, [...pointsToAdd, userId])
            .then((response3) => {
                const newPointsTotal: number = response3.rows[0].points;
                const currentUserLevel: number = response3.rows[0].user_levels;
                //Gets level ids and qualifiers
                const queryText = `SELECT * FROM "levels";`;
                pool.query(queryText)
                .then((response4) => {
                    const levelQualifiers: any = response4.rows.map((item, index) => {
                        return <number>item.qualifier;
                    })
                    //Creates a number-type variable of that equals the next level qualifier
                    let nextLvl: number = parseInt(levelQualifiers[(currentUserLevel)])

                    const levelsId = response4.rows.map((item, index) => {
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
                            .then((response5) => {
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
    .catch((err) => {
        console.log(`error posting color ${err}`)
        res.sendStatus(500);
    })
});

export default router;