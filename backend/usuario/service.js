const model = require("./model")
const servicePessoa = require("../pessoa/service")
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken");
const saltRounds = 10

async function registrar(usuario){
    try{
        usuario.id_usuario = uuidv4();

        let salt = bcrypt.genSaltSync(saltRounds)
        let hash = bcrypt.hashSync(usuario.senha, salt)
    
        usuario.senha = hash
        if(!usuario.roles){
            usuario.roles = ['USER']
        }
        await model.registrar(usuario)

        usuario.pessoa.id_usuario = usuario.id_usuario
        servicePessoa.registrar(usuario.pessoa)

        return login({email: usuario.email, senha: usuario.senha})

    }catch(error){
        if(error.constraint === 'unique_email'){
            error = new Error('E-mail já cadastrado') 
            error.code =  'REGISTRO_INVALIDO'
        }
        throw error
    }
}

async function login(params){
    let usuario = await buscarPorEmail(params.email)
    if(usuario){
        if(bcrypt.compareSync(params.senha, usuario.senha)){
            let pessoa = await servicePessoa.buscarPorUsuario(usuario.id_usuario)

            if(usuario.roles.includes('ADMIN')){
                return {
                    token: jwt.sign({id_pessoa: pessoa.id_pessoa}, process.env.JWT_SECRET_ADMIN, { expiresIn: process.env.JWT_EXPIRATION }),
                    id_pessoa: pessoa.id_pessoa
                }
            }
            return {
                token: jwt.sign({id_pessoa: pessoa.id_pessoa}, process.env.JWT_SECRET_USER, { expiresIn: process.env.JWT_EXPIRATION }),
                id_pessoa: pessoa.id_pessoa
            }
        }
    }

    return undefined
}

async function buscarPorEmail(params){
    return await model.buscarPorEmail(params);
}

async function buscarRoles(params){
    let pessoa = await servicePessoa.buscarPorIdPessoa(params)

    return await model.buscarRoles(pessoa);
}

module.exports = {
    buscarRoles,
    buscarPorEmail,
    registrar,
    login
}