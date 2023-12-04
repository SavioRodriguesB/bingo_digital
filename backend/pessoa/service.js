let model = require("./model")
let serviceContato = require("../pessoa_contato/service")
let serviceSorteio = require("../sorteio/service")
const { v4: uuidv4 } = require('uuid');

async function buscarPorIdPessoa(params){
    return await model.buscarPorIdPessoa(params)
}

async function buscarPorUsuario(params){
    return await model.buscarPorUsuario(params)
}

async function registrar(params){
    params.id_pessoa = uuidv4();
    params.nome = params.nome.toUpperCase()
    params.nome_completo = params.nome.trim() + ' ' + params.sobrenome?.toUpperCase().trim()

    await model.registrar(params)

    for(contato of params.contatos){
        contato.id_pessoa = params.id_pessoa
        await serviceContato.registrar(contato)
    }
}

async function atualizar(params){
    let pessoa = await buscarPorIdPessoa(params)
    if (!pessoa){
        return
    }

    Object.assign(pessoa, params);

    return await model.atualizar(params)
}

async function atualizarImagemIcone(params){
    return await model.atualizarImagemIcone(params)
}

async function atualizarImagemBanner(params){
    return await model.atualizarImagemBanner(params)
}

async function excluir(params){

    let pessoa = await buscarPorIdPessoa(params)

    if(pessoa){
        model.excluir(pessoa)
        model.excluirUsuario(pessoa)
        return true
    }
    return false
}

async function buscarSorteiosPessoaParticipa(id_pessoa, situacao){
    let sorteios_ids = await serviceSorteio.buscarSorteiosPessoa(id_pessoa, situacao)

    let sorteios = []
    for(let sorteio of sorteios_ids){
        sorteios.push(await serviceSorteio.buscarPorIdSorteioJogoPrincipal(sorteio.id_sorteio))
    }

    return sorteios
}

async function buscarCartelasSorteioPessoa(id_pessoa, id_sorteio){
    let cartelas = await serviceSorteio.buscarCartelasSorteioPessoa(id_pessoa, id_sorteio)
    let sorteio = await serviceSorteio.buscarPorIdSorteioJogos(id_sorteio)

    for(let cartela of cartelas){
        let jogo = sorteio.jogos.find(jogo => jogo.id_jogo === cartela.id_jogo)
        if(jogo.cartelas){
            jogo.cartelas.push(cartela)
        }else{
            jogo.cartelas = [cartela]
        }
    }

    return sorteio
}


module.exports = {
    buscarPorIdPessoa,
    buscarPorUsuario,
    buscarCartelasSorteioPessoa,
    registrar,
    atualizar,
    atualizarImagemIcone,
    atualizarImagemBanner,
    excluir,
    buscarSorteiosPessoaParticipa
}