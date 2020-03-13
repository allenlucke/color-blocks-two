import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

//GET Request colors by user
router.get('/:userId', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.params.userId);
    const queryText: string = `SELECT "colors_user".id, "colors".id AS "colorsId", "colors".label, "colors".hex_code FROM "colors"
                                JOIN "colors_user" ON "colors".id = "colors_user".colors_id
                                WHERE "colors_user".user_id = $1;`;
    pool.query(queryText, [userId])
    .then((response) => {
        res.send(response.rows)
    })
    .catch((err) => {
        console.log(`error getting tasks ${err}`)
        res.sendStatus(500);
    })
});

//POST Request to add block by user
router.post('/post', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.body.userId);
    const label: string | null = <string>req.body.label;
    const hex_code: string | null = <string>req.body.hex_code;
    let colors_id: number | null;
    const queryText: string = `INSERT INTO "colors" ("label", "hex_code")
                                VALUES ($1, $2)
                                RETURNING id;`;
    pool.query(queryText, [label, hex_code])
    .then((response1) => {
        const colorsId = response1.rows.map((item, index) => {
            return colors_id = <number>item.id;
        })
        const queryText: string = `INSERT INTO "colors_user" ("user_id", "colors_id")
                                    VALUES ($1, $2);`;
        pool.query(queryText, [userId, ...colorsId])
        .then(response2 => {
            res.sendStatus(201);
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