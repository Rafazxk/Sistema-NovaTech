import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsuarioService {

  async createUser(data) {
    
    const usuarioExistente = await UsuarioRepository.findByEmail(data.email);
    if (usuarioExistente) {
      throw new Error("Este e-mail já está cadastrado.");
    }

 
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(data.senha_hash, salt);

    
    const novoUsuario = {
      ...data,
      senha_hash: senhaCriptografada
    };

    return await UsuarioRepository.create(novoUsuario);
  }

  
  async login(email, senha) {
    const user = await UsuarioRepository.findByEmail(email);
    
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);
    if (!senhaValida) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      { id: user.user_id, tipo: user.tipo },
      process.env.JWT_SECRET || "sua_chave_secreta",
      { expiresIn: "1d" }
    );
   
    console.log(token);
    return {
      token,
      user: { nome: user.nome, email: user.email, tipo: user.tipo }
    };
  }

  async getUsers() {
    return await UsuarioRepository.findAll();
  }

  async getUserById(id) {
    const user = await UsuarioRepository.findById(id);
    if (!user) throw new Error("Usuário não encontrado.");
    return user;
  }

  async updateUser(id, data) {
    
    if (data.senha_hash) {
      const salt = await bcrypt.genSalt(10);
      data.senha_hash = await bcrypt.hash(data.senha_hash, salt);
    }
    return await UsuarioRepository.update(id, data);
  }

  async deleteUser(id) {
    return await UsuarioRepository.delete(id);
  }
}

export default new UsuarioService();