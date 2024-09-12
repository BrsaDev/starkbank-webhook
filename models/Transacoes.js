const db = require('./db')

const Transacao = db.sequelize.define('transacoes', {
    id                 : { type: db.Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    cliente            : { type: db.Sequelize.STRING },
    id_codigo          : { type: db.Sequelize.STRING },
    id_transacao       : { type: db.Sequelize.STRING },
    accountNumber      : { type: db.Sequelize.STRING },
    accountType        : { type: db.Sequelize.STRING },
    taxId              : { type: db.Sequelize.STRING },
    name               : { type: db.Sequelize.STRING },
    status             : { type: db.Sequelize.STRING },
    displayDescription : { type: db.Sequelize.STRING },
    bankCode           : { type: db.Sequelize.STRING },
    type               : { type: db.Sequelize.STRING },
    amount             : { type: db.Sequelize.STRING },
    fee                : { type: db.Sequelize.STRING },
    branchCode         : { type: db.Sequelize.STRING },
    data_updated       : { type: db.Sequelize.STRING },
    data_created       : { type: db.Sequelize.STRING },
    hora_updated       : { type: db.Sequelize.STRING },
    hora_created       : { type: db.Sequelize.STRING },
    tags               : { type: db.Sequelize.STRING }
}, { timestamps: false })

// Transacao.sync({force:true})

module.exports = Transacao