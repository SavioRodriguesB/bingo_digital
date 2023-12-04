<template>
  <v-container v-if="sorteio">
    <header-component></header-component>
    <v-btn @click="router.go(-1)">VOLTAR</v-btn>
    <v-card class="mt-4">
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
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>

    

    <template v-for="jogo of sorteio.jogos" :key="jogo.id_jogo">
      <v-card class="mt-4 py-4">
        <v-card-title class="text-center">
          {{ jogo.premiacao }}
        </v-card-title>

        <v-card class="mt-4 mx-2" variant="outlined" >
          <v-card-item>
            <v-row align="center"
                  justify="center"
            >
              <v-col cols="12" sm="7" class="mx-auto text-center">
                <v-card-title> Números Sorteados </v-card-title>
                <div v-if="jogo.numeros_sorteados">
                  <cartela :numero-maximo="jogo.numeros_total" :numeros-fixados="jogo.numeros_sorteados" /> <br>
                </div>
                <div v-else> <h2>Sorteio não realizado </h2></div>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
        <div v-if="jogo.cartelas">
          <template v-for="(cartela, index) of jogo.cartelas" :key="cartela.id_cartela">
            <v-card variant="outlined" class="mt-2 mx-2">
              <v-card-item>
                <v-row align="center"
                      justify="center"
                >
                  <v-col cols="12" sm="7" class="mx-auto text-center">
                    <v-chip variant="flat" color="green" v-if="cartela.premiada == 1">
                      Premiada
                    </v-chip>
                    <v-card-title> 
                        Cartela {{ index + 1 }}
                    </v-card-title>
                    <v-card-subtitle class="text-center">
                      {{ cartela.id_cartela }}
                    </v-card-subtitle>
                    <cartela :numeros-fixados="jogo.numeros_sorteados" :numeros="cartela.numeros"/> 
                    
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </template>
        </div>
        <div v-else class="text-center"><h3>Não há cartelas para o jogo</h3></div>
      </v-card>
    </template>
    
    <dialog-compra-finalizada
      v-model="isVisibleDialogCompraFinalizada"
    />
  </v-container>
</template>

<script setup>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import Cartela from '@/components/CartelaComponent.vue'
  import DialogCompraFinalizada from '@/components/dialogs/CompraFinalizada.vue'
  import { onBeforeMount, ref } from 'vue'
  import router from '@/router';
  import axios  from '@/plugins/axios'

  var isVisibleDialogCompraFinalizada = ref(false)
  var sorteio = ref()

  onBeforeMount(async () => {
    let response = await axios.get('/pessoa/sorteio/'+localStorage.getItem('id_pessoa')+'/'+ router.currentRoute.value.params.sorteio);
    sorteio.value = response.data
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