import { Router } from 'express';
import {
  createProduto,
  getProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto
} from '../controllers/produto.controller.js';

const router = Router();

router.post('/', createProduto);
router.get('/', getProdutos);
router.get('/:id', getProdutoById);
router.put('/:id', updateProduto);
router.delete('/:id', deleteProduto);

export default router;  