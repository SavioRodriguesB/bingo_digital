let model = require("./model")
const { v4: uuidv4 } = require('uuid');

async function buscarPorIdJogo(params){
    return await model.buscarPorIdJogo(params)
}

async function buscarVencedorJogo(id_jogo, numeros_sorteados){
    return await model.buscarVencedorJogo(id_jogo, numeros_sorteados)
}

async function buscarJogosSorteio(params){
    return await model.buscarJogosSorteio(params)
}

async function buscarJogoPrincipalSorteio(params){
    return await model.buscarJogoPrincipalSorteio(params)
}

async function registrar(jogo){
    jogo.id_jogo = uuidv4();
    return await model.registrar(jogo)
}

async function validarExisteCartela(params){
    return await model.validarExisteCartela(params)
}

async function buscarPessoaVencedorJogo(id_jogo){
    return await model.buscarPessoaVencedorJogo(id_jogo)
}

async function realizarSorteio(jogoParams){
    let jogo = await buscarPorIdJogo(jogoParams.id_jogo)
    let existe_cartela = await validarExisteCartela(jogoParams.id_jogo)
    let vencedor_jogo

    if(!existe_cartela){
        error = new Error('Não há cartelas para realizar o sorteio.') 
        error.code =  'REGISTRO_INVALIDO'
        throw error
    }

    try{
        if(jogo){
            jogo.numeros_sorteados = []
            do{
                let numero
                
                do{
                    numero = Math.floor(Math.random() * (jogo.numeros_total - 1) + 1)
                }while(jogo.numeros_sorteados.indexOf(numero) != -1)
    
                jogo.numeros_sorteados.push(numero)
    
                jogo.numeros_sorteados = jogo.numeros_sorteados.sort((a, b) => {return a-b})
    
                vencedor_jogo = await buscarVencedorJogo(jogo.id_jogo, jogo.numeros_sorteados)
            }while(!vencedor_jogo)
            
            let vencedores = []
            for(let cartela of vencedor_jogo){
                await model.premiarCartelaJogo(cartela.id_cartela)
                vencedores.push(cartela.id_pessoa)
            }
            jogo.id_pessoa = vencedores

            await model.finalizarSorteioJogo(jogo)
    
        }
    }catch(error){
        console.log(error)
    }
    
    return jogo
}

module.exports = {
    buscarPorIdJogo,
    buscarJogosSorteio,
    buscarJogoPrincipalSorteio,
    buscarVencedorJogo,
    buscarPessoaVencedorJogo,
    registrar,
    realizarSorteio,
    validarExisteCartela
}