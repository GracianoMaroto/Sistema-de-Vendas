<template>
  <div class="q-pa-xs" style="min-width: 325px; max-width: 768px">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="formVendas.nome"
        label="Nome Completo"
        hint="Nome do cliente"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="text"
        v-model="formVendas.CPF"
        label="CPF"
        mask="###.###.###-##"
        hint="CPF do cliente"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        type="text"
        v-model="formVendas.telefone"
        label="Telefone"
        mask="(##) #####-####"
        hint="Telefone do cliente"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formVendas.descricaoVenda"
        label="Descrição da Venda"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formVendas.dataEntrega"
        label="Data de Entrega"
        mask="##/##/####"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formVendas.totalFinal"
        label="Total Final"
        mask="##.###,##"
        reverse-fill-mask
        hint="Já com descontos e abatimentos"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formVendas.formaPagamento"
        label="Forma de Pagamento"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formVendas.statusPagamento"
        label="Status de Pagamento"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formVendas.statusVenda"
        label="Status da Venda"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />

      <div class="text-center">
        <q-btn label="Cancelar" @click="onCancel" color="secondary" flat class="q-ml-sm" to="/" />
        <q-btn label="Salvar" @click="onSave" color="secondary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useVendasStore } from 'src/store/vendas'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const $q = useQuasar()
const router = useRouter()

const formVendas = ref({
  nome: '',
  CPF: null,
  telefone: null,
  descricaoVenda: '',
  dataEntrega: null,
  totalFinal: null,
  formaPagamento: '',
  statusPagamento: '',
  statusVenda: '',
})

const { postVenda } = useVendasStore()
async function onSave() {
  try {
    const venda = await postVenda(
      formVendas.value.nome,
      formVendas.value.CPF,
      formVendas.value.telefone,
      formVendas.value.descricaoVenda,
      formVendas.value.dataEntrega,
      formVendas.value.totalFinal,
      formVendas.value.formaPagamento,
      formVendas.value.statusPagamento,
      formVendas.value.statusVenda,
    )
    console.log('Venda Salva')
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Venda Salva',
    })
    router.push('/encomendas')
    return venda
  } catch (error) {
    console.log(error)
  }
}

function onCancel() {
  ;((formVendas.value.nome = ''),
    (formVendas.value.CPF = null),
    (formVendas.value.telefone = null),
    (formVendas.value.descricaoVenda = ''),
    (formVendas.value.dataEntrega = null),
    (formVendas.value.totalFinal = null),
    (formVendas.value.formaPagamento = ''),
    (formVendas.value.statusPagamento = ''),
    (formVendas.value.statusVenda = ''),
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'close',
      message: 'Venda Cancelada',
    }))
}
</script>
