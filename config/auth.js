const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const usuario = require("../models/Usuarios")
const { Op, literal, fn, col, where } = require('sequelize')

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: "login", passwordField: "senha"}, async(login, senha, done) => {
        // let senhaHash = await bcrypt.hash('123', 10)
        // await usuario.create({login: "teste", senha: senhaHash, status: 'Ativo'})
        console.log(login)
        usuario.findOne({ 
            where:{ 
                [Op.or]: [ { login }, where(fn('binary', col('login')), login)]
            }
        })//
        .then((usuario)=> {
            if ( !usuario ) {
                return done(null, false, {message: "Esta conta não existe!"})
            }
            
            let isValid = bcrypt.compareSync(senha, usuario.dataValues.senha)
            if ( isValid ) {
                return done(null, usuario)
            }else {
                console.log('usuario')
                return done(null, false, {message: "Senha incorreta!"})
            }
        })
        .catch((erro)=>{
            return done(null, false, {message: erro})
        })
    }))
    passport.serializeUser((user, done) => { return done(null, user.dataValues.id) })
    passport.deserializeUser((id, done) => {usuario.findByPk(id).then((user)=> { return done(null, user) })})
}

