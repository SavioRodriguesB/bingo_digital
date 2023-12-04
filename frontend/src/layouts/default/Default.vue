<template>
  <v-app>
    <default-bar />

    <default-view />
    <footer-view/>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import FooterView from './Footer.vue'
</script>

<style scoped>
  *{
    background-color: aliceblue;
  }
</style>
