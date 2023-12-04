const express = require("express");
const router = express.Router();
const {existeOuErro} = require("../util/validacao")
let service = require("./service");
const UserAuth = require("../middleware/UserAuth")

router.post("/", async (req,res) => {
    let params = req.body
    try{
        existeOuErro(params.email, 'Parâmetro email ausente')
        existeOuErro(params.senha, 'Parâmetro senha ausente')
        existeOuErro(params.pessoa.nome, 'Parâmetro nome ausente')
        existeOuErro(params.pessoa.sobrenome, 'Parâmetro sobrenome ausente')
        existeOuErro(params.pessoa.data_nascimento, 'Parâmetro data_nascimento ausente')

        let token = await service.registrar(params)

        return res.status(201).send(token)
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

router.post("/login", async (req,res) => {
    let params = req.body
    try{
        existeOuErro(params.email, 'Parâmetro email ausente')
        existeOuErro(params.senha, 'Parâmetro senha ausente')

        let token = await service.login(params)

        if(token){
            return res.status(200).send(token)
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

router.get("/validar-token", UserAuth, async (req,res) => {
    return res.sendStatus(200)
});

router.get("/:id_pessoa/roles", UserAuth, async (req,res) => {
    let params = req.params
    try{
        existeOuErro(params.id_pessoa, 'Parâmetro id_pessoa ausente')

        let roles = await service.buscarRoles(params)

        if(roles){
            return res.status(200).send(roles)
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