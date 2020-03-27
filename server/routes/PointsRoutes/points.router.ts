import { Request, Response, response } from "express";
import express from 'express';
import pool from '../../modules/pool';
import rejectUnauthenticated from '../../modules/authentication-middleware';


const router: express.Router = express.Router();

//GET route for current points, level, and blocks added
router.get('/:userId', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.params.userId);
    const queryText: string = `SELECT 
    coalesce("user".points, 0) AS "points",
    coalesce("user".user_levels, 0) AS "user_levels"
    FROM "user"
    WHERE "user".id = $1
    GROUP BY "user".points, "user".user_levels;`;
    pool.query(queryText, [userId])
    .then((response1) => {
        console.log(response1.rows[0])
        const pointsArray: any = response1.rows.map((item, index) => {
            return <number>item
        })
        console.log(pointsArray[0].points)
        console.log(pointsArray[0].user_levels)
        const currentPoints: number = parseInt(pointsArray[0].points)
        const userLvlId: number = parseInt(pointsArray[0].user_levels)
        // console.log(userLvlId)
        // console.log(currentPoints)
        //GET route for total colors and blocks added
        const queryText = `SELECT COUNT("colors_user") AS "totalColors",
                            coalesce(COUNT("blocks".id), 0) AS "totalBlocks"
                            FROM "colors_user"
                            JOIN "user" ON "colors_user".user_id = "user".id
                            JOIN "blocks" ON "user".id = "blocks".user_id
                            WHERE "user".id = $1;`;
        pool.query(queryText, [userId])
        .then((response2) => {
            //GET route for points to next level
            const queryText = `SELECT SUM("qualifier" - $1) AS "pointsNeeded" FROM "levels"
                                WHERE id = ($2 +1);`;
            pool.query(queryText, [currentPoints, userLvlId])
            .then((response3) => {
                //GET route for colorsAddedByName
                const queryText = `SELECT COUNT("achievements_id") AS "colorsAddedByName" FROM "colors_user"
                                    WHERE "user_id" = $1 AND "achievements_id" = 1;`;
                pool.query(queryText, [userId])
                .then((response4) => {
                    //GET route colorsAddedByHex
                    const queryText = `SELECT COUNT("achievements_id") AS "colorsAddedByHex" FROM "colors_user"
                                        WHERE "user_id" = $1 AND "achievements_id" = 2;`;
                    pool.query(queryText, [userId])
                    .then((response5) => {
                        console.log(response1.rows[0])
                        console.log(response2.rows[0])
                        console.log(response3.rows[0])
                        console.log(response4.rows[0])
                        console.log(response5.rows[0])

                        const firstResponse: any = response1.rows[0];
                        const secondResponse: any = response2.rows[0];
                        const thirdResponse: any = response3.rows[0];
                        const fourthResponse: any = response4.rows[0];
                        const fifthResponse: any = response5.rows[0];

                        const userData: Array<any>= [{
                            ...firstResponse,
                            ...secondResponse,
                            ...thirdResponse,
                            ...fourthResponse,
                            ...fifthResponse,
                        }]
                        console.log(userData)
                        res.send(userData)
                        })
                        .catch((err) => {
                            console.log(`error getting count of colors added by name ${err}`)
                            res.sendStatus(500);
                        })
                    })
                    .catch((err) => {
                        console.log(`error getting colors added by hex code ${err}`)
                        res.sendStatus(500);
                }) 
            })
            .catch((err) => {
                console.log(`error getting points to next level ${err}`)
                res.sendStatus(500);
            })
        })
        .catch((err) => {
            console.log(`error getting colors added ${err}`)
            res.sendStatus(500);
        })
    })
    .catch((err) => {
        console.log(`error getting points ${err}`)
        res.sendStatus(500);
    })
});

export default router;
