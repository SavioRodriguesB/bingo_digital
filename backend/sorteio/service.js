let model = require("./model")
let serviceJogo = require("../jogo/service")
const { v4: uuidv4 } = require('uuid');

async function buscarSorteiosPendentes(){
    let sorteios = await model.buscarSorteiosPendentes()

    for(let sorteio of sorteios){
        sorteio.jogos = await serviceJogo.buscarJogoPrincipalSorteio(sorteio.id_sorteio)
    }
    return sorteios
}

async function buscarUltimosSorteios(){
    let sorteios = await model.buscarUltimosSorteios()

    for(let sorteio of sorteios){
        sorteio.jogos = await serviceJogo.buscarJogoPrincipalSorteio(sorteio.id_sorteio)
    }
    return sorteios
}

async function buscarUltimaEdicao(params){
    return await model.buscarUltimaEdicao(params)
}

async function buscarPorIdSorteio(id_sorteio){
    return await model.buscarPorIdSorteio(id_sorteio)
}

async function buscarPorIdSorteioJogoPrincipal(params){
    let sorteio = await buscarPorIdSorteio(params)
    sorteio.jogos = await serviceJogo.buscarJogoPrincipalSorteio(sorteio.id_sorteio)

    return sorteio
}

async function buscarSorteiosPessoa(id_pessoa, situacao){
    return await model.buscarSorteiosPessoa(id_pessoa, situacao)
}

async function buscarCartelasSorteioPessoa(id_pessoa, id_sorteio){
    return await model.buscarCartelasSorteioPessoa(id_pessoa, id_sorteio)
}

async function buscarPorIdSorteioJogos(id_sorteio){
    let sorteio = await buscarPorIdSorteio(id_sorteio)
    sorteio.jogos = await serviceJogo.buscarJogosSorteio(sorteio.id_sorteio)

    for(let jogo of sorteio.jogos){
        let vencedores = await serviceJogo.buscarPessoaVencedorJogo(jogo.id_jogo)
        if(vencedores){
            jogo.pessoa_nome = []
            for(let vencedor of vencedores){
                jogo.pessoa_nome.push(vencedor.nome_completo)
            }
        }
        
    }

    return sorteio
}



async function registrar(sorteio){
    sorteio.id_sorteio = uuidv4();

    let ultimoSorteio = await buscarUltimaEdicao();

    if(ultimoSorteio){
        sorteio.edicao = Number(ultimoSorteio.edicao) + 1
    }else{
        sorteio.edicao = 1
    }

    sorteio.status = 0
    await model.registrar(sorteio)

    for(jogo of sorteio.jogos){
        jogo.id_sorteio = sorteio.id_sorteio
        await serviceJogo.registrar(jogo)
    }

    return sorteio.id_sorteio
}


module.exports = {
    buscarUltimosSorteios,
    buscarPorIdSorteioJogoPrincipal,
    buscarSorteiosPendentes,
    buscarCartelasSorteioPessoa,
    buscarUltimaEdicao,
    buscarPorIdSorteio,
    buscarSorteiosPessoa,
    buscarPorIdSorteioJogos,
    registrar,
}