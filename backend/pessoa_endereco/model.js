let knex = require("../database/connection");

async function registrar(endereco){
    return await knex.insert({
        id_endereco: endereco.id_endereco,
        id_pessoa: endereco.id_pessoa,
        cep: endereco.cep,
        uf: endereco.uf,
        ibge: endereco.ibge,
        cidade: endereco.cidade.trim(),
        bairro: endereco.bairro.trim(),
        logradouro: endereco.logradouro.trim(),
        numero: endereco.numero,
        complemento: endereco.complemento?.trim(),
        endereco_entrega: endereco.endereco_entrega,
        data_inclusao: knex.raw('now()'),
    }).into('pessoa_endereco').returning(['id_endereco'])
}

async function buscarPorIdPessoa(endereco){
    let enderecos = await knex.select('id_endereco', 'id_pessoa', 'uf', 'cidade', 'cep', 'ibge', 'bairro', 'logradouro', 'numero', 'complemento', 'endereco_entrega')
    .from('pessoa_endereco')
    .where('id_pessoa',endereco.id_pessoa);

    return enderecos
}

async function buscarPorIdPessoaEIdEndereco(endereco){
    let enderecos = await knex.select()
    .from('pessoa_endereco')
    .where('id_pessoa',endereco.id_pessoa)
    .andWhere('id_endereco',endereco.id_endereco);

    if(enderecos.length > 1 ){
        return undefined
    }
    return enderecos[0]
}

async function buscarPorIdPessoaEnderecoEntrega(endereco){
    let enderecos = await knex.select()
    .from('pessoa_endereco')
    .where('id_pessoa',endereco.id_pessoa)
    .andWhere('endereco_entrega', 1);

    if(enderecos.length > 1 ){
        return undefined
    }
    return enderecos[0]
}

async function buscarPorIdEndereco(endereco){
    let enderecos = await knex.select()
    .from('pessoa_endereco')
    .where('id_endereco',endereco.id_endereco);
    
    if(enderecos.length > 1 ){
        return undefined
    }
    return enderecos[0]
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
    buscarPorIdEndereco,
    buscarPorIdPessoa,
    buscarPorIdPessoaEIdEndereco,
    buscarPorIdPessoaEnderecoEntrega,
    registrar,
    atualizar,
    excluir
}


