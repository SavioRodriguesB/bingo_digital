let model = require("./model")

async function buscarPorIdPessoa(params){
    return await model.buscarPorIdPessoa(params)
}

async function buscarPorChave(params){
    return await model.buscarPorChave(params)
}

async function buscarPorIdPessoaEChave(params){
    return await model.buscarPorIdPessoaEChave(params)
}

async function registrar(params){
    params.chave = formatarChave(params.chave)
    return await model.registrar(params)
}

async function atualizar(params){
    let chave = await buscarPorChave(params)

    if (!chave){
        return
    }

    params.chave = formatarChave(params.chave)

    Object.assign(chave, params);

    return await model.atualizar(params)
}

async function excluir(params){
    let chave = await buscarPorChave(params)

    if(chave){
        model.excluir(chave)
        return true
    }
    return false
}

function formatarChave(chave){
    let tipoChaves = [1,2,4]

    if(tipoChaves.includes(chave.tipo_chave)){
        return chave.chave.replaceAll("-","").replaceAll("(","").replaceAll(")","").replaceAll(" ","").replaceAll(".","").replaceAll("/","")
    }

    return chave
}

module.exports = {
    buscarPorIdPessoa,
    buscarPorChave,
    buscarPorIdPessoaEChave,
    registrar,
    atualizar,
    excluir
}