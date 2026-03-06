import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import produtoRoutes from './routes/produto.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/produtos', produtoRoutes);

const iniciarServidor = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('📦 Banco de Produtos sincronizado!');
    
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Produto Service rodando na porta ${process.env.PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar:', erro);
  }
};

iniciarServidor();