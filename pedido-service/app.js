import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import pedidoRoutes from './routes/pedido.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/pedidos', pedidoRoutes);

const iniciarServidor = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('📦 Banco de Pedidos sincronizado!');

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Pedido Service rodando na porta ${process.env.PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar:', erro);
  }
};

iniciarServidor();