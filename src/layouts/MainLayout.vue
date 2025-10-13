<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="botãoMenuLateral" />

        <q-toolbar-title> Álvaro Alianças </q-toolbar-title>

        <div class="text-black">
          <q-btn-dropdown
            split
            size="12px"
            color="secondary"
            label="Vendedor (a)"
          >
          <q-btn icon="logout" class= "text-center full-width text-red-6" flat label="Sair" to="/auth"/>
          <!-- <q-list>
            <q-item>
              <q-item-section>
                <q-item-label to="/auth">Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list> -->
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="menuSanduiche" show-if-above bordered>
      <q-list>
        <q-item-label header> Páginas </q-item-label>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer style="text-align: center; color:white" elevated>
      © Desenvolvido por AurumDesk, {{ anoAtual }}.
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const menuSanduiche = ref(false)
var anoAtual = new Date().getFullYear();

function botãoMenuLateral() {
  menuSanduiche.value = !menuSanduiche.value
}
</script>
