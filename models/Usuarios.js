const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: { 
        type: db.Sequelize.STRING ,
        allowNull: false
    },
    senha: { 
        type: db.Sequelize.STRING ,
        allowNull: false
    }
}, { timestamps: false })

// Usuario.sync({force:true})

module.exports = Usuario