import { Request, Response, response } from "express";
import express from 'express';
import pool from '../../modules/pool';
import rejectUnauthenticated from '../../modules/authentication-middleware';

const router: express.Router = express.Router();

//GET Request colors by user
router.get('/:userId', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.params.userId);
    const queryText: string = `SELECT "colors_user".id, "colors".id AS "colorsId", "colors".label, "colors".hex_code FROM "colors"
                                JOIN "colors_user" ON "colors".id = "colors_user".colors_id
                                WHERE "colors_user".user_id = $1
                                AND "colors_user".deleted = FALSE;`;
    pool.query(queryText, [userId])
    .then((response) => {
        res.send(response.rows)
    })
    .catch((err) => {
        console.log(`error getting tasks ${err}`)
        res.sendStatus(500);
    })
});

//POST Request to add color by user
router.post('/post', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.body.userId);
    const label: string | null = <string>req.body.label;
    const hex_code: string | null = <string>req.body.hex_code;
    let colors_id: number | null;
    const achievementsId: number | null = <number>req.body.achievementsId;
    let pointsAwarded: number | null;
    // let newPointsFromServer: number | null;
    // let currentUserLevel: number | null;
    // console.log(achievementsId);

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
        const queryText: string = `INSERT INTO "colors_user" ("user_id", "colors_id")
                                    VALUES ($1, $2);`;
        pool.query(queryText, [userId, ...colorsId])
        .then(response2 => {
            //Get request for achievements points
            const queryText = `SELECT "points" FROM "achievements"
                                WHERE "id" = $1;`;
            pool.query(queryText, [achievementsId])
            .then((response3) => {
                const pointsToAdd = response3.rows.map((item, index) => {
                    return pointsAwarded = <number>item.points;
                })
                // console.log(pointsToAdd)
                //PUT request to add points to user
                const queryText = `UPDATE "user"
                                    SET "points" = "points" + $1
                                    WHERE "id" = $2
                                    RETURNING "points", "user_levels";`;
                pool.query(queryText, [...pointsToAdd, userId])
                .then((response4) => {
                    const newPointsTotal: number = response4.rows[0].points;
                    const currentUserLevel: number = response4.rows[0].user_levels;
                    // console.log(newPointsTotal);
                    // console.log(currentUserLevel);
                    //Gets an level ids and qualifiers
                    const queryText = `SELECT * FROM "levels";`;
                    pool.query(queryText)
                    .then((response5) => {
                        // console.log(response5.rows)
                        const levelQualifiers = response5.rows.map((item, index) => {
                            return <number>item.qualifier;
                        })
                        const levelsId = response5.rows.map((item, index) => {
                            return <number>item.id;
                        })
                        // console.log(levelQualifiers.length);
                        // res.sendStatus(201);
                        for(let i = 0; i < levelQualifiers.length; i++) {
                            if(currentUserLevel >= levelQualifiers.length) {
                                res.sendStatus(201);   
                            } else if (newPointsTotal > levelQualifiers[i]  ){
                                console.log([i]);
                                console.log(newPointsTotal)
                                console.log(levelQualifiers[i])
                                console.log(currentUserLevel)
                                console.log(levelsId[i])
                                // console.log(levelQualifiers[i])
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

// } if (newPointsTotal >= levelQualifiers[i]  ){







//PUT route to mark colors_user.id as deleted
router.put('/put', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const id: number | null =<number>req.body.colors_userId;
    const queryText: string = `UPDATE "colors_user"
                                SET "deleted"= TRUE
                                WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then((response) => {
        res.sendStatus(201)
    })
    .catch((err) => {
        console.log(`error marking color as deleted ${err}`)
        res.sendStatus(500);
    })
})

export default router;