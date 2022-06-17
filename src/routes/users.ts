import { Request, Response, Router } from 'express';
import fs from 'fs'

const router = Router();


router.get('/', (req: Request, res: Response) => {

    let {query} = req;
    

    fs.readFile(`${process.cwd()}/mock-db/users.json`, (err, data) => {

        if(err) {
            console.log(err)
            return res.status(500).send('Something went wrong');
        }

        let parsed = JSON.parse(data.toString());

        
        if(query.length && typeof Number(query.lenght) === 'number') {
            
            let paginated = parsed.users.slice(0, Number(query.length));
            
            return res.status(200).send(paginated)
        }
        res.status(200).send(parsed.users)
    })
})


export default router

