const UserController = require('../controller/user');

class UserView {
    // Recebe a requisição HTTP de cadastro e devolve o JSON do usuário criado
    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const user = await UserController.create(nome, email, senha);
            res.status(201).json({ id: user.id, nome: user.nome, email: user.email });
        } catch (error) {
            const status = error.statusCode || 500;
            res.status(status).json({ error: error.message });
        }
    }

    // Recebe a tentativa de login e responde com os dados do perfil e o Token gerado
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const result = await UserController.login(email, senha);
            res.status(200).json(result);
        } catch (error) {
            const status = error.statusCode || 500;
            res.status(status).json({ error: error.message });
        }
    }
}

module.exports = new UserView();