<template>
  <v-container>
    <v-form v-model="form"
            @submit.prevent="gravarJogo">
      <v-row>
        <v-col cols="12" sm="12">
          <v-card>
            <VImg
              :src="avatar1"
              min-height="125"
              max-height="250"
              cover
            />

            <v-card-title class="mt-3">
              <v-row>
                <v-col cols="12" sm="9">
                  <v-text-field
                    variant="outlined"
                    placeholder="Informe o título do sorteio"
                    label="Título"
                    v-model="sorteio.titulo"
                    :rules="fieldRequiredRule"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    variant="outlined"
                    placeholder="Informe a data do sorteio"
                    label="Data do Sorteio"
                    v-mask="'##/##/#### às ##:##'"
                    v-model="sorteio.data_sorteio"
                    :rules="fieldRequiredRule"
                  />
                </v-col>
              </v-row>
              <VDivider/>
              <v-row class="mt-3">
                <v-col cols="12" sm="6">
                  <v-text-field
                    variant="outlined"
                    placeholder="Informe o valor de cada jogo"
                    v-mask="'##,##'"
                    label="Valor do Jogo"
                    v-model="sorteio.valor"
                    :rules="fieldRequiredRule"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    variant="outlined"
                    placeholder="Informe o limite que cada pessoa poderá comprar"
                    label="Limite de Cartelas por Pessoa"
                    type="number"
                    v-model="sorteio.limite_jogo_pessoa"
                    :rules="fieldRequiredRule"
                  />
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-item v-for="(jogo, index) of sorteio.jogos" :key="index">
              <cadastro-jogo :index=index @modificado="atualizarJogo"></cadastro-jogo>
            </v-card-item>
            <v-card-actions>
              <v-spacer/>
              <v-btn variant="outlined" @click="sorteio.jogos.pop()">
                REMOVER JOGO
              </v-btn>
              <v-btn variant="outlined" @click="sorteio.jogos.push({})">
                ADICIONAR JOGO
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-spacer/>
              <v-btn variant="outlined" type="submit">
                GRAVAR SORTEIO
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
  import avatar1 from '@/assets/avatars/avatar-1.png'
  import CadastroJogo from '@/components/CadastroJogo.vue'
  import { ref } from 'vue'
  import Swal from 'sweetalert2'
  import { VDivider } from 'vuetify/lib/components/index.mjs';
  import axios from '@/plugins/axios'
  import router from '@/router';

  let sorteio = ref({
    data_sorteio: "",
    titulo: "",
    valor: "",
    limite_jogo_pessoa: "",
    jogos:[{}]
  })

  let form = ref(false)

  let fieldRequiredRule = [
    value => {
        if (value) return true
        return 'Campo Obrigatório'
      },
  ]

  const gravarJogo = async () => {
    if(!form.value){
      return
    }

    if(sorteio.value.jogos.filter(jogo => jogo.principal).length != 1){
      Swal.fire({
        icon: "error",
        title: "Falha no cadastro do sorteio",
        text: "Selecione um jogo principal para o sorteio",
      });
      return
    }

    sorteio.value.data_sorteio = sorteio.value.data_sorteio.replace(' às ', ' ')

    try {
      await axios.post('/sorteio/',{
        ...sorteio.value
      })

      Swal.fire({
        icon: "success",
        title: "Sorteio cadastrado com sucesso!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({name:"Home"})
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Falha no cadastro do sorteio",
        text: error.response.data.mensagem,
      });
    }
  }

  const atualizarJogo = (novoJogo) => {
    sorteio.value.jogos[novoJogo.index] = novoJogo.jogo
  }
</script>

<style>

</style>