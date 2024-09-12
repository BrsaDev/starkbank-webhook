const express = require('express')
const fs = require('fs')
// const path = require('path')
// const session = require('express-session')
// const { engine } = require('express-handlebars')
// const flash = require('connect-flash')

const { checkTransacao } = require("./helpers/verificaTransacao")
const { salvarTransacao } = require("./helpers/saveTransacoes")
const { getTransacoesClienteDia, getTodasTransacoesCliente } = require("./helpers/consultaTansacoes")

const app = express()

// const passport = require("passport")
// require("./config/auth")(passport)



/**
 *  middleware autenticação
 */

// function authenticationMiddleware(req, res, next) {
//     if (req.isAuthenticated()) return next()
//     res.redirect("/login")
// }

/**
 * config porta
 */
const port = 3010

// /**
//  * config sessions
//  */
// app.use(session({
//     secret: "HVHVHV656435435dcfcccfdFDDFXCgvd4422VVVCGFDczcfskjmdk",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 6 * 60 * 60 * 1000 }
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash())

// /**
//  * middleware para variaveis globais
//  */
// app.use((req, res, next) => {
//     res.locals.error = req.flash("error")
//     res.locals.user = req.user || null
//     next()
// })


// app.use(express.limit(100000000));
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }));

// /**
//  * config handlebars
//  */
// app.engine("handlebars", engine({ defaultLayout: "main" }))
// app.set('view engine', 'handlebars')
// app.set('views', path.join(__dirname, 'pages'))

// /**
//  * config arquivos estáticos
//  */
// app.use(express.static(path.join(__dirname, "public")))


app.get('/transacoes', async (req, res) => {
    let {cliente, page} = req.query
    if ( !cliente ) return res.status(200).json({erro: { message: "O cliente não foi encontrado"}})
    
    if ( page ) {
        let transacoes = await getTodasTransacoesCliente(cliente, page)
        if ( transacoes.erro ) return res.status(200).json({erro: { message: transacoes.erro }})
        if ( !transacoes ) return res.status(200).json({erro: { message: "Não foi encontrado transações" }})
        return res.status(200).json({resultado: transacoes})
    }else {
        let transacoes = await getTransacoesClienteDia(cliente)
        if ( transacoes.erro ) return res.status(200).json({erro: { message: transacoes.erro }})
        if ( !transacoes ) return res.status(200).json({erro: { message: "Não foi encontrado transações hoje." }})
        return res.status(200).json({resultado: transacoes})
    }    
})
app.post('/receiver/WS001', async (req, res) => {
    let transacao = req.body.event.log.deposit
    // console.log(transacao)
    let checkedTransacao = await checkTransacao(transacao, "WS001")
    if ( !checkedTransacao.length || !checkedTransacao ) {
        let createdTransacao = await salvarTransacao(transacao, "WS001")
        // console.log(createdTransacao)
    }
    return res.status(200).json({resultado: "OK"})
})
app.post('/receiver/WS002', async (req, res) => {
    let transacao = req.body.event.log.deposit
    // console.log(transacao)
    let checkedTransacao = await checkTransacao(transacao, "WS002")
    if ( !checkedTransacao.length || !checkedTransacao ) {
        let createdTransacao = await salvarTransacao(transacao, "WS002")
        // console.log(createdTransacao)
    }
    return res.status(200).json({resultado: "OK"})
})
app.post('/receiver/WS003', async (req, res) => {
    let transacao = req.body.event.log.deposit
    // console.log(transacao)
    let checkedTransacao = await checkTransacao(transacao, "WS003")
    if ( !checkedTransacao.length || !checkedTransacao ) {
        let createdTransacao = await salvarTransacao(transacao, "WS003")
        // console.log(createdTransacao)
    }
    return res.status(200).json({resultado: "OK"})
})
app.post('/receiver/WS008', async (req, res) => {
    let transacao = req.body.event.log.deposit
    // console.log(transacao)
    let checkedTransacao = await checkTransacao(transacao, "WS008")
    if ( !checkedTransacao.length || !checkedTransacao ) {
        let createdTransacao = await salvarTransacao(transacao, "WS008")
        // console.log(createdTransacao)
    }
    return res.status(200).json({resultado: "OK"})
})
app.post('/receiver/WS009', async (req, res) => {
    let transacao = req.body.event.log.deposit
    // console.log(transacao)
    let checkedTransacao = await checkTransacao(transacao, "WS009")
    if ( !checkedTransacao.length || !checkedTransacao ) {
        let createdTransacao = await salvarTransacao(transacao, "WS009")
        // console.log(createdTransacao)
    }
    return res.status(200).json({resultado: "OK"})
})
app.post('/receiver/WS014', async (req, res) => {
    let transacao = req.body.event.log.deposit
    // console.log(transacao)
    let checkedTransacao = await checkTransacao(transacao, "WS014")
    if ( !checkedTransacao.length || !checkedTransacao ) {
        let createdTransacao = await salvarTransacao(transacao, "WS014")
        // console.log(createdTransacao)
    }
    return res.status(200).json({resultado: "OK"})
})
// app.get('/login', (req, res) => {
//     return res.render('login')
// })

// app.get('/transacoes', authenticationMiddleware, (req, res) => {
    
//     return res.render('transacoes')
// })

// app.post('/login', passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true
// }))

// app.get('/logout', (req, res) => {
//     req.logout(function (err) {
//         if (err) {
//             return res.redirect("/login")
//         }
//         res.redirect('/login');
//     })
// })

app.listen(port, () => { console.log('Rodando as rotas na porta: ' + port) })

