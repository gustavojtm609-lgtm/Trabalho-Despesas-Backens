const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

// Mapeia a tabela 'expenses' no banco de dados
const ExpenseDB = sequelize.define('expense', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY, // Guarda apenas a data (AAAA-MM-DD), sem hora
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'PAGA'), // Restringe as opções aceitas
        allowNull: false,
        defaultValue: 'PENDENTE'
    }
});

module.exports = { ExpenseDB };