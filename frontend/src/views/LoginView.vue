<template>
  <v-container>
    <header-component/>
    <v-card  justify="center" align="center">
      <v-card-title class="text-center text-wrap"> Faça o login para concorrer a milhares de prêmios! </v-card-title>

      <v-row>
        <v-col cols="12" sm="6" offset-sm="3">
          <v-card variant="outlined" class="text-center py-4 px-8 mb-6 mx-2">
            <v-form v-model="form"
            @submit.prevent="enviarLogin">
            
              <v-text-field 
                variant="outlined"
                v-model="email"
                label="E-mail" 
                placeholder="Informe seu e-mail"
                :rules="emailRules"
                type="email"
              /> 
              <v-text-field 
                variant="outlined"
                v-model="senha"
                placeholder="Informe sua senha"
                type="password"
                label="Senha"
              />
              
              <v-btn type="submit" block class="mb-2">
                Logar
              </v-btn>
              <router-link to="registrar" style="text-decoration: none; color: inherit;" >
                <small>Clique aqui para registrar-se</small>
              </router-link>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import axios from '@/plugins/axios'
  import router from '@/router';
  import Swal from 'sweetalert2'
  import { onMounted, ref } from 'vue';

  let form = ref()
  let email = ref()
  let senha = ref()

  let emailRules = [
    value => {
      var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (value?.match(mailformat)) return true
      return 'Informe um Email válido.'
    },
  ]

  const enviarLogin = async () => {
    if(!form.value){
      return
    }
    try {
      let response = await axios.post("/usuario/login",{
        email: email.value,
        senha: senha.value
      })
      localStorage.setItem('token_jwt', response.data.token)
      localStorage.setItem('id_pessoa', response.data.id_pessoa)
      window.dispatchEvent(new Event('storage'));
      router.push({name:'Home'})
    } catch (error) {
      if(error.response.status == 404){
        Swal.fire({
          icon: "error",
          title: "Falha ao realizar Login",
          text: "E-mail e/ou senha inválidos",
        });
        return
      }
      Swal.fire({
        icon: "error",
        title: "Falha ao realizar Login",
        text: "Tente novamente mais tarde",
      });
    }
  }

  /*const redefinirSenha = async () => {
    try {
      let response = await axios.post("/usuario/redefinir-senha",{
      email: email.value,
      senha: senha.value
    })
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }*/

  onMounted(() =>{
    localStorage.removeItem('token_jwt')
    localStorage.removeItem('id_pessoa')
  })
</script>

<style>

</style>