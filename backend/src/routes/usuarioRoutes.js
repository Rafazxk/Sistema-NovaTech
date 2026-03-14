import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

//rotas publicas

router.post('/login', UsuarioController.login);
router.post("/users", UsuarioController.create);


// Rotas protegidas
router.get("/users", authMiddleware, UsuarioController.findAll);
router.get("/users/:id", authMiddleware, UsuarioController.findById);
router.put("/users/:id", authMiddleware, UsuarioController.update);
router.delete("/users/:id", authMiddleware, UsuarioController.delete);

export default router;  