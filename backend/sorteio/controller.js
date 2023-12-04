const express = require("express");
const router = express.Router();
const {existeOuErro} = require("../util/validacao")
const service = require("./service");
const PrivateAuth = require("../middleware/PrivateAuth");
const AdminAuth = require("../middleware/AdminAuth");
 

router.get("/pendentes", async (req,res) => {
    try{
        let sorteios = await service.buscarSorteiosPendentes()

        if(sorteios){
            return res.status(200).send(sorteios)
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

router.get("/ultimos", async (req,res) => {
    try{
        let sorteios = await service.buscarUltimosSorteios()

        if(sorteios){
            return res.status(200).send(sorteios)
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

router.get("/:id_sorteio" , async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_sorteio, 'Parâmetro id_sorteio ausente')

        let sorteio = await service.buscarPorIdSorteioJogos(params.id_sorteio)

        if(sorteio){
            return res.status(200).send(sorteio)
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

router.post("/", AdminAuth, async (req,res) => {
    let params = req.body
    try{
        existeOuErro(params.data_sorteio, 'Parâmetro data_sorteio ausente')
        existeOuErro(params.titulo, 'Parâmetro titulo ausente')
        existeOuErro(params.valor, 'Parâmetro valor ausente')
        existeOuErro(params.limite_jogo_pessoa, 'Parâmetro limite_jogo_pessoa ausente')
        existeOuErro(params.jogos, 'Parâmetro jogos ausente')
        
        for(i in params.jogos){
            existeOuErro(params.jogos[i].premiacao, 'Parâmetro premiacao ausente no jogo ' + i + ' enviado')
            existeOuErro(params.jogos[i].numeros_total, 'Parâmetro numeros_total ausente no jogo ' + i + ' enviado')
            existeOuErro(params.jogos[i].numeros_cartela, 'Parâmetro numeros_cartela ausente no jogo ' + i + ' enviado')
        }

        let sorteio = await service.registrar(params)

        if(sorteio){
            return res.sendStatus(201)
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