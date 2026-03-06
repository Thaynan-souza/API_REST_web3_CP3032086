🛠️ Configuração do Ambiente (.env)Como cada serviço possui seu próprio banco de dados e porta, você deve criar um arquivo .env na raiz de cada pasta.

1. Cliente Service (/cliente-service/.env)Responsável pelo domínio de clientes.

DB_NAME=cliente_db
DB_USER=root
DB_PASS=sua_senha_mysql
DB_HOST=localhost
PORT=3001
2. Produto Service (/produto-service/.env)Responsável pelo catálogo de produtos.DB_NAME=produto_db
DB_USER=root
DB_PASS=sua_senha_mysql
DB_HOST=localhost
PORT=3003
3. Pedido Service (/pedido-service/.env)Este serviço depende dos outros dois para validar clienteId e produtosIds.

DB_NAME=pedido_db
DB_USER=root
DB_PASS=sua_senha_mysql
DB_HOST=localhost
PORT=3002
# URLs de comunicação entre serviços
CLIENTE_SERVICE_URL=http://localhost:3001/clientes
PRODUTO_SERVICE_URL=http://localhost:3003/produtos

🚀 Como ExecutarBanco de Dados: No MySQL, crie os três schemas: cliente_db, pedido_db e produto_db.Dependências: Entre em cada pasta e instale os pacotes:Bash npm install
Inicialização: Execute o comando de start em três terminais diferentes