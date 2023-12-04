let knex = require("../database/connection");

async function registrar(sorteio){
    return await knex.insert({
        id_sorteio: sorteio.id_sorteio,
        titulo: sorteio.titulo,
        data_sorteio: sorteio.data_sorteio,
        edicao: sorteio.edicao,
        status: sorteio.status,
        valor: sorteio.valor.replaceAll(',','.'),
        limite_jogo_pessoa: sorteio.limite_jogo_pessoa,
        imagem_banner: sorteio.imagem_banner,
        data_inclusao: knex.raw('now()'),
    }).into('sorteio').returning(['id_sorteio'])
}

async function buscarSorteiosPendentes(){
    let sorteios = await knex.select('id_sorteio', 'titulo', 'data_sorteio', 'imagem_banner', 'edicao', 'valor', 'limite_jogo_pessoa')
    .from('sorteio')
    .where('data_sorteio', '>=' , knex.raw('now()'))
    .orderBy('data_sorteio', 'desc');

    return sorteios
}

async function buscarUltimosSorteios(){
    let sorteios = await knex.select('id_sorteio', 'titulo', 'data_sorteio', 'imagem_banner', 'edicao', 'valor', 'limite_jogo_pessoa')
    .from('sorteio')
    .where('data_sorteio', '<' , knex.raw('now()'))
    .orderBy('data_sorteio', 'desc');

    return sorteios
}

async function buscarPorIdSorteio(id_sorteio){
    let sorteios = await knex.select()
    .from('sorteio')
    .where('id_sorteio', id_sorteio)

    if(sorteios){
        return sorteios[0]
    }

    return undefined
}

async function buscarSorteiosPessoa(id_pessoa, situacao){
    let sorteios = await knex.distinct('sorteio.id_sorteio')
    .join('jogo', 'jogo.id_jogo', 'cartela.id_jogo')
    .join('sorteio', 'sorteio.id_sorteio', 'jogo.id_sorteio')
    .from('cartela')
    .where('cartela.id_pessoa',id_pessoa)
    .andWhere(knex.raw(`((data_sorteio > now() AND ${situacao} = 1) OR ${situacao} = 2)` ))

    return sorteios
}

async function buscarCartelasSorteioPessoa(id_pessoa, id_sorteio){
    let sorteios = await knex.select('cartela.*')
    .join('jogo', 'jogo.id_jogo', 'cartela.id_jogo')
    .join('sorteio', 'sorteio.id_sorteio', 'jogo.id_sorteio')
    .from('cartela')
    .where('cartela.id_pessoa',id_pessoa)
    .where('sorteio.id_sorteio',id_sorteio)

    return sorteios
}

async function buscarUltimaEdicao(){
    let sorteios = await knex.select()
    .from('sorteio')
    .orderBy('edicao', 'desc');
    
    if(sorteios.length < 1 ){
        return undefined
    }
    return sorteios[0]
}

async function atualizar(endereco){
    return await knex('pessoa_endereco').update({
        uf: endereco.uf,
        cep: endereco.cep,
        ibge: endereco.ibge,
        cidade: endereco.cidade.trim(),
        bairro: endereco.bairro.trim(),
        logradouro: endereco.logradouro.trim(),
        numero: endereco.numero,
        complemento: endereco.complemento?.trim(),
        endereco_entrega: endereco.endereco_entrega,
        data_atualizacao: knex.raw('now()'),
    }).where('id_endereco', endereco.id_endereco);
}

async function excluir(endereco){
    let enderecos = await knex.del()
    .from('pessoa_endereco')
    .where('id_endereco',endereco.id_endereco);
    return enderecos
}

module.exports = {
    buscarSorteiosPendentes,
    buscarUltimosSorteios,
    buscarCartelasSorteioPessoa,
    buscarUltimaEdicao,
    buscarPorIdSorteio,
    buscarSorteiosPessoa,
    registrar,
    atualizar,
    excluir
}


