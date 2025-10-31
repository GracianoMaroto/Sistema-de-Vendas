<template>
  <q-card>
    <q-tabs v-model="tab" dense class="text-black" active-color="black" indicator-color="secondary">
      <q-tab name="login" label="Login" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login">
        <q-form lazy-rules>
          <q-input
            filled
            v-model="loginForm.email"
            label="Email"
            type="email"
            :rules="[(val) => !!val || 'Email é obrigatório']"
            required
          />
          <q-input
            filled
            v-model="loginForm.password"
            label="Senha"
            type="password"
            :rules="[(val) => !!val || 'Senha é obrigatória']"
            required
            class="q-mt-md"
          />
          <q-btn
            label="Entrar"
            @click="realizarLogin"
            style="background-color: black; color: goldenrod"
            class="q-mt-md"
            :loading="loading"
            :disable="loading"
          />
        </q-form>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/store/auth'
import { ref } from 'vue'
import { Notify } from 'quasar'

const router = useRouter()

const loginForm = ref({
  email: '',
  password: '',
})

const { login } = useAuthStore()

async function realizarLogin() {
  try {
    const token = await login(loginForm.value.email, loginForm.value.password)
    if (token) {
      localStorage.setItem('token', token)
      const payload = JSON.parse(atob(token.split('.')[1]))
      localStorage.setItem('nomeUsuario', payload.name)

      router.push('/')

      Notify.create({
        message: 'Login realizado com sucesso',
        color: 'green',
        position: 'top',
      })
    } else {
      console.error('Falha no login')
    }
    if (!token) {
      Notify.create({
        message: 'E-mail ou senha incorretos',
        color: 'negative',
        position: 'top',
      })
    }
  } finally {
    loading.value = false
  }
}

const tab = ref('login')
const loading = ref(false)
</script>
