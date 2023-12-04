const express = require("express");
const router = express.Router();
const {existeOuErro} = require("../util/validacao")
let service = require("./service");
const PrivateAuth = require("../middleware/PrivateAuth")
 

router.get("/:id_pessoa/", PrivateAuth , async (req,res) => {
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

router.put("/:id_pessoa", PrivateAuth ,async (req,res) => {
    let params = {...req.params,...req.body}
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')

        existeOuErro(params.nome, 'Parâmetro nome ausente')
        existeOuErro(params.nome_completo, 'Parâmetro nome_completo ausente')
        existeOuErro(params.data_nascimento, 'Parâmetro data_nascimento ausente')

        let pessoa = await service.atualizar(params)

        if(pessoa){
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

router.delete("/:id_pessoa", PrivateAuth, async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')

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

router.get('/sorteios/:id_pessoa/:situacao', PrivateAuth, async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.situacao, 'Parâmetro situacao ausente')

        let sorteios = await service.buscarSorteiosPessoaParticipa(params.id_pessoa, params.situacao)

        if(sorteios){
            return res.status(200).send(sorteios)
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

router.get('/sorteio/:id_pessoa/:id_sorteio', PrivateAuth, async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.id_sorteio, 'Parâmetro id_sorteio ausente')

        let sorteios = await service.buscarCartelasSorteioPessoa(params.id_pessoa, params.id_sorteio)

        if(sorteios){
            return res.status(200).send(sorteios)
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

module.exports = router;