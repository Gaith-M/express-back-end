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

        
        if(query.page && typeof Number(query.page) === 'number') {
            
            let currentPage = Number(query.page);
            let previousPage = currentPage > 1? currentPage - 1 : 0;
            let perPage = typeof Number(query.rows) === 'number' && Number(query.rows) > 0 ? Number(query.rows) : 10;

            let paginated = parsed.users.slice(previousPage * perPage, currentPage * perPage);
            
            return res.status(200).send(paginated)
        }
        res.status(200).send(parsed.users)
    })
})


export default router

