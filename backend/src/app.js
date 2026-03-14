import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import userRoutes from "./routes/usuarioRoutes.js";

class App {
  constructor() {
    this.app = express();
    this.setupSwagger(); // Inicializa as configurações do Swagger
    this.middlewares();
    this.routes();
  }

  setupSwagger() {
    const swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'NovaTech API',
          version: '1.0.0',
          description: 'Documentação da API do Dashboard NovaTech',
          contact: {
            name: 'Seu Nome'
          },
        },
        servers: [
          {
            url: 'http://localhost:3000',
          },
        ],
        // Adiciona suporte a Token JWT no Swagger (Útil para seu projeto!)
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            }
          }
        }
      },
      apis: ['./src/routes/*.js', './routes/*.js'], // Verifique se o caminho das rotas está correto
    };

    this.swaggerDocs = swaggerJsdoc(swaggerOptions);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    
    // Rota da documentação
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocs));
  }

  routes() {
    this.app.use("/api", userRoutes);
  }
}

export default new App().app;