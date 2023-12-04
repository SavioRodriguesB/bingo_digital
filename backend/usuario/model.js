let knex = require("../database/connection");

async function buscarPorEmail(email){
    var usuarios = await knex.select().where({email}).andWhere(knex.raw("(data_inativacao IS NULL OR data_inativacao <= now())")).from("usuario");

    if(usuarios.length > 0){
        return usuarios[0];
    }else{
        return undefined;
    }
}

async function buscarRoles(params){
    var usuarios = await knex.select(['roles']).where('id_usuario', params.id_usuario).andWhere(knex.raw("(data_inativacao IS NULL OR data_inativacao <= now())")).from("usuario");

    if(usuarios.length > 0){
        return usuarios[0];
    }else{
        return undefined;
    }
}

async function registrar(usuario){
    return await knex.insert({
        id_usuario: usuario.id_usuario,
        roles: usuario.roles,
        email: usuario.email.trim(),
        senha: usuario.senha,
        data_inclusao: knex.raw('now()')
    }).into('usuario').returning(['id_usuario'])
}

module.exports = {
    buscarRoles,
    buscarPorEmail,
    registrar
}