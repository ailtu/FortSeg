import pool from "../config/db.js";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        users.id,
        users.nome,
        users.email,
        roles.nome AS funcao
      FROM users
      JOIN roles ON users.role_id = roles.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};