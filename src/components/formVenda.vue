<template>
   <div class="q-pa-xs" style="min-width: 325px; max-width: 768px;">

    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Nome Completo"
        hint="Nome do cliente"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="cpf"
        label="CPF"
        hint="CPF do cliente"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />
      <q-input
        filled
        type="number"
        v-model="telefone"
        label="Telefone"
        hint="Telefone do cliente"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />
      <q-input
        filled
        v-model="descricaoDaVenda"
        label="Descrição da Venda"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />
      <q-input
        filled
        v-model="dataEntrega"
        label="Data de Entrega"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />
      <q-input
        filled
        v-model="totalFinal"
        label="Total Final"
        hint="Já com descontos e abatimentos"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />
      <q-input
        filled
        v-model="formaPagamento"
        label="Forma de Pagamento"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />
      <q-input
        filled
        v-model="statusPagamento"
        label="Status de Pagamento"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />
      <q-input
        filled
        v-model="statusVenda"
        label="Status da Venda"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />

      <div class="text-center">
        <q-btn label="Cancelar" @click="onCancel" color="secondary" flat class="q-ml-sm" to="/" />
        <q-btn label="Salvar" @click="onSave" color="secondary" to="/encomendas" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()

const name = ref(null)
const cpf = ref(null)
const telefone = ref(null)
const descricaoDaVenda = ref(null)
const dataEntrega = ref(null)
const totalFinal = ref(null)
const formaPagamento = ref(null)
const statusPagamento = ref(null)
const statusVenda = ref(null)

function onSave(){
  console.log('Salvo')
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Venda Salva'
    });
}

function onCancel() { 
  name.value = null
  cpf.value = null
  telefone.value = null
  descricaoDaVenda.value = null
  dataEntrega.value = null
  totalFinal.value = null
  formaPagamento.value = null
  statusPagamento.value = null
  statusVenda.value = null

  $q.notify({
    color: 'negative',
    textColor: 'white',
    icon: 'close',
    message: 'Venda Cancelada'
  })
}


</script>