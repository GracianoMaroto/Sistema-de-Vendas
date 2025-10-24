<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Álvaro Alianças </q-toolbar-title>

        <div class="text-secondary">© AurumDesk</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="absolute-center" style="max-width: 768px; width: 90%; text-align: center">
          <q-img src="/icons/Logo-AurumDesk.png" height="140px" width="140px" />
          <form-login-register />
        </div>
      </q-page>
    </q-page-container>
    <q-footer>
      <div class="text-center">© Desenvolvido por AurumDesk, {{ anoAtual }}.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import FormLoginRegister from 'src/components/FormLogin.vue'

var anoAtual = new Date().getFullYear()
</script>
