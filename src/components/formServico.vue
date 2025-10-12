<template>
   <div class="q-pa-md" style="min-width: 325px; max-width: 768px;">

    <q-form
      @save="onSave"
      @cancel="onCancel"
      class="q-gutter-md"
    >
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
        v-model="itensRecebidos"
        label="Itens Recebidos"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />
      <q-input
        filled
        v-model="descricaoDoServico"
        label="Descrição do Serviço"
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
        v-model="statusServico"
        label="Status do Serviço"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />

      <div class="text-center">
        <q-btn label="Salvar" type="save" color="primary"/>
        <q-btn label="Cancelar" type="cancel" color="primary" flat class="q-ml-sm" />
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
const descricaoDoServico = ref(null)
const itensRecebidos = ref(null)
const dataEntrega = ref(null)
const totalFinal = ref(null)
const formaPagamento = ref(null)
const statusPagamento = ref(null)
const statusServico = ref(null)

const onSave = () => {
  
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    });
  }

const onCancel = () => {
  name.value = null
  cpf.value = null
  telefone.value = null
  descricaoDoServico.value = null
  itensRecebidos.value = null
  dataEntrega.value = null
  totalFinal.value = null
  formaPagamento.value = null
  statusPagamento.value = null
  statusServico.value = null
}


</script>