<template>
  <q-page class="q-pa-md" style="background-color: #fff">
    <div class="row items-center q-mb-md">
      <q-icon name="assignment" size="32px" color="secondary" class="q-mr-sm" />
      <h1 class="text-h5 text-bold" style="color: black">Encomendas Registradas</h1>
    </div>

    <div v-if="vendasStore.vendas.length === 0" class="text-center q-mt-xl" style="color: black">
      Nenhuma venda registrada.
    </div>

    <div v-else class="q-gutter-md">
      <q-card
        v-for="venda in vendasStore.vendas"
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
            <q-btn flat dense color="secondary" icon="edit" @click="editarVenda(venda)" />
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
import { onMounted } from 'vue'
import { useVendasStore } from 'src/store/vendas'

const vendasStore = useVendasStore()

onMounted(async () => {
  await vendasStore.getVendas()
})
</script>

<style scoped>
.text-h6 {
  font-weight: 600;
}
</style>
