<template>
  <v-dialog max-width="400" persistent>
    <v-card>
        <v-card-title class="text-center mb-0 pb-0" > Compra Finalizada! </v-card-title>
        <v-card-subtitle class="text-center text-wrap pt-0"> O sorteio vai acontecer dia <b>10/11/2023 - 20:00h </b> (Horário Brasilia) </v-card-subtitle>
        <v-card-text class="text-center"> A equipe do Bingo Online agradece a compra e te deseja boa sorte! </v-card-text>
        <v-card-actions class="pb-5">
          <v-row justify="space-between">
            <v-col  >
              <v-btn variant="outlined" class="custom-btn" block to="/">
                Fechar
              </v-btn>
            </v-col>
            <v-col class="text-end" to="">
              <v-btn variant="outlined" block>
                Minhas Cartelas
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

}
</script>

<style>

.custom-btn {
  background-color: #fff; /* Substitua pelo seu próprio esquema de cores */
  color: black; /* Substitua pelo seu próprio esquema de cores */
}

.custom-btn:target{
  background-color: #fff; /* Substitua pelo seu próprio esquema de cores */
  color: black; /* Substitua pelo seu próprio esquema de cores */
}
.custom-btn:hover {
  background-color: transparent;
  border-color: #fff; /* Substitua pelo seu próprio esquema de cores */
  color: black; /* Substitua pelo seu próprio esquema de cores */
}
</style>