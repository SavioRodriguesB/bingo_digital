const express = require("express");
const router = express.Router();
const {existeOuErro} = require("../util/validacao")
let service = require("./service");
const PrivateAuth = require("../middleware/PrivateAuth")
 

router.get("/:id_pessoa/contatos", PrivateAuth , async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')

        let contatos = await service.buscarPorIdPessoa(params)

        if(contatos){
            return res.status(200).send(contatos)
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

router.get("/:id_pessoa/contato/:id_contato", PrivateAuth , async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.id_contato, 'Parâmetro id_contato ausente')

        let contatos = await service.buscarPorIdPessoaEIdContato(params)

        if(contatos){
            return res.status(200).send(contatos)
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

router.post("/contato", async (req,res) => {
    let params = req.body
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.tipo_contato, 'Parâmetro tipo_contato ausente')
        existeOuErro(params.contato, 'Parâmetro contato ausente')

        let contato = await service.registrar(params)

        if(contato){
            return res.sendStatus(200)
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

router.put("/:id_pessoa/contato/:id_contato", async (req,res) => {
    let params = {...req.params,...req.body}
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.id_contato, 'Parâmetro id_contato ausente')
        existeOuErro(params.tipo_contato, 'Parâmetro tipo_contato ausente')
        existeOuErro(params.contato, 'Parâmetro id_contato ausente')

        let contato = await service.atualizar(params)

        if(contato){
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

router.delete("/:id_pessoa/contato/:id_contato", PrivateAuth, async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.id_contato, 'Parâmetro id_contato ausente')

        let contato = await service.excluir(params)

        if(contato){
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