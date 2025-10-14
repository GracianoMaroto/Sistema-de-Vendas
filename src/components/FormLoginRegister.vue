<template>
<q-card>
    <q-tabs
    v-model="tab"
    dense
    class="text-black"
    active-color="black"
    indicator-color="secondary"
    >
    <q-tab name="login" label="Login" />
    <q-tab name="register" label="Cadastrar" />
    </q-tabs>
                
    <q-separator />
                
    <q-tab-panels v-model="tab" animated>         
        <!-- LOGIN -->
        <q-tab-panel name="login">
            <q-form ref="loginForm" lazy-rules>
                <q-input
                filled
                v-model="email"
                label="Email"
                type="email"
                :rules="[ val => !!val || 'Email é obrigatório' ]"
                required
                />
                <q-input
                filled
                v-model="password"
                label="Senha"
                type="password"
                :rules="[ val => !!val || 'Senha é obrigatória' ]"
                required
                class="q-mt-md"
                />
                <q-btn
                label="Entrar"
                type="submit"
                style="background-color: black; color: goldenrod;"
                class="q-mt-md"
                :loading="loading"
                :disable="loading"
                to="/"
                />
            </q-form>
        </q-tab-panel>
        
        <!-- REGISTER -->
        <q-tab-panel name="register">
            <q-form ref="registerForm" lazy-rules>

                <q-input
                  filled
                  v-model="name"
                  label="Nome completo"
                  type="text"
                  :rules="[ val => !!val || 'Nome é obrigatório' ]"
                  required
                />

                <q-input
                filled
                v-model="email"
                label="Email"
                type="email"
                :rules="[ val => !!val || 'Email é obrigatório' ]"
                required
                class="q-mt-md"
                />
                <q-input
                filled
                v-model="password"
                label="Senha"
                type="password"
                :rules="[ val => !!val || 'Senha é obrigatória' ]"
                required
                class="q-mt-md"
                />
              <q-input
                filled
                v-model="passwordConfirm"
                label="Confirmar Senha"
                type="password"
                :rules="[
                    val => !!val || 'Confirmação é obrigatória',
                    val => val === password || 'Senhas não coincidem'
                ]"
                required
                class="q-mt-md"
                />
                <q-btn
                label="Cadastrar"
                type="submit"
                style="background-color: black; color: goldenrod;"
                class="q-mt-md"
                :loading="loading"
                :disable="loading"
                to="/"
                />
            </q-form>
        </q-tab-panel>
    </q-tab-panels>
</q-card>
</template>

<script setup>

import { ref } from 'vue'
// import { useQuasar } from 'quasar'
// import { auth } from 'src/firebase'
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
// import { useRouter } from 'vue-router'
// import { db } from 'src/firebase'
// import { doc , setDoc } from 'firebase/firestore'

// const router = useRouter()

// const $q = useQuasar()

const tab = ref('login')
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const loading = ref(false)

const loginForm = ref(null)
const registerForm = ref(null)

// async function handleLogin() {
//   if (!loginForm.value.validate()) return

//   loading.value = true
//   try {
//     await signInWithEmailAndPassword(auth, email.value, password.value)
//     $q.notify({ color: 'green', message: 'Login efetuado com sucesso!' })
//     router.push('/about')
//   } catch (error) {
//     $q.notify({ color: 'negative', message: 'Erro no login: ' + error.message })
//   }
//   loading.value = false
// }

// async function handleRegister() {
//   if (!registerForm.value.validate()) return

//   if (password.value !== passwordConfirm.value) {
//     $q.notify({ color: 'negative', message: 'As senhas não coincidem.' })
//     return
//   }

//   loading.value = true
//   try {
//     const {user} = await createUserWithEmailAndPassword(auth, email.value, password.value)
//     await updateProfile(user, {
//       displayName: name.value
//     })
//     await setDoc(doc(db, 'usuarios', user.uid), {
//       uid: user.uid,
//       nome: name.value,
//       email: email.value,
//       criadoEm: new Date()
//     })

//     $q.notify({ color: 'green', message: 'Cadastro realizado com sucesso!' })
//     tab.value = 'login'
//     email.value = ''
//     password.value = ''
//     passwordConfirm.value = ''
//     name.value = ''
//     router.push('/about')
//   } catch (error) {
//     $q.notify({ color: 'negative', message: 'Erro no cadastro: ' + error.message })
//   }
//   loading.value = false
//   }
</script>