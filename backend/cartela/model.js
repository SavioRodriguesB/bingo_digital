let knex = require("../database/connection");

async function buscarPorIdPessoa(id_pessoa){
    let cartelas = await knex.select()
    .from('cartela')
    .where('id_pessoa', id_pessoa)
    
    return cartelas[0] || undefined
}

async function buscarSorteioCartela(id_cartela){
    let sorteio = await knex.select(['id_sorteio', 'titulo', 'imagem_banner', 'edicao'])
    .join('jogo', 'jogo.id_cartela', 'cartela.id_cartela')
    .join('sorteio', 'sorteio.id_jogo', 'jogo.id_jogo')
    .from('cartela')
    .where('id_cartela',id_cartela)

    return sorteio[0] || undefined
}

async function registrar(cartela){
    return await knex.insert({
        id_cartela: cartela.id_cartela,
        id_pessoa: cartela.id_pessoa,
        id_jogo: cartela.id_jogo,
        numeros: cartela.numeros,
        premiada: cartela.premiada,
        data_inclusao: knex.raw('now()'),
    }).into('cartela').returning(['id_cartela'])
}

module.exports = {
    buscarPorIdPessoa,
    buscarSorteioCartela,
    registrar
}