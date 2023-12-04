<template>
  <div>
    <v-card 
      class="text-wrap"
      title="Chaves PIX">
      <v-card-subtitle>
        Utilizamos as chaves PIX para enviar prêmios em dinheiro.
      </v-card-subtitle>
      <v-card-item>
        <v-list class="mx-0 px-0" v-if="chavesPessoa">
          <v-list-item class="py-0 my-0 mx-0 px-0">
            <v-row no-gutters>
              <v-col cols="3" sm="2" class="pt-2 mr-2">
                Tipo
              </v-col>
              <v-divider vertical inset/>
              <v-col cols="5" sm="8" class="pt-2 pl-2">
                Chave
              </v-col>
              <v-divider vertical inset/>
              <v-col class="pt-2 pl-2" align="start">
                Ações
              </v-col>
              <v-divider />
            </v-row>
          </v-list-item>
          <v-list-item v-for="item in chavesPessoa" :key="item.chave" class="py-0 my-0 mx-0 px-0">
            <v-row no-gutters>
              <v-col cols="3" sm="2" class="pt-3 mr-2">
                {{ itensTipoChave.filter(tipo => item.tipo_chave == tipo.tipo_chave)[0].titulo }}
              </v-col>
              <v-divider vertical inset/>
              <v-col cols="5" sm="8" class="pt-3 pl-2">
                {{ item.chave }}
              </v-col>
              <v-divider vertical inset/>
              <v-col class="py-0 my-0" align="end">
                <v-btn
                  @click="isDialogChaveVisible = true; chave = item; editandoChave = 1"
                  color="blue"
                  icon="mdi-square-edit-outline"
                  variant="text"
                ></v-btn>
                <v-btn
                  @click="excluirChave(item)"
                  color="red"
                  icon="mdi-delete"
                  variant="text"
                ></v-btn>
              </v-col>
              <v-divider />
            </v-row>
          </v-list-item>
        </v-list>
        <v-card-text v-else>
          Não perca tempo e cadastre agora uma chave pix para conseguirmos entregar seus prêmios!
        </v-card-text>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isDialogChaveVisible = true; editandoChave = 0" variant="outlined">
          Nova Chave Pix
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog max-width="800" persistent v-model="isDialogChaveVisible" z-index="1">
      <v-card class="px-5" :loading="isLoading">
        <v-card-title class="text-center" > Cadastro de Chaves Pix </v-card-title>
        <v-form @submit.prevent="cadastrarChave" v-model="form">
          <v-row>
            <v-col cols="8">
              <v-text-field v-if="itensTipoChave.filter(tipo => chave.tipo_chave == tipo.tipo_chave)[0].tipo_chave == 1"
                variant="outlined"
                v-model="chave.chave"
                v-mask="'###.###.###-##'"
                :rules="fieldRequiredRule"
                label="CPF" 
                placeholder="Informe o CPF"
              />
              <v-text-field v-if="itensTipoChave.filter(tipo => chave.tipo_chave == tipo.tipo_chave)[0].tipo_chave == 2"
                variant="outlined"
                v-model="chave.chave"
                v-mask="'##.###.###/#####-##'"
                :rules="fieldRequiredRule"
                label="CNPJ" 
                placeholder="Informe o CNPJ"
              />
              <v-text-field v-if="itensTipoChave.filter(tipo => chave.tipo_chave == tipo.tipo_chave)[0].tipo_chave == 3"
                variant="outlined"
                v-model="chave.chave"
                :rules="emailRules"
                label="E-mail" 
                placeholder="Informe o E-mail"
              />
              <v-text-field v-if="itensTipoChave.filter(tipo => chave.tipo_chave == tipo.tipo_chave)[0].tipo_chave == 4"
                variant="outlined"
                v-model="chave.chave"
                v-mask="'(##) # ####-####'"
                :rules="fieldRequiredRule"
                label="Celular" 
                placeholder="Informe o Celular"
              />
              <v-text-field v-if="itensTipoChave.filter(tipo => chave.tipo_chave == tipo.tipo_chave)[0].tipo_chave == 5"
                variant="outlined"
                v-model="chave.chave"
                :rules="fieldRequiredRule"
                label="Chave Aleatória" 
                placeholder="Informe a chave aleatória"
              />
            </v-col>
            <v-col cols="4">
              <v-select 
                variant="outlined"
                v-model="chave.tipo_chave"
                :items="itensTipoChave" 
                item-title="titulo" 
                item-value="tipo_chave"
              />
            </v-col>
          </v-row>
          <v-card-actions class="pb-5">
            <v-spacer/>
            <v-btn variant="outlined" @click="isDialogChaveVisible = false; chave = {tipo_chave: 1}; buscarChaves()">
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
  let isDialogChaveVisible = ref(false)
  let isLoading = ref(false)
  let chavesPessoa = ref()
  let editandoChave = ref(0)

  let chave = ref({tipo_chave: 1})

  let itensTipoChave = ref([
    {titulo: "CPF", tipo_chave: 1},
    {titulo: "CNPJ", tipo_chave: 2},
    {titulo: "E-mail", tipo_chave: 3},
    {titulo: "Celular", tipo_chave: 4},
    {titulo: "Chave Aleatória", tipo_chave: 5}
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

  const cadastrarChave = async () => {
    if(!form.value){
      return
    }
 
    try{
      if(editandoChave.value == 0){
        //Cadastrando
        await axios.post("/pessoa/chave",{
          ...chave.value,
          id_pessoa: localStorage.getItem("id_pessoa")
        })
      }else{
        //Atualizando
        await axios.put(`/pessoa/${localStorage.getItem("id_pessoa")}/chave/${chave.value.id_endereco}`,{
          ...chave.value
        })
      }
      chave.value = {tipo_chave: 1}
      buscarChaves()
      isDialogChaveVisible.value = false

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
          title: `Chave ${editandoChave.value == 1? "atualizada": "salva"} com sucesso!`
        });
    }catch(error){
      Swal.fire({
        title: error.response.data.mensagem || `Ocorreu um erro inesperado ao ${editandoChave.value == 1? "atualizar": "cadastrar"} chave.`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Voltar"
      })
    }
  }

  const excluirChave = async (chave) => {

    Swal.fire({
      title: "Deseja realmente excluir a chave?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Não",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/pessoa/${localStorage.getItem("id_pessoa")}/chave/${chave.id_endereco}`)
        .then(() => {
          Swal.fire({
            title: "Deletado!",
            text: "Chave deletada com sucesso!",
            icon: "success"
          });
          buscarChaves()
        }).catch(response => {
          Swal.fire({
            title: response.response.data.mensagem || "Ocorreu um erro inesperado ao excluir chave.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Voltar"
          })
        })
      }
    });
  }

  const buscarChaves = async () => {
    try{
      let response = await axios.get(`/pessoa/${localStorage.getItem("id_pessoa")}/chaves`)
      chavesPessoa.value = response.data
    }catch(error){
      //
    }
  }

  onMounted(async () => {
    await buscarChaves()
  })
</script>