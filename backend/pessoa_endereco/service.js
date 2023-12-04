let model = require("./model")
let usuarioService = require("../usuario/service")
const { v4: uuidv4 } = require('uuid');

async function buscarPorIdPessoa(params){
    return await model.buscarPorIdPessoa(params)
}

async function buscarEnderecoEntrega(params){
    return await model.buscarPorIdPessoaEnderecoEntrega(params)
}

async function buscarPorIdEndereco(params){
    return await model.buscarPorIdEndereco(params)
}

async function buscarPorIdPessoaEIdEndereco(params){
    return await model.buscarPorIdPessoaEIdEndereco(params)
}

async function registrar(params){
    try{
        params.id_endereco = uuidv4();
        params.uf = params.uf.toUpperCase()

        let endereco_entrega = await buscarEnderecoEntrega(params)

        if(endereco_entrega){
            error = new Error('Não é possíel ter mais de um endereço para entrega dos prêmios') 
            error.code =  'REGISTRO_INVALIDO'
        }

        return await model.registrar(params)

    }catch(error){
        throw error
    }
}

async function atualizar(params){
    let endereco = await buscarPorIdEndereco(params)
    params.uf = params.uf.toUpperCase()
    if (!endereco){
        return
    }

    Object.assign(endereco, params);

    return await model.atualizar(params)
}

async function excluir(params){

    let endereco = await buscarPorIdEndereco(params)

    if(endereco){
        if(endereco.tipo_endereco == 3){
            let usuario = await model.buscarEmailLogin(endereco.endereco);

            if(!usuario){
                error = new Error('Impossível excluir endereço de entrega de prêmios.') 
                error.code =  'REGISTRO_INVALIDO'
                throw error
            }
        }

        model.excluir(endereco)
        return true
    }
    return false
}

module.exports = {
    buscarPorIdPessoa,
    buscarPorIdEndereco,
    buscarPorIdPessoaEIdEndereco,
    buscarEnderecoEntrega,
    registrar,
    atualizar,
    excluir
}