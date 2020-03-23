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
    // const pointsId: number | null = <number>req.body.pointsId;
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