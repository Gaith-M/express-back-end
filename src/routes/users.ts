import { Request, Response, Router } from 'express';
import fs from 'fs'

const router = Router();


router.get('/', (req: Request, res: Response) => {

    fs.readFile(`${process.cwd()}/mock-db/users.json`, (err, data) => {

        if(err) {
            console.log(err)
            return res.status(500).send('Something went wrong');
        }

        let parsed = data.toString();
        res.status(200).send(parsed)
    })
})


export default router