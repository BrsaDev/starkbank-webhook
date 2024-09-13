const fs = require("fs")
const { Op, literal, fn, col, where } = require('sequelize')
const Transacoes = require("../models/Transacoes")

module.exports = {
    getUltimasTransacoesCliente: async (cliente) => {
        try {
            let transacao = await Transacoes.findAll({
                where: {
                    cliente
                },
                limit: 30,
                offset: 0,
                order: [["data_created", "DESC"], ["hora_created", "DESC"]]
            })
            transacao = JSON.parse(JSON.stringify(transacao, null, 2))
            return transacao || false
        } catch (erro) {
            return { erro }
        }
    },
    getTodasTransacoesCliente: async (cliente, page) => {
        if ( page == '0' || page == '1' ) page = 0
        else page = Number(page.padEnd(3, '0'))
        try {
            let transacao = await Transacoes.findAll({
                where: {
                    cliente
                },
                limit: 100,
                offset: page,
                order: [["data_created", "DESC"], ["hora_created", "DESC"]] //ASC
            })
            transacao = JSON.parse(JSON.stringify(transacao, null, 2))
            return transacao || false
        } catch (erro) {
            return { erro }
        }
    }
}
