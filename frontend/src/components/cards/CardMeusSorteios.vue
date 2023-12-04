<template>
  <v-container fluid>
    <v-card :to="urlSorteio">
      <v-img
        src="/src/assets/bingo.png"
          class="align-end"
          height="250px"
          cover
      >
        <v-card-title class="text-white text-uppercase"> {{ sorteio.titulo }} </v-card-title>
      </v-img>
      <v-divider/>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn size="small" variant="outlined"> VER CARTELAS </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps(['sorteio'])

  let urlSorteio = ref(`/sorteio/${props.sorteio.id_sorteio}/${localStorage.getItem('id_pessoa')}`)
  
</script>

<style>

</style>