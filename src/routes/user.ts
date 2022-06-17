import {NextFunction, query, Request, Response, Router} from 'express';
import fs, { readFile } from 'fs'
import { User } from '../interfaces';

declare module "express-serve-static-core" {
    interface Request {
      user?: User;
    }
  }

const router = Router();

const getUser = (req: Request, res: Response, next: NextFunction) => {
    let id: string | number = req.params.id;
    id = typeof Number(id) === 'number'? Number(id) : 0;
    
    if(id){
        readFile(
            `${process.cwd()}/mock-db/users.json`,
            (err, data) => {
                if(err){
                    console.log('error: \n',err);
                    return res.status(500).send('something went wrong');
                }

                let parsed = JSON.parse(data.toString());

                let user = parsed.users.filter((u:User) => u.id === id);

                if(user.length <= 0){
                    return res.status(404).send(`User with the id ${id} doesn't exist`)
                }

                req.user = user[0];

                next();
            })
    }else{

        return res.status(400).send('Invalid ID ... only numbers are allowed')
    }

}


router.post('/', (req: Request, res: Response) => {
    console.log(req.body);

    res.status(201).send('created')
})

router.route('/:id')
    .get(getUser, (req: Request, res: Response) => res.status(200).send(req.user))
    .put((req: Request, res: Response) => {
        res.status(200).send('put');
    })
    .delete((req: Request, res: Response) => {
        res.status(200).send('delete');
    });

export default router;