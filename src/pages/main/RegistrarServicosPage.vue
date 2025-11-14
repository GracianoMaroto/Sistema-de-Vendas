<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-sm">
      <div class="text-center">
        <q-img src="/icons/Logo-AurumDesk.png" height="90px" width="90px" />
      </div>

      <h3 class="text-secondary">Registrar Serviço</h3>
      <form-servico />
    </div>
  </q-page>
</template>

<script setup>
import FormServico from 'src/components/forms/formServico.vue'
</script>
