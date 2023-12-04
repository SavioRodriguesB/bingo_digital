let knex = require("../database/connection");

async function buscarPorUsuario(id_usuario){
    var pessoas = await knex.select().where({id_usuario}).andWhere(knex.raw("(data_inativacao IS NULL OR data_inativacao <= now())")).from("pessoa");

    if(pessoas.length > 0){
        return pessoas[0];
    }else{
        return undefined;
    }
}

async function buscarPorIdPessoa(pessoa){
    let pessoas = await knex.select()
    .from('pessoa')
    .where('id_pessoa',pessoa.id_pessoa)

    if(pessoas.length > 1 ){
        return undefined
    }
    return pessoas[0]
}

async function registrar(pessoa){
    return await knex.insert({
        id_pessoa: pessoa.id_pessoa,
        id_usuario: pessoa.id_usuario,
        nome: pessoa.nome.trim(),
        nome_completo: pessoa.nome_completo.trim(),
        data_nascimento: pessoa.data_nascimento,
        data_inclusao: knex.raw('now()'),
    }).into('pessoa').returning(['id_pessoa'])
}

async function atualizar(pessoa){
    return await knex('pessoa').update({
        nome: pessoa.nome.trim(),
        nome_completo: pessoa.nome_completo.trim(),
        data_nascimento: pessoa.data_nascimento,
        data_atualizacao: knex.raw('now()'),
    }).where('id_pessoa', pessoa.id_pessoa);
}

async function excluir(pessoa){
    await knex.del()
    .from('pessoa')
    .where('id_pessoa',pessoa.id_pessoa);
}

async function excluirUsuario(usuario){
    await knex.del()
    .from('usuario')
    .where('id_usuario',usuario.id_usuario);
}

async function atualizarImagemIcone(pessoa){
    return await knex('pessoa').update({
        imagem_icone: pessoa.imagem_icone,
        data_atualizacao: knex.raw('now()'),
    }).where('id_pessoa', pessoa.id_pessoa);
}

async function atualizarImagemBanner(pessoa){
    return await knex('pessoa').update({
        imagem_banner: pessoa.imagem_banner,
        data_atualizacao: knex.raw('now()'),
    }).where('id_pessoa', pessoa.id_pessoa);
}

module.exports = {
    buscarPorUsuario,
    buscarPorIdPessoa,
    registrar,
    atualizar,
    atualizarImagemIcone,
    atualizarImagemBanner,
    excluir,
    excluirUsuario
}