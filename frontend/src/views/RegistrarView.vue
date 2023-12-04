<template>
  <v-container>
    <header-component/>
    <v-card  justify="center" align="center">
      <v-card-title class="text-center text-wrap"> Faça o registro para concorrer a milhares de prêmios! </v-card-title>

      <v-row>
        <v-col cols="12" sm="6" offset-sm="3">
          <v-card variant="outlined" class="text-center py-4 px-8 mb-6 mx-2">
            <v-form v-model="form"
            @submit.prevent="enviarRegistro">

              <v-text-field 
                clearable
                v-model="formValues.nome"
                :rules="fieldRequiredRule"
                label="Nome" 
                placeholder="Informe seu nome"
                type="text"
              /> 

              <v-text-field 
                clearable
                v-model="formValues.sobrenome"
                label="Sobrenome" 
                placeholder="Informe seu sobrenome"
                type="text"
              /> 

              <v-text-field
                clearable
                v-model="formValues.data_nascimento"
                :rules="[...fieldRequiredRule, ...dataNascimentoRules]"
                label="Data de Nascimento" 
                placeholder="Informe sua data de nascimento"
                v-mask="'##/##/####'"
              />

              <v-text-field 
                clearable
                v-model="formValues.celular"
                :rules="fieldRequiredRule"
                label="Celular" 
                placeholder="Informe seu celular"
                v-mask="'(##) # ####-####'"
                type="text"
              />

              <v-text-field 
                clearable
                v-model="formValues.email"
                :rules="emailRules"
                label="E-Mail" 
                placeholder="Informe seu e-mail"
                type="email"
              /> 

              <v-text-field 
                clearable
                v-model="formValues.emailValidacao"
                :rules="[...emailRules, ...emailCoincideRules,]"
                label="Confirme o E-Mail" 
                placeholder="Confirme seu e-mail"
                type="email"
              /> 
              <v-text-field 
                clearable
                v-model="formValues.senha"
                :rules="passwordRules"
                label="Senha"
                placeholder="Informe sua senha"
                type="password"
              />
              <v-text-field 
                clearable
                v-model="formValues.senhaValidacao"
                :rules="[...passwordRules, ...passwordCoincideRules]"
                label="Confirme sua senha"
                placeholder="Confirme sua senha"
                type="password"
              />

              <v-btn type="submit" block class="mb-2">
                Registrar
              </v-btn>
              <router-link to="login" style="text-decoration: none; color: inherit;" >
                <small>Clique aqui para fazer o login</small>
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
  import { ref } from 'vue';

  var form = ref()
  var formValues = ref({
    nome: "",
    sobrenome: "",
    data_nascimento: "",
    email: "",
    emailValidacao: "",
    senha: "",
    senhaValidacao: ""
  })

  let fieldRequiredRule = [
    value => {
        if (value) return true
        return 'Campo Obrigatório'
      },
  ]

  let dataNascimentoRules = [
    value => {
      const regex = /^(?:(?:31([/\-.])(?:0?[13578]|1[02])\1|(?:(?:29|30)([/\-.])(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29([/\-.])0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])([/\-.])(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$)$/;

      if (value?.match(regex)) return true;
      return 'Data de nascimento inválida';
    }
  ]

  let emailRules = [
    value => {
      if (value?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) return true
      return 'Informe um Email válido.'
    }
  ]

  let emailCoincideRules = [
    value => {
      if (formValues.value.email === value) return true
      return 'Emails digitados não são iguais'
    },
  ]

  let passwordRules = [
    () => {
      if (formValues.value.senha.length >= 6) return true
      return 'A senha precisa conter pelo menos 6 caractéres'
    },
  ]

  let passwordCoincideRules = [
    value => {
      if (formValues.value.senha === value) return true
      return 'Senhas digitadas não são iguais'
    },
  ]

  const enviarRegistro = async () => {
    if(!form.value){
      return
    }

    try {
      let response = await axios.post("/usuario/",{
        email: formValues.value.email,
        senha: formValues.value.senha,
        pessoa:{
          nome: formValues.value.nome,
          sobrenome: formValues.value.sobrenome,
          data_nascimento: formValues.value.data_nascimento,
          contatos:[
            {
              tipo_contato: 1,
              contato: formValues.value.celular,
            },
            {
              tipo_contato: 3,
              contato: formValues.value.email,
            }
          ]
        }
      })
      localStorage.setItem('token_jwt', response.data.token)
      localStorage.setItem('id_pessoa', response.data.id_pessoa)
      Swal.fire({
        title: "Registro confirmado com sucesso!",
        text: "Não deixe de acessar a página de perfil para continuar o cadastro.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({name:"Home"})
        }
      });

    } catch (error) {

      if(error.response.status == 406){
        Swal.fire({
        icon: "info",
        title: "E-mail já cadastrado",
        text: "Faça o login ou redefina a senha",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({name:"Login"})
        }
      })
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro ao realizar Cadastro. Por favor tente novamente mais tarde",
        });
      }
    }
  }
</script>

<style>

</style>