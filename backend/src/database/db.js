import { createPool } from 'mariadb';

class Database {
  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: 'rafazx251',
      database: 'sistema_loja',
      connectionLimit: 5
    });
  }

  async query(text, params) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      
      const res = await conn.query(text, params);
      return res;
    } catch (err) {
      console.error("Erro na query:", err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }
}

export default new Database();