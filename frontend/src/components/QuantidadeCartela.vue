<template>
  <v-dialog v-model="visible" width="500" >
    <v-container>
    <v-card variant="flat" class="px-5 py-5" v-if="usuario_logado"> 
      <v-row class="text-center">
        <v-col>
          <v-card-title> Compre Agora! </v-card-title>
          <v-card-subtitle> Apenas {{ formatarValor(Number(valorCartela)) }} a cartela! </v-card-subtitle>
        </v-col>
      </v-row>

      <v-row justify="space-around">
        <v-col>
          <v-card-item class="pl-0 text-center">
            Quantidade
            <v-row class="pb-2 text-center">
              <v-col cols="5">
                <v-btn
                  @click="qtd != 0 ? qtd-- : 0"
                  class="mt-1"
                  icon="mdi mdi-minus"
                  size="small"
                >
                </v-btn>
              </v-col>
              <v-col cols="2" class="mx-0 px-0">
                <div class="mt-3">{{ qtd }}</div>
              </v-col>
              <v-col cols="5" class="mx-0 px-0">
                <v-btn
                  @click="qtd != limiteCompra ? qtd++ : 0"
                  class="mt-1 pl-0"
                  icon="mdi mdi-plus"
                  size="small"
                >
                  <v-icon icon="mdi mdi-plus" />
                </v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-col>
        <v-col cols="4">
          <v-card-item class="pl-0 text-center"> Valor </v-card-item>
          <v-card-item class="pl-0 text-center"> {{ formatarValor(qtd * valorCartela) }} R$ </v-card-item>
        </v-col>
      </v-row>
      <v-row >
        <v-col class="mx-auto text-center" cols="12">
          <small> As cartelas serão geradas a partir de número escolhidos aleatóriamente </small>
          <v-btn block variant="outlined" @click="efetivarCompra"> Comprar! </v-btn>
          <v-btn block class="mt-2" variant="outlined" @click="visible = false"> Fechar </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card variant="flat" v-else>
      <v-row>
        <v-col>
          <v-card-text class="text-center"> Faça o Login para realizar a compra da cartela e concorrer a prêmios incríveis </v-card-text>
          <v-card-actions> 
            <v-btn variant="outlined" class="mr-2" to="../login" block>
              Login
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      
    </v-card>
  </v-container>
  </v-dialog>
  <v-btn block variant="outlined" @click="visible = true"> Compre Agora! </v-btn>
</template>

<script setup>
  import {ref} from 'vue'
  import axios from '@/plugins/axios';
  import Swal from 'sweetalert2';
  import router from '@/router';

  var visible = ref(false)
  var qtd = ref(0)
  var usuario_logado = ref(localStorage.getItem('token_jwt') ? true : false)

  const props = defineProps({
    valorCartela: String,
    limiteCompra: String,
    sorteio: String
  })

  const efetivarCompra = async () => {
    await axios.post(`/cartela/${props.sorteio}/${localStorage.getItem('id_pessoa')}/${qtd.value}`)

    visible.value = false
    Swal.fire({
        icon: "success",
        title: "Cartelas compradas com sucesso!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({name:"SorteiosPessoa", params:{pessoa: localStorage.getItem('id_pessoa')}})
        }
      })
  }

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

</script>

<style>


</style>