import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import clienteRoutes from './routes/cliente.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/clientes', clienteRoutes);

const iniciarServidor = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('📦 Banco de Clientes sincronizado!');
    
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Cliente Service rodando na porta ${process.env.PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar:', erro);
  }
};

iniciarServidor();