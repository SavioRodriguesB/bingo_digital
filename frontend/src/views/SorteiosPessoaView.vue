<template>
  <v-container>
    <header-component/>
    <v-btn class="mb-2" @click="router.push({ name: 'Home' })">VOLTAR</v-btn>
    <v-row v-if="sorteios.length > 0">
      <v-col class="px-0">
      <b class="pl-4">Sorteios em que participa</b><br>
        <template v-for="(sorteio) of sorteios" :key="sorteio.id_sorteio">
          <card-meus-sorteios :sorteio="sorteio"/>
        </template>
      </v-col>
    </v-row>

    <div v-else>
        <h2 class="text-center mt-8">Você ainda não participa de nenhum sorteio!</h2>
    </div>
  </v-container>
</template>

<script setup>
  import CardMeusSorteios from '@/components/cards/CardMeusSorteios.vue'
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import { onBeforeMount, ref } from 'vue'
  import router from '@/router';
  import axios from '@/plugins/axios'

  let sorteios = ref([])

  onBeforeMount(async () => {

    try {
      let response = await axios.get(`/pessoa/sorteios/${localStorage.getItem('id_pessoa')}/1`)
      sorteios.value = response.data.sort((a, b) => new Date(a.data_sorteio) - new Date(b.data_sorteio))


    } catch (error) {
      console.log(error)
    }
    
  })
</script>  