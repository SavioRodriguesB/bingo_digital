<template>
  <v-app-bar :elevation="2" class="px-4" color="#f0f8ff">
    <router-link to="/" style="text-decoration: none; color: inherit;">
      <v-app-bar-title>
        Bingo Online - Sua associação filantrópica
      </v-app-bar-title>
    </router-link>
    <template v-slot:append>
      <div v-if="usuarioLogado == 0">
        <v-btn variant="outlined" class="mr-2 hidden-xs" :to="{name:'Login'}">
          Login
        </v-btn>
        <v-btn variant="outlined" class="hidden-xs" :to="{name:'Registrar'}">
          Registre-se
        </v-btn>
        <div class="d-block d-sm-none">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                variant="plain"
                icon="mdi mdi-dots-vertical"
                v-bind="props"
              >
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="{name:'Login'}">
                <v-list-item-title class="font-weight-semibold">Login</v-list-item-title>
              </v-list-item>
              <v-list-item :to="{name:'Registrar'}">
                <v-list-item-title class="font-weight-semibold">Registre-se</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div v-else-if="usuarioLogado == 1" class="mr-3">
        <perfil-usuario/>
      </div>
    </template>
    
  </v-app-bar>
</template>

<script setup>
  import PerfilUsuario from '@/components/PerfilUsuario.vue' 
  import { ref, onMounted } from 'vue'

  let usuarioLogado = ref(localStorage.getItem('token_jwt')? 1 : 0)

  onMounted(async () => {
      window.addEventListener('storage', (event) => {
        if (Object.keys(event.currentTarget.localStorage).includes('token_jwt')) {
          usuarioLogado.value = 1;
        }else{
          usuarioLogado.value = 0;
        }
      });
  });
</script>