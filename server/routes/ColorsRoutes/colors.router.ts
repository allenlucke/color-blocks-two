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