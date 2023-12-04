const express = require("express");
const router = express.Router();
const { existeOuErro } = require("../util/validacao")
let service = require("./service");

/*router.get('/:id_pessoa/sorteios/:situacao', async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.situacao, 'Parâmetro situacao ausente')

        let sorteios = await service.buscarSorteioPessoaParticipa(params.id_pessoa, params.situacao)

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
});*/

router.get('/:id_pessoa/:id_sorteio', async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')

        let sorteios = await service.buscarCartelasPessoa(params.id_pessoa)

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

router.post("/:id_sorteio/:id_pessoa/:quantidade" , async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_sorteio, 'Parâmetro id_sorteio ausente')
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')
        existeOuErro(params.quantidade, 'Parâmetro quantidade ausente')

        let cartelas = await service.confirmarCompraCartela(params.id_sorteio, params.id_pessoa, params.quantidade)

        if(cartelas){
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

module.exports = router;