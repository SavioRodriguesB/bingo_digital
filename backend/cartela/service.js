const model = require("./model")
const { v4: uuidv4 } = require('uuid');
const serviceSorteio = require('../sorteio/service')
const servicePessoa = require('../pessoa/service')


async function buscarSorteioPessoaParticipa(id_pessoa, situacao){
    let sorteios_ids = await model.buscarSorteiosPendentesPessoa(id_pessoa, situacao)

    let sorteios = []
    for(let sorteio of sorteios_ids){
        sorteios.push(await serviceSorteio.buscarPorIdSorteioJogoPrincipal(sorteio.id_sorteio))
    }

    return sorteios
}

async function buscarCartelasPessoa(params){
    let cartelas = await model.buscarCartelasPessoa(params)

    let sorteios = []
    for(let cartela of cartelas){
        let sorteioAux = await buscarSorteioCartela(cartela.id_cartela)

        if(!sorteios.find(item => item.id_sorteio === sorteioAux.id_sorteio)){
            let sorteio = await serviceSorteio.buscarPorIdSorteioJogos(sorteioAux.id_sorteio)
            sorteios.push(sorteio)
        }

        let aux = sorteios.find(sorteio => {
            return sorteio.jogos.some(jogo => jogo.id_jogo == cartela.id_jogo);
        });

        if(aux){
            let jogo = aux.jogos.find(jogo => jogo.id_jogo === cartela.id_jogo)
            if(jogo.cartelas){
                jogo.cartelas.push(cartela)
            }else{
                jogo.cartelas = [cartela]
            }
        }
       
    }

    return sorteios
}

const confirmarCompraCartela = async (id_sorteio, id_pessoa, quantidade) => {

    let sorteio = await serviceSorteio.buscarPorIdSorteioJogos(id_sorteio);
    let pessoa = await servicePessoa.buscarPorIdPessoa({id_pessoa});

    if(!sorteio){
        let error = new Error('sorteio não encontrado') 
        error.code =  'REGISTRO_INVALIDO'
        throw error
    }

    if(sorteio.status != 0){
        var error = new Error('status do sorteio inválido') 
        error.code = 'REGISTRO_INVALIDO'
        throw error
    }

    if(!pessoa){
        let error = new Error('pessoa não encontrada') 
        error.code = 'REGISTRO_INVALIDO'
        throw error
    }

    for(let c = 0; c < quantidade; c++){
        
        for(jogo of sorteio.jogos){
            let cartela = {}
            cartela.id_cartela = uuidv4();
            cartela.id_jogo = jogo.id_jogo
            cartela.id_pessoa = pessoa.id_pessoa
            cartela.numeros = []
            cartela.premiada = 0

            for(let i = 0; i < jogo.numeros_cartela; i++){
                let numero
                do{
                    numero = Math.floor(Math.random() * (jogo.numeros_total - 1) + 1)
                }while(cartela.numeros.indexOf(numero) != -1)
                cartela.numeros.push(numero)
            }
            cartela.numeros = cartela.numeros.sort((a,b) => {return a-b})
            
            await model.registrar(cartela)
        }
    }

    return true
}

module.exports = {
    confirmarCompraCartela,
    buscarSorteioPessoaParticipa,
    buscarCartelasPessoa,
}