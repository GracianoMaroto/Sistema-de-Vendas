<template>
  <q-page class="q-pa-md" style="background-color: #fff">
    <div class="row items-center">
      <q-icon name="assignment" size="32px" color="secondary" class="q-mr-sm" />
      <h1 class="text-h5 text-bold" style="color: black">Encomendas Registradas</h1>
    </div>

    <div
      class="row items-center bg-grey-2 q-pa-sm q-mb-md rounded shadow-1"
      style="max-width: fit-content"
    >
      <span class="text-h6 text-bold text-secondary">R$ </span>
      <span class="text-h6 text-bold q-ml-sm" style="color: black">
        {{ totalVendas.toFixed(2) }}
      </span>
    </div>

    <q-input
      v-model="search"
      class="q-mb-lg"
      filled
      type="search"
      label="Buscar venda"
      hint="Digite o nome do cliente"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <DialogEditVenda v-model="dialogEditVenda" :venda="vendaSelecionada" @salvar="salvarEdicao" />

    <div v-if="vendasStore.vendas.length === 0" class="text-center q-mt-xl" style="color: black">
      Nenhuma venda registrada.
    </div>

    <div v-else class="q-gutter-md">
      <q-card
        v-for="venda in vendasFiltradas"
        :key="venda.id"
        flat
        bordered
        class="q-mb-md"
        style="
          border-left: 6px solid goldenrod;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        "
      >
        <q-card-section class="row justify-between items-start">
          <div>
            <div class="text-h6" style="color: black">
              <q-icon name="person" size="20px" class="q-mr-sm" /> {{ venda.nome }}
            </div>
            <div class="text-subtitle2" style="color: black">
              <q-icon name="badge" size="16px" class="q-mr-sm" /> CPF: {{ venda.CPF }}
            </div>
            <div class="text-subtitle2" style="color: black">
              <q-icon name="phone" size="16px" class="q-mr-sm" /> Telefone: {{ venda.telefone }}
            </div>
          </div>

          <div class="row q-gutter-sm">
            <q-btn flat dense color="secondary" icon="edit" @click="abrirEdicao(venda)" />
            <q-btn flat dense color="negative" icon="delete" @click="deletarVenda(venda.id)" />
          </div>
        </q-card-section>

        <q-separator color="accent" />

        <q-card-section class="q-pt-none">
          <div>
            <q-icon name="assignment" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Descrição:</strong> {{ venda.descricaoVenda }}
          </div>
          <div>
            <q-icon name="event" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Data de Entrega:</strong> {{ venda.dataEntrega }}
          </div>
          <div>
            <q-icon name="attach_money" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Total Final:</strong> R$ {{ venda.totalFinal }}
          </div>
          <div>
            <q-icon name="credit_card" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Pagamento:</strong>
            <q-badge
              :label="venda.statusPagamento"
              :color="venda.statusPagamento === 'Pago' ? 'accent' : 'secondary'"
              text-color="white"
              class="q-ml-xs"
            />
          </div>
          <div>
            <q-icon
              :name="venda.statusVenda === 'Finalizada' ? 'check_circle' : 'hourglass_empty'"
              size="16px"
              color="secondary"
              class="q-mr-sm"
            />
            <strong>Status da Venda:</strong>
            <q-badge
              :label="venda.statusVenda"
              :color="venda.statusVenda === 'Finalizada' ? 'accent' : 'secondary'"
              text-color="white"
              class="q-ml-xs"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useVendasStore } from 'src/store/vendas'
import { useQuasar } from 'quasar'
import DialogEditVenda from 'src/components/dialogs/DialogEditVenda.vue'

const $q = useQuasar()
const vendasStore = useVendasStore()

const search = ref('')
const dialogEditVenda = ref(false)
const vendaSelecionada = ref(null)

const vendasFiltradas = computed(() => {
  const termo = search.value.toLowerCase()
  return vendasStore.vendas.filter((s) => s.nome.toLowerCase().includes(termo))
})

const totalVendas = computed(() => {
  if (!Array.isArray(vendasStore.vendas)) return 0
  return vendasStore.vendas.reduce((acc, venda) => {
    const valor =
      parseFloat(venda.totalFinal.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) || 0
    return acc + valor
  }, 0)
})

function abrirEdicao(venda) {
  vendaSelecionada.value = { ...venda }
  dialogEditVenda.value = true
}

async function salvarEdicao(vendaAtualizada) {
  await vendasStore.editVenda(
    vendaAtualizada.id,
    vendaAtualizada.nome,
    vendaAtualizada.CPF,
    vendaAtualizada.telefone,
    vendaAtualizada.descricaoVenda,
    vendaAtualizada.dataEntrega,
    vendaAtualizada.totalFinal,
    vendaAtualizada.formaPagamento,
    vendaAtualizada.statusPagamento,
    vendaAtualizada.statusVenda,
  )
}

async function deletarVenda(id) {
  try {
    await vendasStore.deletarVenda(id)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'delete',
      message: 'Venda deletada com sucesso',
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Erro ao deletar a venda',
    })
  }
}

onMounted(async () => {
  await vendasStore.getVendas()
})
</script>

<style scoped>
.text-h6 {
  font-weight: 600;
}
</style>
