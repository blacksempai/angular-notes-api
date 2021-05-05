import express from 'express';
import { getAll, create, update, remove } from '../controllers/note';
const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

export { router };