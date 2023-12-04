const express = require("express");
const router = express.Router();
const {existeOuErro} = require("../util/validacao")
let service = require("./service");
const AdminAuth = require("../middleware/AdminAuth")

router.post("/realizar-sorteio", AdminAuth, async (req,res) => {
    let params = req.body
    try{
        existeOuErro(params.id_jogo, 'Parâmetro id_jogo ausente')
        
        let sorteio = await service.realizarSorteio(params)

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