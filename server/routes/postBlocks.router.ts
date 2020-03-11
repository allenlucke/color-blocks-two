import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

//GET Request colors by user
//Order by due date ascending
router.post('/', (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.body.userId);
    console.log(userId)
    const queryText: string = ``;
    pool.query(queryText, [userId])
    .then((response) => {
        res.send(response.rows)
    })
    .catch((err) => {
        console.log(`error getting tasks ${err}`)
        res.sendStatus(500);
    })
});


export default router;