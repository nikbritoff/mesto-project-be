import { Router } from 'express';
import {
  addLike, createCard, deleteCardById, getCards, removeLike,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCardById);
router.put('/:id/likes', addLike);
router.delete('/:id/likes', removeLike);

export default router;
