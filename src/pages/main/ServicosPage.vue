<template>
  <q-page class="q-pa-md" style="background-color: #fff">
    <div class="row items-center">
      <q-icon name="assignment" size="32px" color="secondary" class="q-mr-sm" />
      <h1 class="text-h5 text-bold" style="color: black">Serviços Registrados</h1>
    </div>

    <div
      class="row items-center bg-grey-2 q-pa-sm q-mb-md rounded shadow-1"
      style="max-width: fit-content"
    >
      <span class="text-h6 text-bold text-secondary">R$ </span>
      <span class="text-h6 text-bold q-ml-sm" style="color: black">
        {{ totalServicos.toFixed(2) }}
      </span>
    </div>

    <div class="row q-gutter-sm">
      <q-input
        v-model="search"
        class="q-mb-lg"
        filled
        type="search"
        label="Buscar venda"
        hint="Digite o nome do cliente"
        style="width: 300px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        style="height: 55px; width: 50px"
        icon="filter_alt"
        color="grey-3"
        text-color="grey-7"
        unelevated
      />
    </div>

    <DialogEditServico
      v-model="dialogEditServico"
      :servico="servicoSelecionado"
      @salvar="salvarEdicao"
    />

    <div v-if="servicosFiltrados.length === 0" class="text-center q-mt-xl" style="color: black">
      Nenhum serviço encontrado.
    </div>

    <!-- Lista de serviços -->
    <div v-else class="q-gutter-md">
      <q-card
        v-for="servico in servicosFiltrados"
        :key="servico.id"
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
              <q-icon name="person" size="20px" class="q-mr-sm" /> {{ servico.nome }}
            </div>
            <div class="text-subtitle2" style="color: black">
              <q-icon name="badge" size="16px" class="q-mr-sm" /> CPF: {{ servico.CPF }}
            </div>
            <div class="text-subtitle2" style="color: black">
              <q-icon name="phone" size="16px" class="q-mr-sm" /> Telefone: {{ servico.telefone }}
            </div>
          </div>

          <div class="row q-gutter-sm">
            <q-btn
              flat
              dense
              color="secondary"
              icon="edit"
              @click="abrirEdicao(servico)"
              :disable="!authorizedUser"
            />
            <q-btn
              flat
              dense
              color="negative"
              icon="delete"
              @click="deletarServico(servico.id)"
              :disable="!authorizedUser"
            />
          </div>
          <!-- <q-dialog v-model="confirm" persistent>
            <q-card
              style="
                border-top: 6px solid goldenrod;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              "
            >
              <q-card-section class="row items-center">
                <span class="q-ml-sm"
                  >Você confirma a exclusão do servico de {{ servico.nome }}?</span
                >
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="grey" v-close-popup />
                <q-btn
                  flat
                  label="Confirm"
                  color="secondary"
                  @click="deletarServico(servico.id)"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog> -->
        </q-card-section>

        <q-separator color="accent" />

        <q-card-section class="q-pt-none">
          <div>
            <q-icon name="assignment" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Descrição:</strong> {{ servico.descricaoServico }}
          </div>
          <div>
            <q-icon name="inventory" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Itens Recebidos:</strong> {{ servico.itensRecebidos }}
          </div>
          <div>
            <q-icon name="event" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Data de Entrega:</strong> {{ servico.dataEntrega }}
          </div>
          <div>
            <q-icon name="attach_money" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Total Final:</strong> R$ {{ servico.totalFinal }}
          </div>
          <div>
            <q-icon name="credit_card" size="16px" color="secondary" class="q-mr-sm" />
            <strong>Pagamento:</strong>
            <q-badge
              :label="servico.statusPagamento"
              :color="servico.statusPagamento === 'Pago' ? 'accent' : 'secondary'"
              text-color="white"
              class="q-ml-xs"
            />
          </div>
          <div>
            <q-icon
              :name="servico.statusServico === 'Finalizado' ? 'check_circle' : 'hourglass_empty'"
              size="16px"
              color="secondary"
              class="q-mr-sm"
            />
            <strong>Status do Serviço:</strong>
            <q-badge
              :label="servico.statusServico"
              :color="servico.statusServico === 'Finalizado' ? 'accent' : 'secondary'"
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
import { useQuasar } from 'quasar'
import { computed, ref, onMounted } from 'vue'
import { useServicosStore } from 'src/store/servicos'
import DialogEditServico from 'src/components/dialogs/DialogEditServico.vue'

const $q = useQuasar()
const servicosStore = useServicosStore()

// const confirm = ref(false)
const search = ref('')
const dialogEditServico = ref(false)
const servicoSelecionado = ref(null)
const roleUsuario = localStorage.getItem('roleUsuario')
const authorizedUser = roleUsuario === 'ADMIN' || roleUsuario === 'GERENTE'

const servicosFiltrados = computed(() => {
  const termo = search.value.toLowerCase()
  return servicosStore.servicos.filter((s) => s.nome.toLowerCase().includes(termo))
})

const totalServicos = computed(() => {
  if (!Array.isArray(servicosStore.servicos)) return 0
  return servicosStore.servicos.reduce((acc, servico) => {
    const valor = parseFloat(servico.totalFinal) || 0
    return acc + valor
  }, 0)
})

function abrirEdicao(servico) {
  servicoSelecionado.value = { ...servico }
  dialogEditServico.value = true
}

async function salvarEdicao(servicoAtualizado) {
  await servicosStore.editServico(
    servicoAtualizado.id,
    servicoAtualizado.nome,
    servicoAtualizado.CPF,
    servicoAtualizado.telefone,
    servicoAtualizado.descricaoServico,
    servicoAtualizado.itensRecebidos,
    servicoAtualizado.dataEntrega,
    servicoAtualizado.totalFinal,
    servicoAtualizado.formaPagamento,
    servicoAtualizado.statusPagamento,
    servicoAtualizado.statusServico,
  )
}

async function deletarServico(id) {
  try {
    await servicosStore.deletarServico(id)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'delete',
      message: 'Serviço deletado com sucesso',
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Erro ao deletar o serviço',
    })
  }
}

onMounted(async () => {
  await servicosStore.getServicos()
})
</script>

<style scoped>
.text-h6 {
  font-weight: 600;
}
</style>
