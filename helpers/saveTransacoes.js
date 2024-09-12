const fs = require("fs")
const { Op, literal, fn, col, where } = require('sequelize')
const Transacoes = require("../models/Transacoes")

module.exports = {
    salvarTransacao: async (transacaoRecebida, cliente) => {
        try {
            let data_updated = transacaoRecebida.updated.toString().split('T')[0].split('-').reverse().join('/')
            let data_created = transacaoRecebida.created.toString().split('T')[0].split('-').reverse().join('/')
            let hora_updated = transacaoRecebida.updated.toString().split('T')[1].split('.')[0]
            let hora_created = transacaoRecebida.created.toString().split('T')[1].split('.')[0]
            let tags = transacaoRecebida.tags.reduce((acc, curr) => {return acc += "/"+curr}, "")
            let transacao = await Transacoes.create({
                cliente,
                id_codigo          : transacaoRecebida.id.toString(),
                id_transacao       : transacaoRecebida.transactionIds[0].toString(),
                accountNumber      : transacaoRecebida.accountNumber,
                accountType        : transacaoRecebida.accountType,
                taxId              : transacaoRecebida.taxId,
                name               : transacaoRecebida.name,
                status             : transacaoRecebida.status,
                displayDescription : transacaoRecebida.displayDescription,
                bankCode           : transacaoRecebida.bankCode,
                type               : transacaoRecebida.type,
                amount             : transacaoRecebida.amount,
                fee                : transacaoRecebida.fee,
                branchCode         : transacaoRecebida.branchCode,
                data_updated       : data_updated.toString(),
                data_created       : data_created.toString(),   
                hora_updated       : hora_updated.toString(),
                hora_created       : hora_created.toString(),
                tags
            })
            return transacao || false
        } catch (erro) {
            return { erro }
        }

    }
}