<template>
  <q-dialog v-model="loading" persistent>
    <q-card style="min-width: 330px; border-radius: 12px">
      <q-tabs dense class="text-black" active-color="black" indicator-color="secondary">
        <q-tab name="login" label="Cadastrar Usuário" />
      </q-tabs>

      <q-separator />
      <q-card-section>
        <q-form lazy-rules>
          <q-input
            filled
            v-model="registerForm.name"
            label="Nome"
            type="name"
            :rules="[(val) => !!val || 'Nome é obrigatório']"
            required
          />
          <q-input
            filled
            v-model="registerForm.email"
            label="Email"
            type="email"
            :rules="[(val) => !!val || 'Email é obrigatório']"
            required
          />
          <q-input
            filled
            v-model="registerForm.password"
            label="Senha"
            type="password"
            :rules="[(val) => !!val || 'Senha é obrigatória']"
            required
            class="q-mt-md"
          />
          <q-select
            :options="selectOptions"
            filled
            v-model="registerForm.role"
            label="Cargo"
            type="role"
            :rules="[(val) => !!val || 'Cargo é obrigatório']"
            required
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancelar"
          color="grey"
          :loading="loading"
          :disable="loading"
          v-close-popup
        />
        <q-btn
          color="secondary"
          label="Salvar"
          :loading="loading"
          :disable="loading"
          @click="realizarCadastro"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'
import { useUsersStore } from 'src/store/usuarios'

const loading = ref(false)
const selectOptions = ['ADMIN', 'GERENTE', 'VENDEDOR']
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  role: '',
})

const { postUser } = useUsersStore()

async function realizarCadastro() {
  loading.value = true
  try {
    const newUser = await postUser(
      registerForm.value.name,
      registerForm.value.email,
      registerForm.value.password,
      registerForm.value.role,
    )
    if (newUser)
      Notify.create({
        message: 'Usuário criado com sucesso',
        color: 'green',
        position: 'bottom',
      })
  } catch (e) {
    console.log(e)
    Notify.create({
      message: 'Falha ao criar usuário',
      color: 'negative',
      position: 'bottom',
    })
  } finally {
    loading.value = false
  }
}
</script>
