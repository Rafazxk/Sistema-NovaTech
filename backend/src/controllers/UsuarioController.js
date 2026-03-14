import UsuarioService from "../services/UsuarioService.js";

class UsuarioController {


  async login(req, res) {
    try {
      const { email, senha } = req.body;
      
  
      const result = await UsuarioService.login(email, senha);
      
      return res.status(200).json(result);
    } catch (error) {
   
      if (error.message === "Credenciais inválidas") {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async create(req, res) {
    try {
      const user = await UsuarioService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
  
      if (error.message === "Este e-mail já está cadastrado.") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const users = await UsuarioService.getUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const user = await UsuarioService.getUserById(req.params.id);
      return res.json(user);
    } catch (error) {
      
      if (error.message === "Usuário não encontrado.") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await UsuarioService.updateUser(req.params.id, req.body);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await UsuarioService.deleteUser(req.params.id);
      return res.json({ message: "Usuário deletado" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UsuarioController();