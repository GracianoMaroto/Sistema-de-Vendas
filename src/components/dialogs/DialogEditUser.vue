<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 400px; border-radius: 12px">
      <q-card-section>
        <div class="text-h6 text-center text-secondary">Editar Usuário</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">
        <q-input v-model="form.name" label="Nome do Usuário" outlined dense />
        <q-input v-model="form.email" label="E-mail" outlined dense />
        <q-input v-model="form.role" label="Cargo" outlined dense />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="grey" v-close-popup />
        <q-btn color="secondary" label="Salvar" @click="salvar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useUsersStore } from 'src/store/usuarios'

const props = defineProps({
  modelValue: Boolean,
  user: Object,
})
const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()
const usersStore = useUsersStore()

const isOpen = ref(false)
const form = ref({
  id: null,
  name: '',
  email: '',
  role: '',
})

// Sincroniza a abertura do dialog
watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val
    if (val && props.user) form.value = { ...props.user }
  },
)

// Sincroniza fechamento
watch(isOpen, (val) => emit('update:modelValue', val))

async function salvar() {
  try {
    const u = form.value
    await usersStore.editUser(u.id, u.name, u.email, u.role)

    $q.notify({
      color: 'positive',
      icon: 'check',
      message: 'Usuário atualizado com sucesso!',
    })
    isOpen.value = false
  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'negative',
      icon: 'error',
      message: 'Erro ao atualizar a usuário',
    })
  }
}
</script>
