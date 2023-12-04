let knex = require("../database/connection");

async function buscarPorIdPessoa(chave){
    let chaves = await knex.select('chave', 'tipo_chave')
    .from('pessoa_chave_pix')
    .where('id_pessoa',chave.id_pessoa);

    return chaves
}

async function buscarPorIdPessoaEChave(chave){
    let chaves = await knex.select()
    .from('pessoa_chave_pix')
    .where('id_pessoa',chave.id_pessoa)
    .andWhere('chave',chave.chave);

    if(chaves.length > 1 ){
        return undefined
    }
    return chaves[0]
}

async function buscarPorChave(chave){
    let chaves = await knex.select()
    .from('pessoa_chave_pix')
    .where('chave',chave.chave);
    
    if(chaves.length > 1 ){
        return undefined
    }
    return chaves[0]
}

async function registrar(chave){
    return await knex.insert({
        chave: chave.chave,
        id_pessoa: chave.id_pessoa,
        tipo_chave: chave.tipo_chave,
        chave: chave.chave.trim(),
        data_inclusao: knex.raw('now()'),
    }).into('pessoa_chave_pix');
}

async function atualizar(chave){
    return await knex('pessoa_chave_pix').update({
        tipo_chave: chave.tipo_chave,
        chave: chave.chave.trim(),
        data_atualizacao: knex.raw('now()'),
    }).where('chave', chave.chave).andWhere('id_pessoa', chave.id_pessoa);
}

async function excluir(chave){
    let chaves = await knex.del()
    .from('pessoa_chave_pix')
    .where('chave',chave.chave)
    .andWhere('id_pessoa', chave.id_pessoa);
    return chaves
}

module.exports = {
    buscarPorIdPessoa,
    buscarPorChave,
    buscarPorIdPessoaEChave,
    registrar,
    atualizar,
    excluir
}