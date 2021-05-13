import express from 'express';
import passport from 'passport';
import { getAllAsTree, create, update, remove } from '../controllers/note';
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), getAllAsTree);
router.post('/', passport.authenticate('jwt', {session: false}), create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), remove);

export { router };