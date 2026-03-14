import db from "../database/db.js";

class UsuarioRepository {

  async create(user) {
    const query = `
      INSERT INTO usuario (nome, email, senha_hash, tipo)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      user.nome,
      user.email,
      user.senha_hash,
      user.tipo || 'cliente' 
    ];

    const result = await db.query(query, values);
    
   
    return this.findById(result.insertId);
  }

  async findAll() {
    
    const result = await db.query("SELECT * FROM usuario");
    return result; 
  }

  async findById(id) {
    const result = await db.query(
      "SELECT * FROM usuario WHERE user_id = ?",
      [id]
    );
    
    return result[0];
  }

  async findByEmail(email){
    const result = await db.query(
    "SELECT * FROM usuario WHERE email = ?",
    [email]
  );
  return result[0];
  }
  
  async update(id, user) {
    const query = `
      UPDATE usuario
      SET nome = ?, email = ?, senha_hash = ?, tipo = ?
      WHERE user_id = ?
    `;

    const values = [
      user.nome,
      user.email,
      user.senha_hash,
      user.tipo,
      id
    ];

    await db.query(query, values);
    return this.findById(id); 
  }

  async delete(id) {
    await db.query(
      "DELETE FROM usuario WHERE user_id = ?",
      [id]
    );
    return true;
  }

}

export default new UsuarioRepository();