<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <VImg
            :src="avatar1"
            min-height="125"
            max-height="250"
            cover
          />

          <v-card-text class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
            <v-row>
              <v-col offset="4" cols="12" offset-sm="0" sm="2" class="mb-0 pb-0" style>
                <v-avatar
                rounded
                size="120"
                :image="avatar1"
                class="user-profile-avatar mx-auto"
              />
              </v-col>
              <v-col class="mt-0" align="start">
                <h2>
                  Sávio Rodrigues
                </h2>
              </v-col>
              <v-col>
                <span class="d-flex flex-row-reverse">
                  Data de Cadastro<br>
                  05/11/2023
                </span>
              </v-col>
              <v-col class="py-0 my-0" cols="12"  align="end">
                <v-btn
                  @click="isDialogPessoaVisible = true;"
                  color="blue"
                  icon="mdi-square-edit-outline"
                  variant="text"
                ></v-btn>
                <v-btn
                  @click="excluirPessoa(item)"
                  color="red"
                  icon="mdi-delete"
                  variant="text"
                ></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="12">
            <cadastro-contato 
            />
          </v-col>
          <v-col cols="12">
            <cadastro-endereco/>
          </v-col>
          <v-col cols="12">
            <cadastro-chaves-pix/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
//import { ref } from 'vue';
import avatar1 from '@/assets/avatars/avatar-1.png'
import CadastroContato from '@/components/CadastroContato.vue';
import CadastroEndereco from '@/components/CadastroEndereco.vue';
import CadastroChavesPix from '@/components/CadastroChavePix.vue';
import { onBeforeMount } from 'vue'
import axios from '@/plugins/axios';

onBeforeMount( async () => {
    await axios.get("/usuario/validar-token")
})

</script>

<style lang="scss">
.user-profile-avatar {
  border: 5px solid rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-surface)) !important;
  inset-block-start: -3rem;

  .v-img__img {
    border-radius: 0.125rem;
  }
}


</style>