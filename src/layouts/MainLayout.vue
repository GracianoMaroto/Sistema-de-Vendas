<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Álvaro Alianças </q-toolbar-title>
        <div class="text-black">
          <q-btn-dropdown split size="12px" color="secondary" :label="primeiroNome">
            <q-btn
              icon="logout"
              class="text-center full-width text-red-6"
              @click="logout"
              flat
              label="Sair"
            />
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <div elevated>
        <q-tabs
          class="bg-grey-3 text-black"
          style="background-color: grey"
          narrow-indicator
          active-color="accent"
          dense
        >
          <q-route-tab name="home" icon="home" label="Home" to="/" />
          <q-route-tab name="encomendas" icon="unarchive" label="Encomendas" to="/encomendas" />
          <q-route-tab name="servicos" icon="handyman" label="Serviços" to="/servicos" />
        </q-tabs>
      </div>
      <div class="text-center">© Desenvolvido por AurumDesk, {{ anoAtual }}.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'

var anoAtual = new Date().getFullYear()
const router = useRouter()

const nomeUsuario = localStorage.getItem('nomeUsuario')
const primeiroNome = (nomeUsuario || '').split(' ')[0] || 'Usuário'

function logout() {
  localStorage.removeItem('token')
  router.push('/auth')
}
</script>
