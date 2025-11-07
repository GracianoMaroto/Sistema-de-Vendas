<template>
  <q-page class="q-pa-md" style="background-color: #fff">
    <div class="text-center">
      <q-avatar size="100px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <div class="text-h6">
        {{ nomeUsuario }}
      </div>
      <q-badge outline color="secondary">{{ roleUsuario }}</q-badge>
    </div>
    <span class="text-h6 text-bold">Total Vendas</span>
    <div
      class="row items-center bg-grey-2 q-pa-sm q-mb-md rounded shadow-1"
      style="max-width: fit-content"
    >
      <span class="text-h6 text-bold text-secondary">R$ </span>
      <span class="text-h6 text-bold q-ml-sm" style="color: black">
        {{ totalVendas.toFixed(2) }}
      </span>
    </div>
    <span class="text-h6 text-bold">Total Serviços</span>
    <div
      class="row items-center bg-grey-2 q-pa-sm q-mb-md rounded shadow-1"
      style="max-width: fit-content"
    >
      <span class="text-h6 text-bold text-secondary">R$ </span>
      <span class="text-h6 text-bold q-ml-sm" style="color: black">
        {{ totalServicos.toFixed(2) }}
      </span>
    </div>
    <span class="text-h6 text-bold">Total Geral</span>
    <div
      class="row items-center bg-grey-2 q-pa-sm q-mb-md rounded shadow-1"
      style="max-width: fit-content"
    >
      <span class="text-h6 text-bold text-secondary">R$ </span>
      <span class="text-h6 text-bold q-ml-sm" style="color: black">
        {{ somaVendasServicos.toFixed(2) }}
      </span>
    </div>
    <footer class="text-center q-mt-xl">
      <q-btn icon="edit" label="editar usuários" to="/usuarios" color="secondary" />
    </footer>
  </q-page>
</template>

<script setup>
import { useServicosStore } from 'src/store/servicos'
import { useUsersStore } from 'src/store/usuarios'
import { useVendasStore } from 'src/store/vendas'
import { computed, onMounted } from 'vue'

const usersStore = useUsersStore()
const nomeUsuario = localStorage.getItem('nomeUsuario')
const roleUsuario = localStorage.getItem('roleUsuario')
const vendasStore = useVendasStore()
const servicosStore = useServicosStore()

const totalVendas = computed(() => {
  if (!Array.isArray(vendasStore.vendas)) return 0
  return vendasStore.vendas.reduce((acc, venda) => {
    const valor =
      parseFloat(venda.totalFinal.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) || 0
    return acc + valor
  }, 0)
})
const totalServicos = computed(() => {
  if (!Array.isArray(servicosStore.servicos)) return 0
  return servicosStore.servicos.reduce((acc, servico) => {
    const valor = parseFloat(servico.totalFinal) || 0
    return acc + valor
  }, 0)
})
const somaVendasServicos = totalVendas.value + totalServicos.value

onMounted(async () => {
  await usersStore.getUsers()
  await vendasStore.getVendas()
  await servicosStore.getServicos()
})
</script>

<style scoped></style>
