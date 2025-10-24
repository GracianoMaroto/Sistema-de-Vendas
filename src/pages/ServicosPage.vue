<template>
  <q-page class="q-pa-md" style="background-color: #fff">
    <div class="row items-center q-mb-md">
      <q-icon name="assignment" size="32px" color="secondary" class="q-mr-sm" />
      <h1 class="text-h5 text-bold" style="color: black">Serviços Registrados</h1>
    </div>

    <div
      v-if="servicosStore.servicos.length === 0"
      class="text-center q-mt-xl"
      style="color: black"
    >
      Nenhum serviço registrado.
    </div>

    <div v-else class="q-gutter-md">
      <q-card
        v-for="servico in servicosStore.servicos"
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
            <q-btn flat dense color="secondary" icon="edit" @click="editarServico(servico)" />
            <q-btn flat dense color="negative" icon="delete" @click="deletarServico(servico.id)" />
          </div>
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
import { onMounted } from 'vue'
import { useServicosStore } from 'src/store/servicos'

const servicosStore = useServicosStore()

onMounted(async () => {
  await servicosStore.getServicos()
})
</script>

<style scoped>
.text-h6 {
  font-weight: 600;
}
</style>
