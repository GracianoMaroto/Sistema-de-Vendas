<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 400px; border-radius: 12px">
      <q-card-section>
        <div class="text-h6 text-center text-secondary">Editar Venda</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">
        <q-input v-model="form.nome" label="Nome do Cliente" outlined dense />
        <q-input v-model="form.CPF" label="CPF" outlined dense />
        <q-input v-model="form.telefone" label="Telefone" outlined dense />
        <q-input v-model="form.descricaoVenda" label="Descrição" type="textarea" outlined dense />
        <q-input
          v-model="form.dataEntrega"
          label="Data de Entrega"
          mask="##/##/####"
          outlined
          dense
        />
        <q-input v-model="form.totalFinal" label="Total Final (R$)" outlined dense />
        <q-input v-model="form.statusPagamento" label="Status Pagamento" outlined dense />
        <q-input v-model="form.statusVenda" label="Status da Venda" outlined dense />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="grey" v-close-popup />
        <q-btn color="secondary" label="Salvar" @click="salvar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useVendasStore } from 'src/store/vendas'

const props = defineProps({
  modelValue: Boolean,
  venda: Object,
})
const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()
const vendasStore = useVendasStore()

const isOpen = ref(false)
const form = ref({
  id: null,
  nome: '',
  CPF: '',
  telefone: '',
  descricaoVenda: '',
  dataEntrega: '',
  totalFinal: '',
  formaPagamento: '',
  statusPagamento: '',
  statusVenda: '',
})

// Sincroniza a abertura do dialog
watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val
    if (val && props.venda) form.value = { ...props.venda }
  },
)

// Sincroniza fechamento
watch(isOpen, (val) => emit('update:modelValue', val))

async function salvar() {
  try {
    const s = form.value
    await vendasStore.editVenda(
      s.id,
      s.nome,
      s.CPF,
      s.telefone,
      s.descricaoVenda,
      s.dataEntrega,
      s.totalFinal,
      s.formaPagamento,
      s.statusPagamento,
      s.statusVenda,
    )

    $q.notify({
      color: 'positive',
      icon: 'check',
      message: 'Venda atualizada com sucesso!',
    })
    isOpen.value = false
  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'negative',
      icon: 'error',
      message: 'Erro ao atualizar a venda',
    })
  }
}
</script>
