<template>
  <v-card variant="outlined" class="px-5 mt-2">
    <v-card-title class="pt-3">
      <v-row align-content="space-around">
        <v-col  cols="12" sm="10">
          <v-text-field
            variant="outlined"
            placeholder="Informe a premiação do jogo"
            label="Premiação do jogo"
            v-model="jogo.premiacao"
            :rules="fieldRequiredRule"
          />
        </v-col>
        <v-col>
          <v-checkbox label="Jogo Principal?" v-model="jogo.principal"></v-checkbox>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-item>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              label="Número Máximo"
              v-mask="'####'"
              v-model="jogo.numeros_total"
              :rules="fieldRequiredRule"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-row>
              <v-col>
                <v-text-field
                  variant="outlined"
                  label="Quantidade de números na cartela"
                  placeholder="Informe quantos números terá cada cartela"
                  v-mask="'###'"
                  v-model="jogo.numeros_cartela"
                  :rules="fieldRequiredRule"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { watch, ref } from "vue"

const jogo = ref({premiacao: "", numeros_total:"", numeros_cartela:"", jogo_principal:false})
const emit = defineEmits(['modificado'])

const props = defineProps(['index'])

let fieldRequiredRule = [
    value => {
        if (value) return true
        return 'Campo Obrigatório'
      },
  ]

watch(jogo.value, (jogo) => {
  emit('modificado', {jogo, index: props.index})
})
</script>

<style>

</style>