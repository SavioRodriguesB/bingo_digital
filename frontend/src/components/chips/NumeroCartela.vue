<template>
  <v-chip variant="flat" :color="selecionado? 'green': fixado? 'blue': ''">
    {{ numero < 10 ? '0'+ numero : numero}}
  </v-chip>
</template>

<script setup>

defineProps  ({
  numero: Number,
  selecionado: Boolean,
  fixado: Boolean
})

</script>

<style>

</style>