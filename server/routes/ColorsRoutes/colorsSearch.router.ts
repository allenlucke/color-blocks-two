import { Request, Response, response } from "express";
import express from 'express';
import pool from '../../modules/pool';
import rejectUnauthenticated from '../../modules/authentication-middleware';

const router: express.Router = express.Router();

//GET Route for color names similar to string
router.get('/:colorName', rejectUnauthenticated, (req: Request, res: Response, next: express.NextFunction): void => {
    const colorName: string | null = <string>req.params.colorName.toLowerCase();

    const queryText: string = `SELECT DISTINCT ON ("hex_code", "label") * FROM "colors"
                                WHERE to_tsvector("label") @@ to_tsquery('${colorName}')
                                OR "label" LIKE '%${colorName}%'
                                OR "label" LIKE '${colorName}%'
                                OR "label" LIKE '%${colorName}'
                                OR "label" LIKE '_${colorName}_'
                                OR "label" LIKE '${colorName}_'
                                OR "label" LIKE '_${colorName}';`;
    pool.query(queryText)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
        console.log(`Error getting colors via search ${err}`);
    });
});
export default router;

// const queryText: string = `SELECT * FROM "colors"
//                                 WHERE to_tsvector("label") @@ to_tsquery('${colorName}')
//                                 OR "label" LIKE '%${colorName}%'
//                                 OR "label" LIKE '${colorName}%'
//                                 OR "label" LIKE '%${colorName}'
//                                 OR "label" LIKE '_${colorName}_'
//                                 OR "label" LIKE '${colorName}_'
//                                 OR "label" LIKE '_${colorName}';`;