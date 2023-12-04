<template>
  <div v-on="selecionavel ? { click : $emit('numeroSelecionado')} : {} ">
    <div v-if="numeros">
      <numero v-for="i in ordenarNumeros(numeros)" :key="i" class="mr-1 mt-1"
        :numero="i"
        :fixado="validarStatusNumero(i)"
      />
    </div>
    <div>
      <numero v-for="i in numeroMaximo" :key="i" class="mr-1 mt-1"
        :numero="i"
        :fixado="validarStatusNumero(i)"
      />
    </div>
  </div>
</template>

<script setup>
    import Numero from "@/components/chips/NumeroCartela.vue"

    const props = defineProps({
      numeroMaximo: Number,
      numeros: Array,
      numerosFixados: Array
    })

    const validarStatusNumero = (numero) =>{
      if(props.numerosFixados){
        if(props.numerosFixados.indexOf(numero) >= 0 ){
          return true
        }
      }
      return false
    }

    const ordenarNumeros = (numeros) => {
      return numeros.sort((a,b) => {return a-b})
    }
</script>
    
<style>

</style>