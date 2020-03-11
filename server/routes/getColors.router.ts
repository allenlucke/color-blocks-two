import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

//GET Request colors by user
//Order by due date ascending
router.get('/:userId', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.params.userId);
    // console.log(userId)
    const queryText: string = `SELECT "colors_user".id, "colors".label, "colors".hex_code FROM "colors"
                                JOIN "colors_user" ON "colors".id = "colors_user".colors_id
                                WHERE "colors_user".user_id = $1;`;
                                // ORDER BY "colors".id ASC;`;
    pool.query(queryText, [userId])
    .then((response) => {
        res.send(response.rows)
        console.log(response.rows)
    })
    .catch((err) => {
        console.log(`error getting tasks ${err}`)
        res.sendStatus(500);
    })
});


export default router;