const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

// Mapeia a tabela 'users' no banco de dados
const UserDB = sequelize.define('user', {
    id: {
        type: DataTypes.UUID, // Gera IDs únicos e seguros em formato texto longo
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Impede e-mails duplicados direto na estrutura do banco
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { UserDB };