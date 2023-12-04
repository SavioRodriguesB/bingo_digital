const express = require("express");
const router = express.Router();
const {existeOuErro, charLengthLimitOuErro} = require("../util/validacao")
let service = require("./service");
const PrivateAuth = require("../middleware/PrivateAuth")
 

router.get("/:id_pessoa/enderecos", PrivateAuth , async (req,res) => {
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

router.get("/:id_pessoa/endereco/:id_endereco", PrivateAuth , async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.id_endereco, 'Parâmetro id_endereco ausente')

        let contatos = await service.buscarPorIdPessoaEIdContato(params)

        if(contatos){
            return res.status(200).send(contatos)
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

router.post("/endereco", async (req,res) => {
    let params = req.body
    console.log(params)
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.uf, 'Parâmetro uf ausente')
        charLengthLimitOuErro(params.uf, 2,'Parâmetro uf inválido')
        existeOuErro(params.cidade, 'Parâmetro cidade ausente')
        existeOuErro(params.bairro, 'Parâmetro bairro ausente')
        existeOuErro(params.logradouro, 'Parâmetro logradouro ausente')
        existeOuErro(params.numero, 'Parâmetro numero ausente')
        existeOuErro(params.complemento, 'Parâmetro complemento ausente')
        existeOuErro(params.endereco_entrega, 'Parâmetro endereco_entrega ausente')

        let contato = await service.registrar(params)

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

router.put("/:id_pessoa/endereco/:id_endereco", async (req,res) => {
    let params = {...req.params,...req.body}
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.id_endereco, 'Parâmetro id_endereco ausente')

        existeOuErro(params.uf, 'Parâmetro uf ausente')
        charLengthLimitOuErro(params.uf, 2,'Parâmetro uf inválido')
        existeOuErro(params.cidade, 'Parâmetro cidade ausente')
        existeOuErro(params.bairro, 'Parâmetro bairro ausente')
        existeOuErro(params.logradouro, 'Parâmetro logradouro ausente')
        existeOuErro(params.numero, 'Parâmetro numero ausente')
        existeOuErro(params.complemento, 'Parâmetro complemento ausente')
        existeOuErro(params.endereco_entrega, 'Parâmetro endereco_entrega ausente')

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

router.delete("/:id_pessoa/endereco/:id_endereco", PrivateAuth, async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.id_endereco, 'Parâmetro id_endereco ausente')

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