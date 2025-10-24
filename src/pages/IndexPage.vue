<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-md">
      <div class="q-gutter-lg text-center">
        <q-img
          src="/icons/Logomarca-AurumDesk.png"
          height="110px"
          width="115px"
          style="text-align: center"
        />
        <q-img
          src="/icons/Logo-AA-SVG.svg"
          height="75px"
          width="110px"
          style="text-align: center"
        />
      </div>

      <div class="q-gutter-sm text-center">
        <q-btn
          size="22px"
          style="background: goldenrod; color: white; width: 315px"
          label="+ Nova Venda"
          to="/registrarvendas"
        />
        <q-btn
          size="22px"
          style="background: goldenrod; color: white; width: 315px"
          label="+ Novo Serviço"
          to="/registrarservicos"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
