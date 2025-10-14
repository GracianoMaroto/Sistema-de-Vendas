<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Álvaro Alianças </q-toolbar-title>
        <div class="text-black">
          <q-btn-dropdown
            split
            size="12px"
            color="secondary"
            label="Vendedor (a)"
          >
            <q-btn icon="logout" class= "text-center full-width text-red-6" flat label="Sair" to="/auth"/>
            <!-- Fazer a logica para de fato ter o logout. -->
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <!-- colocar v-model= "tab" dentro do q-tabs -->
      <div elevated>
        <q-tabs
        class="bg-grey-3 text-black"
        style="background-color: grey;"
        narrow-indicator
        active-color="accent"
        dense
        >
        <q-route-tab name="home" icon="home" label="Home" to="/" />
        <q-route-tab name="encomendas" icon="unarchive" label="Encomendas" to="/encomendas" />
        <q-route-tab name="servicos" icon="handyman" label="Serviços" to="/servicos" />
        </q-tabs>
      </div>
      <div class="text-center" >
        © Desenvolvido por AurumDesk, {{ anoAtual }}.
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>

var anoAtual = new Date().getFullYear();

</script>
