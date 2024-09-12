const fs = require("fs")
const { Op, literal, fn, col, where } = require('sequelize')
const Transacoes = require("../models/Transacoes")

module.exports = {
    checkTransacao: async (transacaoRecebida, cliente) => {
        try {
            let transacao = await Transacoes.findAll({
                where: {
                    cliente,
                    id_transacao: transacaoRecebida.transactionIds[0]
                }
            })
            transacao = JSON.parse(JSON.stringify(transacao, null, 2))
            return transacao || false
        } catch (erro) {
            return { erro }
        }

    }
}