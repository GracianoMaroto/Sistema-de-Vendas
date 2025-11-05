<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Álvaro Alianças </q-toolbar-title>
        <div>
          <q-btn-dropdown split color="secondary" size="13px" :label="primeiroNome">
            <q-list>
              <q-item class="text-red-6" clickable v-close-popup @click="logout">
                <q-avatar icon="logout" size="30px" />
                <q-item-section class="text-black-6" flat>
                  <q-item-label>Sair</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="authorizedUser" clickable v-close-popup @click="settings">
                <q-avatar icon="settings" size="30px" />
                <q-item-section class="text-black-6" flat>
                  <q-item-label>Config</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
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
const roleUsuario = localStorage.getItem('roleUsuario')
const authorizedUser = roleUsuario === 'ADMIN'

function settings() {
  router.push('/settings')
}

function logout() {
  localStorage.removeItem('token')
  router.push('/auth')
}
</script>
