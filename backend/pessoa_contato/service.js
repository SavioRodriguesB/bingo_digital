let model = require("./model")
let usuarioService = require("../usuario/service")
const { v4: uuidv4 } = require('uuid');

async function buscarPorIdPessoa(params){
    return await model.buscarPorIdPessoa(params)
}

async function buscarPorIdContato(params){
    return await model.buscarPorIdContato(params)
}

async function buscarPorIdPessoaEIdContato(params){
    return await model.buscarPorIdPessoaEIdContato(params)
}

async function registrar(params){

    params.id_contato = uuidv4();

    if(params.tipo_contato == 1){
        params.contato = params.contato.replaceAll("-","").replaceAll("(","").replaceAll(")","").replaceAll(" ","")
    }

    return await model.registrar(params)
}

async function atualizar(params){
    
    let contato = await buscarPorIdContato(params)

    if (!contato){
        return
    }

    if(contato.tipo_contato == 3){
        let usuario = await model.buscarEmailLogin(contato.contato);

        if(!usuario){
            error = new Error('Não é possível alterar e-mail de login.') 
            error.code = 'REGISTRO_INVALIDO'
            throw error
        }
    }

    if(params.tipo_contato == 1){
        params.contato = params.contato.replaceAll("-","").replaceAll("(","").replaceAll(")","").replaceAll(" ","")
    }

    Object.assign(contato, params);

    return await model.atualizar(params)
}

async function excluir(params){

    let contato = await buscarPorIdContato(params)

    if(contato){
        if(contato.tipo_contato == 3){
            let usuario = await model.buscarEmailLogin(contato.contato);

            if(!usuario){
                error = new Error('Não é possível excluir e-mail de login.') 
                error.code = 'REGISTRO_INVALIDO'
                throw error
            }
        }

        model.excluir(contato)
        return true
    }
    return false
}

module.exports = {
    buscarPorIdPessoa,
    buscarPorIdContato,
    buscarPorIdPessoaEIdContato,
    registrar,
    atualizar,
    excluir
}