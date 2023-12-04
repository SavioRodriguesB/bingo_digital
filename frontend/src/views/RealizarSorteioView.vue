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
      <v-card class="mt-4">
        <v-card-title class="text-center">
          {{ jogo.premiacao }}
        </v-card-title>
        <v-card-subtitle class="text-center">
          {{ jogo.id_jogo }}
        </v-card-subtitle>
        <v-card class="my-4 mx-2" variant="outlined" >
          <v-card-item>
            <v-row align="center"
                  justify="center"
            >
              <v-col cols="12" sm="7" class="mx-auto text-center">
                <v-card-title> Números Sorteados </v-card-title>
                <div v-if="jogo.numeros_sorteados">
                  <cartela :numero-maximo="jogo.numeros_total" :numeros-fixados="jogo.numeros_sorteados" /> <br>
                  <h2>Sorteio Realizado<br> Vencedores</h2>
                  <h3 v-for="(vencedor,index) of jogo.pessoa_nome" :key="index"> {{vencedor}}</h3>
                </div>
                <div v-else> <h2>Sorteio não realizado </h2></div>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
        
        <v-card v-if="!jogo.numeros_sorteados">
          <v-card-item>
            <v-row align="center"
                  justify="center"
            >
              <v-col cols="12" sm="9" class="mx-auto text-center">
                <v-card-title> Números do Sorteio </v-card-title>
                  <cartela :numero-maximo="jogo.numeros_total" /> <br>
                </v-col>
                
              </v-row>
              <div class="mx-auto text-center">
                <v-btn disabled block variant="outlined">Gerar com números escolhidos </v-btn>
              </div>
              <v-btn block variant="outlined" class="mt-2" @click="realizarSorteioAleatorio(jogo.id_jogo)">Gerar com números aletórios</v-btn>
          </v-card-item>
        </v-card>
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
  import Swal from 'sweetalert2'

  var isVisibleDialogCompraFinalizada = ref(false)
  var sorteio = ref()

  const realizarSorteioAleatorio = async (id_jogo) => {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Iniciar sorteio?",
        text: "Ao confirmar o sorteio será iniciado com números aleatórios.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Iniciar Sorteio",
        denyButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.post('/jogo/realizar-sorteio', { id_jogo });

        Swal.fire({
          icon: "success",
          title: "Sorteio Finalizado!",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
          denyButtonText: "Cancelar",
        }).then(() => {
          router.go();
        });
      }
    } catch (error) {
      console.error("Erro ao realizar sorteio:", error);

      Swal.fire({
        icon: "error",
        title: "Erro ao realizar sorteio",
        text: "Houve um erro ao tentar realizar o sorteio.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };

  onBeforeMount(async () => {
    let response = await axios.get('/sorteio/'+router.currentRoute.value.params.sorteio);
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