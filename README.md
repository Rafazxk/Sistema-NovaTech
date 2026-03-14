# NovaTech Pro - Dashboard de Gestão de Vendas e Usuários

Este projeto consiste em um ecossistema completo para gestão de planos e monitoramento de métricas de vendas, composto por uma API RESTful robusta e um Dashboard interativo de alta performance.

## 1. Visão Geral
O sistema permite o gerenciamento de contas de usuários, controle de planos (Bronze, Prata e Ouro) e visualização de dados analíticos em tempo real. A arquitetura foi desenhada seguindo os princípios de Clean Code e Separação de Responsabilidades (SoC).

## 2. Tecnologias Utilizadas

### Frontend
* **HTML5 & CSS3:** Interface responsiva com design moderno e técnica de Glassmorphism.
* **JavaScript (ES6+):** Lógica de Single Page Application (SPA) para navegação dinâmica sem reload.
* **Chart.js:** Renderização de gráficos vetoriais para análise de métricas.
* **FontAwesome:** Biblioteca de ícones para interface de usuário.

### Backend
* **Node.js & Express:** Ambiente de execução e framework para construção da API.
* **MariaDB/MySQL:** Banco de dados relacional para persistência de dados.
* **JSON Web Token (JWT):** Implementação de segurança para autenticação e autorização.
* **Swagger (OpenAPI):** Documentação técnica interativa dos endpoints.

## 3. Arquitetura de Software
O backend utiliza o padrão de camadas **Service-Repository**, estruturado da seguinte forma:

* **Controllers:** Responsáveis por receber as requisições HTTP e retornar as respostas ao cliente.
* **Services:** Camada de lógica de negócio, isolando as regras das interfaces de entrada.
* **Repositories:** Camada de abstração de dados, responsável pelas consultas SQL e interação com o banco.
* **Middlewares:** Filtros de segurança para validação de sessões e integridade de dados.

## 4. Documentação da API
A API está totalmente documentada seguindo os padrões OpenAPI. Para explorar os endpoints, parâmetros e esquemas de resposta, acesse a interface do Swagger em:
`http://localhost:3000/api-docs`

## 5. Instruções de Instalação

### Pré-requisitos
* Node.js (v14 ou superior)
* Instância ativa de MariaDB ou MySQL

### Procedimentos

1. **Clone este repositório:**
   ```bash
   git clone [https://github.com/Rafazxk/Sistema-NovaTech.git](https://github.com/Rafazxk/Sistema-NovaTech.git)

2. **Instale as dependências do projeto:**
```bash
Bash
   
npm install
```
3. **Configure as variáveis de ambiente no arquivo .env:**
```bash
Snippet de código
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
```
4. **Execute o servidor em modo de desenvolvimento:**
```bash
Bash
node server.js
```
6. **Funcionalidades Implementadas:**

- Sistema de Autenticação: Registro e Login com criptografia e persistência de sessão.

- Gestão de Perfil: Atualização de dados cadastrais e manipulação de imagem de perfil (FileReader API).

- Painel Analítico: Monitoramento de vendas, taxa de churn e atividade de usuários através de gráficos interativos.

- Controle de Planos: Lógica de upgrade de níveis de acesso (Bronze, Prata, Ouro).

7. **Qualidade de Código e Segurança:**

- ESLint: Utilizado para análise estática e garantia de padrões de escrita.

- Segurança de Endpoints: Proteção de rotas sensíveis via Middleware de autenticação Bearer Token.

*Desenvolvido por Rafazxk.*