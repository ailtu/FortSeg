import pool from "../config/db.js";

export const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND senha = $2",
            [email, senha]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const user = result.rows[0];

        res.json({
            message: "Login realizado com sucesso",
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role_id: user.role_id
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};