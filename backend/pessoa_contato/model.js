let knex = require("../database/connection");

async function buscarPorIdPessoa(contato){
    let contatos = await knex.select('id_contato', 'tipo_contato', 'contato')
    .from('pessoa_contato')
    .where('id_pessoa',contato.id_pessoa);

    return contatos
}

async function buscarPorIdPessoaEIdContato(contato){
    let contatos = await knex.select()
    .from('pessoa_contato')
    .where('id_pessoa',contato.id_pessoa)
    .andWhere('id_contato',contato.id_contato);

    if(contatos.length > 1 ){
        return undefined
    }
    return contatos[0]
}

async function buscarPorIdContato(contato){
    let contatos = await knex.select()
    .from('pessoa_contato')
    .where('id_contato',contato.id_contato);
    
    if(contatos.length > 1 ){
        return undefined
    }
    return contatos[0]
}

async function buscarEmailLogin(email){
    let contatos = await knex.select('email')
    .where({email})
    .from('usuario');

    if(contatos.length > 0){
        return undefined
    }
    return contatos[0]
}

async function registrar(contato){
    return await knex.insert({
        id_contato: contato.id_contato,
        id_pessoa: contato.id_pessoa,
        tipo_contato: contato.tipo_contato,
        contato: contato.contato.trim(),
        data_inclusao: knex.raw('now()'),
    }).into('pessoa_contato');
}

async function atualizar(contato){
    return await knex('pessoa_contato').update({
        tipo_contato: contato.tipo_contato,
        contato: contato.contato.trim(),
        data_atualizacao: knex.raw('now()'),
    }).where('id_contato', contato.id_contato);
}

async function excluir(contato){
    let contatos = await knex.del()
    .from('pessoa_contato')
    .where('id_contato',contato.id_contato);
    return contatos
}

module.exports = {
    buscarPorIdPessoa,
    buscarPorIdContato,
    buscarPorIdPessoaEIdContato,
    registrar,
    atualizar,
    buscarEmailLogin,
    excluir
}