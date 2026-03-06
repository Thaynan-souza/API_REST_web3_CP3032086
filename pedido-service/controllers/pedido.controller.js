import Pedido from '../models/Pedido.js';
import fetch from 'node-fetch';

// Valida cliente no microsserviço 1 (Porta 3001)
const validarCliente = async (clienteId) => {
  const url = `${process.env.CLIENTE_SERVICE_URL}/${clienteId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Cliente não encontrado');
  return res.json();
};

// Valida produto no microsserviço 3 (Porta 3003)
const validarProduto = async (produtoId) => {
  const url = `${process.env.PRODUTO_SERVICE_URL}/${produtoId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Produto com ID ${produtoId} não encontrado`);
  return res.json();
};

export const createPedido = async (req, res) => {
  try {
    const { descricao, valor, clienteId, produtosIds } = req.body;

    // 1. O cliente existe?
    await validarCliente(clienteId);

    // 2. Os produtos existem?
    if (!produtosIds || produtosIds.length === 0) {
      return res.status(400).json({ error: 'O pedido precisa ter uma lista de produtosIds.' });
    }

    for (const pId of produtosIds) {
      await validarProduto(pId);
    }

    // 3. Se tudo existir, cria o pedido!
    const pedido = await Pedido.create({ descricao, valor, clienteId, produtosIds });
    res.status(201).json(pedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    await pedido.update(req.body);
    res.json(pedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    await pedido.destroy();
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};