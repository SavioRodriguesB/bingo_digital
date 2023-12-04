<template>
  <VAvatar
    class="cursor-pointer"
    color="primary"
    variant="tonal"
    id="avatar"
  >
    <VImg :src="avatar1" />

    <VMenu
      activator="parent"
      width="230"
      location="bottom end"
      offset="14px"
    >
      <VList>
        <VListItem>
          <template #prepend>
            <VListItemAction start>
              <VAvatar
                color="primary"
                variant="tonal"
              >
                <VImg :src="avatar1" />
              </VAvatar>
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            Sávio Rodrigues
          </VListItemTitle>
          <VListItemSubtitle v-if="administrador">Administrador</VListItemSubtitle>
        </VListItem>

        <VDivider class="my-2" />

        <VListItem :to="{name: 'CadastroSorteio'}" v-if="administrador">
          <VListItemTitle>Criar Sorteios</VListItemTitle>
        </VListItem>

        <VListItem :to="{name: 'SorteiosPessoa', params: {pessoa}}">
          <VListItemTitle>Minhas Cartelas</VListItemTitle>
        </VListItem>

        <VListItem :to="{name: 'Perfil'}">
          <VListItemTitle>Perfil</VListItemTitle>
        </VListItem>

        <VListItem link>
          <VListItemTitle>Jogos</VListItemTitle>
        </VListItem>

        <VListItem link>
          <VListItemTitle>Suporte</VListItemTitle>
        </VListItem>

        <VDivider class="my-2" />

        <VListItem @click="sair()">
          <VListItemTitle>Logout</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
  </VAvatar>
</template>

<script setup>
  import avatar1 from '@/assets/avatars/avatar-1.png'
  import router from '@/router'
  import { ref, onMounted } from 'vue'
  import axios from '@/plugins/axios';

  let administrador = ref(false)
  let pessoa = ref()

  const sair = () => {
    localStorage.removeItem('token_jwt')
    localStorage.removeItem('id_usuario')
    localStorage.removeItem('roles')
    window.dispatchEvent(new Event('storage'));
    router.push({name:'Home'})
  }

  onMounted(async () => {
    let response = await axios.get(`/usuario/${localStorage.getItem('id_pessoa')}/roles`)
    administrador.value = response.data.roles.includes('ADMIN') ? true : false
    pessoa.value = localStorage.getItem('id_pessoa')
    localStorage.setItem('roles', '[' + response.data.roles +']')
  })
</script>

<style scoped>
  #avatar{
    cursor: pointer;
  }
</style>