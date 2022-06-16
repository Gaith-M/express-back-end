import {Request, Response, Router} from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);

    res.status(201).send('created')
})

router.route('/:id')
    .get((req: Request, res: Response) => {
        res.status(200).send('get');
    })
    .put((req: Request, res: Response) => {
        res.status(200).send('put');
    })
    .delete((req: Request, res: Response) => {
        res.status(200).send('delete');
    });

export default router;