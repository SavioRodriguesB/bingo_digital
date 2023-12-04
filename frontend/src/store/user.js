// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  let logado = ref(0)
  const usuario = ref({})

  function logarUsuario() {
    logado.value = 1
  }

  return {
    logado,
    usuario,
    logarUsuario
  }
})
