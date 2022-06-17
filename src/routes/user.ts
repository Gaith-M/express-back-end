import {query, Request, Response, Router} from 'express';
import fs from 'fs'
import { User } from '../interfaces';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);

    res.status(201).send('created')
})

router.route('/:id')
    .get((req: Request, res: Response) => {

        fs.readFile(`${process.cwd()}/mock-db/users.json`, (err, data) => {
            if(err){
                console.log(err);
                res.status(500).send('Something went wrong');
            }

            let parsedData: {users: User[]} = JSON.parse(data.toString());
            
            let user = parsedData.users.filter(user => user.id === Number(req.params.id));

            if(user.length > 0) return res.status(200).send(user[0]);

            res.status(404).send(`User with id of ${req.params.id} wasn't found`)
        })
    })
    .put((req: Request, res: Response) => {
        res.status(200).send('put');
    })
    .delete((req: Request, res: Response) => {
        res.status(200).send('delete');
    });

export default router;