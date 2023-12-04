function existeOuErro(valor, mensagemErro){
    if(typeof valor === 'string'){
        if(!valor){
            let error = new Error(mensagemErro)
            error.code = 'PARAMETRO_OBRIGATORIO_AUSENTE'
            throw error
        }
    }else if(typeof valor === 'number'){
       
    }else if(typeof valor === 'object'){
        if(!valor){
            let error = new Error(mensagemErro)
            error.code = 'PARAMETRO_OBRIGATORIO_AUSENTE'
            throw error
        }
    }else{
        let error = new Error(mensagemErro)
        error.code = 'PARAMETRO_OBRIGATORIO_AUSENTE'
        throw error
    }
}

function charLengthLimitOuErro(valor, length, mensagemErro){
    if(valor.length > length){
        let error = new Error(mensagemErro)
        error.code = 'PARAMETRO_INVALIDO'
        throw error
    }
}

module.exports = {existeOuErro, charLengthLimitOuErro}