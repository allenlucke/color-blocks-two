import { Request, Response, response } from "express";
import express from 'express';
import pool from '../../modules/pool';
import rejectUnauthenticated from '../../modules/authentication-middleware';

const router: express.Router = express.Router();

//GET Request colors by user
//Order by due date ascending
router.get('/:userId', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const userId: number | null = <number>parseInt(req.params.userId);
    const queryText: string = `SELECT "blocks".id, "colors".id AS "colorsId", "colors".label, "colors".hex_code FROM "blocks"
                                JOIN "colors" ON "colors".id = "blocks".colors_id
                                WHERE "blocks".user_id = $1
                                AND "blocks".deleted = FALSE
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

// PUT Route to flag block as deleted
router.put('/put', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const id: number | null = <number>parseInt(req.body.id);
    const queryText: string = `UPDATE "blocks"
                                SET "deleted"= TRUE
                                WHERE "id" = $1; `;
    pool.query(queryText, [id])
    .then((response) => {
        res.sendStatus(201)
    })
    .catch((err) => {
        console.log(`error marking block as deleted ${err}`)
        res.sendStatus(500);
    })
})

export default router;