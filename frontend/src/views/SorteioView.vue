<template>
  <v-container v-if="sorteio">
    <header-component></header-component>
    <v-btn @click="router.push({ name: 'Home' })">VOLTAR</v-btn>
    <v-card class="mt-4">
      <v-card>
        <v-img
          src="/src/assets/bingo.png"
          class="align-end"
          height="400px"
          cover
        >
            <v-card-title class="text-white text-uppercase"> {{ sorteio.titulo }} </v-card-title>
        </v-img>
        <v-card-item>
          <v-row>
            <v-col>
              <v-card-title class="d-flex justify-space-between"> 
                <div>{{ sorteio.jogos[0].premiacao }}</div>
                <div class="justify-center">EDIÇÃO <br> <div class="d-flex justify-end">{{ sorteio.edicao }}</div></div>
              </v-card-title>
            </v-col>
          </v-row>
          <v-row no-gutters class="mx-0 px-0">
            <v-col no-gutters class="ml-0">
              <v-card-text class="mx-0 px-0 d-flex justify-space-between"> 
                <div><b>Data do Sorteio</b> <br> {{ new Date(sorteio.data_sorteio).toLocaleString().replace(',',' ') }} </div>
                <div v-if="sorteio.nome_vencedor"><b>Vencedor</b> <br> {{ sorteio.nome_vencedor }} </div>
                <div v-else> 
                  <quantidade-cartela 
                    :limite-compra="sorteio.limite_jogo_pessoa"
                    :valor-cartela="sorteio.valor"
                    :sorteio="router.currentRoute.value.params.sorteio"
                  /> 
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>

      <template v-for="jogo of sorteio.jogos" :key="jogo.id_jogo">
        <v-card class="mt-4" variant="outlined">
          <v-card-title class="text-center">
            {{ jogo.premiacao }}
          </v-card-title>
          <v-card-subtitle class="text-center">
            {{ jogo.id_jogo }}
          </v-card-subtitle>
          <v-card-item>
            <v-row align="center"
                  justify="center"
            >
              <v-col class="mx-auto text-center">
                <v-card-title> Números </v-card-title>
                <cartela :numero-maximo="jogo.numeros_total" :numeros-fixados="jogo.numeros_sorteados" /> <br>
                <div v-if="jogo.numeros_sorteados">
                  <h2>Sorteio Realizado<br> Vencedores</h2>
                  <h3 v-for="(vencedor,index) of jogo.pessoa_nome" :key="index"> {{vencedor}}</h3>
                </div>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </template>
    </v-card>
    <dialog-compra-finalizada
      v-model="isVisibleDialogCompraFinalizada"
    />
  </v-container>
</template>

<script setup>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import Cartela from '@/components/CartelaComponent.vue'
  import QuantidadeCartela from '@/components/QuantidadeCartela.vue'
  import DialogCompraFinalizada from '@/components/dialogs/CompraFinalizada.vue'
  import { onBeforeMount, ref } from 'vue'
  import router from '@/router';
  import axios  from '@/plugins/axios'

  var isVisibleDialogCompraFinalizada = ref(false)
  var sorteio = ref()

  onBeforeMount(async () => {
    let response = await axios.get('/sorteio/'+ router.currentRoute.value.params.sorteio);
    sorteio.value = response.data
    console.log(response.data)
  })
</script>

<style>
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
  input[type="number"] {
      -moz-appearance: textfield;
  }
</style>