import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('users list')
})

router.get('/:id', (req: Request, res: Response) => {
    res.status(200).send('a user')
})

export default router