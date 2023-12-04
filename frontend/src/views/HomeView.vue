<template>
  <v-container>
    <header-component class="mb-4"/>
    <v-row v-if="sorteios_recentes.length > 0">
        <card-sorteio-destaque :sorteio="sorteios_recentes[0]"/>
    </v-row>
    <div v-else>
       <h2 class="text-center mt-8">Não há sorteios recentes</h2>
    </div>
    <v-row>
      <v-col cols="6" class="px-0">
      <b class="pl-4">Próximos Sorteios</b><br>
        <template v-for="(sorteio) of sorteios_recentes" :key="sorteio.id_sorteio">
          <card-sorteio-destaque :sorteio="sorteio"/>
        </template>
      </v-col>
    
      <v-col cols="6" class="px-0">
      <b class="pl-4">Últimos Sorteios</b>
        <template v-for="(sorteio) of sorteios_ultimos" :key="sorteio.id_sorteio">
          <card-sorteio-destaque :sorteio="sorteio"/>
        </template>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script setup>
  import CardSorteioDestaque from '@/components/cards/CardSorteioDestaque.vue'
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import { onBeforeMount, ref } from 'vue'
  import axios from '@/plugins/axios'

  let sorteios_recentes = ref([])
  let sorteios_ultimos = ref([])

  onBeforeMount(async () => {

    try {
      let response = await axios.get('/sorteio/pendentes/')
      sorteios_recentes.value = response.data.sort((a, b) => new Date(a.data_sorteio) - new Date(b.data_sorteio))

      response = await axios.get('/sorteio/ultimos/')
      sorteios_ultimos.value = response.data.sort((a, b) => new Date(b.data_sorteio) - new Date(a.data_sorteio))

    } catch (error) {
      console.log(error)
    }
    
  })
</script>

<style scoped>

*{
    background-color: aliceblue;
}

</style>
