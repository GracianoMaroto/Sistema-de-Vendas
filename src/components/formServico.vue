<template>
  <div class="q-pa-xs" style="min-width: 325px; max-width: 768px">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="formServicos.nome"
        label="Nome Completo"
        hint="Nome do cliente"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="text"
        v-model="formServicos.CPF"
        label="CPF"
        hint="CPF do cliente"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        type="text"
        v-model="formServicos.telefone"
        label="Telefone"
        hint="Telefone do cliente"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formServicos.itensRecebidos"
        label="Itens Recebidos"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formServicos.descricaoServico"
        label="Descrição do Serviço"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formServicos.dataEntrega"
        label="Data de Entrega"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formServicos.totalFinal"
        label="Total Final"
        hint="Já com descontos e abatimentos"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formServicos.formaPagamento"
        label="Forma de Pagamento"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formServicos.statusPagamento"
        label="Status de Pagamento"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type something']"
      />
      <q-input
        filled
        v-model="formServicos.statusServico"
        label="Status do Serviço"
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
import { useServicosStore } from 'src/store/servicos'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const formServicos = ref({
  nome: '',
  CPF: null,
  telefone: null,
  descricaoServico: '',
  itensRecebidos: '',
  dataEntrega: null,
  totalFinal: null,
  formaPagamento: '',
  statusPagamento: '',
  statusServico: '',
})

const { postServico } = useServicosStore()
async function onSave() {
  try {
    const servico = await postServico(
      formServicos.value.nome,
      formServicos.value.CPF,
      formServicos.value.telefone,
      formServicos.value.descricaoServico,
      formServicos.value.itensRecebidos,
      formServicos.value.dataEntrega,
      formServicos.value.totalFinal,
      formServicos.value.formaPagamento,
      formServicos.value.statusPagamento,
      formServicos.value.statusServico,
    )
    console.log('Serviço Salvo')
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Serviço Salvo',
    })
    return servico
  } catch (error) {
    console.log(error)
  }
  router.push('/servicos')
}

function onCancel() {
  ;((formServicos.value.nome = ''),
    (formServicos.value.CPF = null),
    (formServicos.value.telefone = null),
    (formServicos.value.descricaoServico = ''),
    (formServicos.value.itensRecebidos = ''),
    (formServicos.value.dataEntrega = null),
    (formServicos.value.totalFinal = null),
    (formServicos.value.formaPagamento = ''),
    (formServicos.value.statusPagamento = ''),
    (formServicos.value.statusServico = ''),
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'close',
      message: 'Serviço Cancelado',
    }))
}
</script>
