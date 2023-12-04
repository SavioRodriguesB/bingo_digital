<template>
  <div>
    <v-card 
      class="text-wrap"
      title="Contatos">
      <v-card-subtitle>
        Entraremos em contato caso necessário por um dos contatos abaixo.
      </v-card-subtitle>
      <v-card-item>
        <v-list class="mx-0 px-0">
          <v-list-item class="py-0 my-0 mx-0 px-0">
            <v-row no-gutters>
              <v-col cols="3" sm="2" class="pt-2 mr-2">
                Tipo
              </v-col>
              <v-divider vertical inset/>
              <v-col cols="5" sm="8" class="pt-2 pl-2">
                Contato
              </v-col>
              <v-divider vertical inset/>
              <v-col class="pt-2 pl-2"  align="start">
                Ações
              </v-col>
              <v-divider />
            </v-row>
          </v-list-item>
          <v-list-item v-for="item in contatosPessoa" :key="item.id_contato" class="py-0 my-0 mx-0 px-0">
            <v-row no-gutters>
              <v-col cols="3" sm="2" class="pt-3 mr-2">
                {{ itensTipoContato.filter(tipo => item.tipo_contato == tipo.tipo_contato)[0].titulo }}
              </v-col>
              <v-divider vertical inset/>
              <v-col cols="5" sm="8" class="pt-3 pl-2">
                {{ item.tipo_contato == 1 ? formatarCelular(item.contato) : item.contato }}
              </v-col>
              <v-divider vertical inset/>
              <v-col class="py-0 my-0"  align="end">
                <v-btn
                  @click="isDialogContatoVisible = true; contato = item; editandoContato = 1"
                  color="blue"
                  icon="mdi-square-edit-outline"
                  variant="text"
                  class="mx-0 px-0"
                ></v-btn>
                <v-btn
                  @click="excluirContato(item)"
                  color="red"
                  icon="mdi-delete"
                  variant="text"
                  class="mx-0 px-0"
                ></v-btn>
              </v-col>
              <v-divider />
            </v-row>
          </v-list-item>
        </v-list>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isDialogContatoVisible = true" variant="outlined">
          Novo Contato
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog max-width="800" persistent v-model="isDialogContatoVisible" z-index="1">
      <v-card class="px-5" :loading="isLoading">
        <v-card-title class="text-center" > Cadastro de Contatos </v-card-title>
        <v-form @submit.prevent="cadastrarContato" v-model="form">
          <v-row>
            <v-col cols="8">
              <v-text-field v-if="itensTipoContato.filter(tipo => contato.tipo_contato == tipo.tipo_contato)[0].tipo_contato == 1"
                variant="outlined"
                v-model="contato.contato"
                v-mask="'(##) # ####-####'"
                :rules="fieldRequiredRule"
                label="Celular" 
                placeholder="Informe o Celular"
              />
              <v-text-field v-if="itensTipoContato.filter(tipo => contato.tipo_contato == tipo.tipo_contato)[0].tipo_contato == 2"
                variant="outlined"
                v-model="contato.contato"
                v-mask="'(##) ####-####'"
                :rules="fieldRequiredRule"
                label="Telefone" 
                placeholder="Informe o Telefone"
              />
              <v-text-field v-if="itensTipoContato.filter(tipo => contato.tipo_contato == tipo.tipo_contato)[0].tipo_contato == 3"
                variant="outlined"
                v-model="contato.contato"
                :rules="emailRules"
                label="E-mail" 
                placeholder="Informe o E-mail"
              />
            </v-col>
            <v-col cols="4">
              <v-select 
                variant="outlined"
                v-model="contato.tipo_contato"
                :items="itensTipoContato" 
                item-title="titulo" 
                item-value="tipo_contato"
              />
            </v-col>
          </v-row>
          <v-card-actions class="pb-5">
            <v-spacer/>
            <v-btn variant="outlined" @click="isDialogContatoVisible = false; editandoContato = 0; buscarContatos()">
                Fechar
            </v-btn>
            <v-btn variant="outlined" type="submit">
                Salvar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import Swal from 'sweetalert2'
  import { ref, onMounted } from 'vue'
  import axios from '@/plugins/axios';

  let form = ref()
  let isDialogContatoVisible = ref(false)
  let isLoading = ref(false)
  let contatosPessoa = ref()
  let editandoContato = ref(0)

  let contato = ref({tipo_contato: 1})
  let itensTipoContato = ref([
    {titulo: "Celular", tipo_contato: 1},
    {titulo: "Telefone", tipo_contato: 2},
    {titulo: "E-mail", tipo_contato: 3}
  ])

  let fieldRequiredRule = [
    value => {
        if (value) return true
        return 'Campo Obrigatório'
      },
  ]

  let emailRules = [
    value => {
      if (value?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) return true
      return 'Informe um Email válido.'
    }
  ]

  const cadastrarContato = async () => {
    if(!form.value){
      return
    }

    try{
      if(editandoContato.value == 0){
        //Cadastrando
        await axios.post("/pessoa/contato",{
          ...contato.value,
          id_pessoa: localStorage.getItem("id_pessoa")
        })
      }else{
        //Atualizando
        await axios.put(`/pessoa/${localStorage.getItem("id_pessoa")}/contato/${contato.value.id_contato}`,{
          contato: contato.value.contato,
          tipo_contato: contato.value.tipo_contato,
        })
      }

      buscarContatos()
      isDialogContatoVisible.value = false
      const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: "success",
          title: `Contato ${editandoContato.value == 1? "atualizado": "salvo"} com sucesso!`
        });
    }catch(error){
      Swal.fire({
        title: error.response.data.mensagem || "Ocorreu um erro inesperado ao excluir contato.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Voltar"
      })
    }
  }

  const excluirContato = async (contato) => {

    Swal.fire({
      title: "Deseja realmente excluir o contato?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Não",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/pessoa/${localStorage.getItem("id_pessoa")}/contato/${contato.id_contato}`)
        .then(() => {
          Swal.fire({
            title: "Deletado!",
            text: "Contato deletado com sucesso!",
            icon: "success"
          });
          buscarContatos()
        }).catch(response => {
          Swal.fire({
            title: response.response.data.mensagem || "Ocorreu um erro inesperado ao excluir contato.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Voltar"
          })
        })
      }
    });
  }

  const formatarCelular = celular =>{
    const apenasDigitos = celular.replace(/\D/g, '');

    if (apenasDigitos.length === 11) {
      const ddd = apenasDigitos.slice(0, 2);
      const parte1 = apenasDigitos.slice(2, 3);
      const parte2 = apenasDigitos.slice(3, 7);
      const parte3 = apenasDigitos.slice(7);

      const numeroFormatado = `(${ddd}) ${parte1} ${parte2}-${parte3}`;
      
      return numeroFormatado;
    } else {
      return celular;
    }
  }

  const buscarContatos = async () => {
    contato.value = {tipo_contato: 1}
    let response = await axios.get(`/pessoa/${localStorage.getItem("id_pessoa")}/contatos`)
    contatosPessoa.value = response.data
  }

  onMounted(async () => {
    await buscarContatos()
  })
</script>