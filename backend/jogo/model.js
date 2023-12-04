let knex = require("../database/connection");

async function registrar(jogo){
    return await knex.insert({
        id_jogo: jogo.id_jogo,
        id_sorteio: jogo.id_sorteio,
        id_pessoa: jogo.id_pessoa,
        premiacao: jogo.premiacao,
        principal: jogo.principal? 1: 0,
        numeros_total: jogo.numeros_total,
        numeros_sorteados: jogo.numeros_sorteados,
        numeros_cartela: jogo.numeros_cartela,
        data_inclusao: knex.raw('now()'),
    }).into('jogo').returning(['id_jogo'])
}

async function buscarJogoPrincipalSorteio(id_sorteio){
    let jogo = await knex.select('id_jogo', 'id_pessoa', 'premiacao')
    .from('jogo')
    .where('principal', 1)
    .andWhere('id_sorteio',id_sorteio)

    return jogo
}

async function buscarPorIdJogo(id_jogo){
    let jogos = await knex.select()
    .from('jogo')
    .where('id_jogo',id_jogo)

    return jogos[0] || undefined
}

async function buscarVencedorJogo(id_jogo, numeros_sorteados){
    let cartelas = await knex.select()
    .from('cartela')
    .where('id_jogo',id_jogo)
    .andWhere('numeros', '<@' ,[numeros_sorteados])

    return cartelas.length > 0 ? cartelas : undefined
}

async function buscarPessoaVencedorJogo(id_jogo){
    let vencedores = await knex.select('pessoa.*')
    .from('cartela')
    .join('pessoa', 'pessoa.id_pessoa', 'cartela.id_pessoa')
    .where('cartela.id_jogo',id_jogo)
    .andWhere('cartela.premiada', 1)

    return vencedores
}

async function buscarJogosSorteio(id_sorteio){
    let jogos = await knex.select()
    .from('jogo')
    .where('id_sorteio',id_sorteio)

    return jogos
}

async function validarExisteCartela(id_jogo){
    let cartelas = await knex.select()
    .from('cartela')
    .where('id_jogo',id_jogo)

    return cartelas.length > 0 ? true : false
}

async function premiarCartelaJogo(id_cartela){
    await knex('cartela').update({premiada: 1}).where('id_cartela', id_cartela)
}

async function finalizarSorteioJogo(jogo){
    await knex('jogo').update(
        {
            numeros_sorteados: jogo.numeros_sorteados,
            id_pessoa: jogo.id_pessoa
        }
    )
    .where('id_jogo', jogo.id_jogo)
}


module.exports = {
    buscarJogoPrincipalSorteio,
    buscarJogosSorteio,
    buscarPorIdJogo,
    buscarVencedorJogo,
    registrar,
    buscarPessoaVencedorJogo,
    validarExisteCartela,
    premiarCartelaJogo,
    finalizarSorteioJogo
}