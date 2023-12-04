<template>
  <div>
    <v-card 
      class="text-wrap"
      title="Endereços">
      <v-card-subtitle>
        Não deixe de cadastar um endereço para ter a chance de receber prêmios incríveis!
      </v-card-subtitle>
      <v-card-item>
        <v-list class="mx-0 px-0" v-if="enderecosPessoa">
          <v-list-item class="py-0 my-0 mx-0 px-0">
            <v-row no-gutters>
              <v-col cols="3" class="pt-2 mr-2">
                Cidade
              </v-col>
              <v-divider vertical inset/>
              <v-col cols="5" sm="3"  class="pt-2 pl-2">
                Bairro
              </v-col>
              <v-divider vertical inset/>
              <v-col cols="4" class="pt-2 pl-2 hidden-xs">
                Logradouro
              </v-col>
              <v-divider vertical inset/>
              <v-col class="pt-2 pl-2"  align="start">
                Ações
              </v-col>
              <v-divider />
            </v-row>
          </v-list-item>
          <v-list-item v-for="item in enderecosPessoa" :key="item.id_contato" class="py-0 my-0 mx-0 px-0">
            <v-row no-gutters>
              <v-col cols="3" class="pt-3 mr-2">
                {{ item.cidade }}
              </v-col>
              <v-divider vertical inset/>
              <v-col cols="5" sm="3" class="pt-3 pl-2">
                {{ item.bairro }}
              </v-col>
              <v-divider vertical inset/>
              <v-col cols="4" class="pt-3 pl-2 hidden-xs">
                {{ item.logradouro }}
              </v-col>
              <v-divider vertical inset/>
              <v-col class="py-0 my-0"  align="end">
                <v-btn
                  @click="isDialogEnderecoVisible = true; endereco = item; editandoEndereco = 1"
                  color="blue"
                  icon="mdi-square-edit-outline"
                  variant="text"
                ></v-btn>
                <v-btn
                  @click="excluirEndereco(item)"
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
          Não perca tempo e cadastre agora um endereço para conseguirmos entregar seus prêmios!
        </v-card-text>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isDialogEnderecoVisible = true; editandoEndereco = 0" variant="outlined">
          Novo Endereço
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog max-width="800" persistent v-model="isDialogEnderecoVisible" z-index="1">
      <v-card class="px-5" :loading="isLoading">
        <v-card-title class="text-center" > Cadastro de Endereços </v-card-title>
        <v-form @submit.prevent="cadastrarEndereco" v-model="form">
          <v-row>
            <v-col cols="6" sm="4">
              <v-text-field
                hint="Informe o CPF para habilitar a edição dos campos abaixo"
                variant="outlined"
                v-model="endereco.cep"
                v-mask="'#####-###'"
                :rules="fieldRequiredRule"
                label="CEP" 
                placeholder="Informe o CEP"
              />
            </v-col>
            <v-col cols="6" sm="4">
              <v-text-field
                variant="outlined"
                v-mask="'AA'"
                v-model="endereco.uf"
                :rules="fieldRequiredRule"
                label="UF" 
                placeholder="Informe a UF"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-checkbox
                variant="outlined"
                v-model="endereco.endereco_entrega"
                label="É o endereço de entrega?" 
                value="1"
              />
            </v-col>
          </v-row>
            <v-row>
              <v-col sm="10" cols="12">
                <v-text-field
                  variant="outlined"
                  v-model="endereco.logradouro"
                  :rules="fieldRequiredRule"
                  label="Logradouro" 
                  :readonly="endereco.cep?.length != 9"
                  placeholder="Informe o logradouro"
                />
              </v-col>
              <v-col sm="2" cols="12">
                <v-text-field
                variant="outlined"
                v-model="endereco.numero"
                :rules="fieldRequiredRule"
                label="Número" 
                :readonly="endereco.cep?.length != 9"
                placeholder="Informe o número"
              />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  v-model="endereco.bairro"
                  :rules="fieldRequiredRule"
                  label="Bairro" 
                  :readonly="endereco.cep?.length != 9"
                  placeholder="Informe o bairro"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  v-model="endereco.cidade"
                  :rules="fieldRequiredRule"
                  label="Cidade" 
                  :readonly="endereco.cep?.length != 9"
                  placeholder="Informe a cidade"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  v-model="endereco.complemento"
                  label="Complemento" 
                  :readonly="endereco.cep?.length != 9"
                  placeholder="Informe o complemento"
                />
              </v-col>
            </v-row>
              
          <v-card-actions class="pb-5">
            <v-spacer/>
            <v-btn variant="outlined" @click="isDialogEnderecoVisible = false; endereco = {cep: '', endereco_entrega: 0}; buscarEnderecos()">
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
  import customAxios from '@/plugins/axiosCustom';
  import { watch } from 'vue';

  let form = ref()
  let isDialogEnderecoVisible = ref(false)
  let isLoading = ref(false)
  let enderecosPessoa = ref()
  let editandoEndereco = ref(0)

  let endereco = ref(
    {
      cep: "",
      endereco_entrega: 0
    }
  )

  let fieldRequiredRule = [
    value => {
        if (value) return true
        return 'Campo Obrigatório'
      },
  ]

  const cadastrarEndereco = async () => {
    if(!form.value){
      return
    }
    try{
      if(editandoEndereco.value == 0){
        //Cadastrando
        await axios.post("/pessoa/endereco",{
          ...endereco.value,
          id_pessoa: localStorage.getItem("id_pessoa")
        })
      }else{
        //Atualizando
        await axios.put(`/pessoa/${localStorage.getItem("id_pessoa")}/endereco/${endereco.value.id_endereco}`,{
          ...endereco.value
        })
      }
      endereco.value = {cep: '', endereco_entrega: 0}
      buscarEnderecos()
      isDialogEnderecoVisible.value = false

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
          title: `Endereco ${editandoEndereco.value == 1? "atualizado": "salvo"} com sucesso!`
        });
    }catch(error){
      Swal.fire({
        title: error.response.data.mensagem || `Ocorreu um erro inesperado ao ${editandoEndereco.value == 1? "atualizar": "cadastrar"} endereço.`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Voltar"
      })
    }
  }

  const excluirEndereco = async (endereco) => {

    Swal.fire({
      title: "Deseja realmente excluir o endereco?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Não",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/pessoa/${localStorage.getItem("id_pessoa")}/endereco/${endereco.id_endereco}`)
        .then(() => {
          Swal.fire({
            title: "Deletado!",
            text: "Endereco deletado com sucesso!",
            icon: "success"
          });
          buscarEnderecos()
        }).catch(response => {
          Swal.fire({
            title: response.response.data.mensagem || "Ocorreu um erro inesperado ao excluir endereço.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Voltar"
          })
        })
      }
    });
  }

  const buscarEnderecos = async () => {
    try{
      let response = await axios.get(`/pessoa/${localStorage.getItem("id_pessoa")}/enderecos`)
      enderecosPessoa.value = response.data
    }catch(error){
      //
    }
  }

  watch(endereco.value, async (end) => {
    if(end.cep.length === 9 && !end.logradouro){
      let response = await customAxios.get(`https://viacep.com.br/ws/${end.cep.replace('-','')}/json/`)

      endereco.value.uf = response.data.uf
      endereco.value.logradouro = response.data.logradouro
      endereco.value.complemento = response.data.complemento
      endereco.value.bairro = response.data.bairro
      endereco.value.cidade = response.data.localidade
      endereco.value.ibge = response.data.ibge
    }
  })

  onMounted(async () => {
    await buscarEnderecos()
  })
</script>