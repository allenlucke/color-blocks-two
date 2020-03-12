import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

//GET Request colors by user
//Order by due date ascending
router.get('/:userId', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.params.userId);
    const queryText: string = `SELECT "blocks".id, "colors".id AS "colorsId", "colors".label, "colors".hex_code FROM "blocks"
                                JOIN "colors" ON "colors".id = "blocks".colors_id
                                WHERE "blocks".user_id = $1
                                ORDER BY "blocks".id ASC;`;
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
    const colorsId: number | null = <number>parseInt(req.body.colorsId);
    const queryText: string = `INSERT INTO "blocks" ("user_id", "colors_id")
                                VALUES ($1, $2);`;
    pool.query(queryText, [userId, colorsId])
    .then((response) => {
        res.send(response.rows)
    })
    .catch((err) => {
        console.log(`error getting tasks ${err}`)
        res.sendStatus(500);
    })
});


export default router;