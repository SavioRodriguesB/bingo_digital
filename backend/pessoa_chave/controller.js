const express = require("express");
const router = express.Router();
const {existeOuErro} = require("../util/validacao")
let service = require("./service");
const PrivateAuth = require("../middleware/PrivateAuth")
 

router.get("/:id_pessoa/chaves", PrivateAuth , async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')

        let chaves = await service.buscarPorIdPessoa(params)

        if(chaves){
            return res.status(200).send(chaves)
        }

        return res.sendStatus(404)
    }catch(error){
        console.log(error)
        if(error.code ==='PARAMETRO_OBRIGATORIO_AUSENTE' ){
            return res.status(400).send({mensagem: error.message})
        }

        if(error.code ==='REGISTRO_INVALIDO' ){
            return res.status(406).send({mensagem: error.message})
        }
        return res.sendStatus(500)
    }
});

router.get("/:id_pessoa/chave/:id_chave", PrivateAuth , async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.chave, 'Parâmetro chave ausente')

        let chaves = await service.buscarPorIdPessoaEChave(params)

        if(chaves){
            return res.status(200).send(chaves)
        }

        return res.sendStatus(404)
    }catch(error){
        console.log(error)
        if(error.code ==='PARAMETRO_OBRIGATORIO_AUSENTE' ){
            return res.status(400).send({mensagem: error.message})
        }

        if(error.code ==='REGISTRO_INVALIDO' ){
            return res.status(406).send({mensagem: error.message})
        }
        return res.sendStatus(500)
    }
});

router.post("/chave", async (req,res) => {
    let params = req.body
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.chave, 'Parâmetro chave ausente')
        existeOuErro(params.tipo_chave, 'Parâmetro tipo_chave ausente')

        let chave = await service.registrar(params)

        if(chave){
            return res.sendStatus(201)
        }

        return res.sendStatus(404)
    }catch(error){
        console.log(error)
        if(error.code ==='PARAMETRO_OBRIGATORIO_AUSENTE' ){
            return res.status(400).send({mensagem: error.message})
        }

        if(error.code ==='REGISTRO_INVALIDO' ){
            return res.status(406).send({mensagem: error.message})
        }
        return res.sendStatus(500)
    }
});

router.put("/:id_pessoa/chave/:id_chave", async (req,res) => {
    let params = {...req.params,...req.body}
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.chave, 'Parâmetro chave ausente')
        existeOuErro(params.tipo_chave, 'Parâmetro tipo_chave ausente')

        let chave = await service.atualizar(params)

        if(chave){
            return res.sendStatus(200)
        }

        return res.sendStatus(404)
    }catch(error){
        if(error.code ==='PARAMETRO_OBRIGATORIO_AUSENTE' ){
            return res.status(400).send({mensagem: error.message})
        }

        if(error.code ==='REGISTRO_INVALIDO' ){
            return res.status(406).send({mensagem: error.message})
        }
        return res.sendStatus(500)
    }
});

router.delete("/:id_pessoa/chave/:id_chave", PrivateAuth, async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.chave, 'Parâmetro chave ausente')

        let chave = await service.excluir(params)

        if(chave){
            return res.sendStatus(200)
        }

        return res.sendStatus(404)
    }catch(error){
        if(error.code ==='PARAMETRO_OBRIGATORIO_AUSENTE' ){
            return res.status(400).send({mensagem: error.message})
        }

        if(error.code ==='REGISTRO_INVALIDO' ){
            return res.status(406).send({mensagem: error.message})
        }
        return res.sendStatus(500)
    }
});



module.exports = router;