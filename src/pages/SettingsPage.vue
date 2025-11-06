<template>
  <q-page class="q-pa-md" style="background-color: #fff">
    <div class="row items-center">
      <q-icon name="assignment" size="32px" color="secondary" class="q-mr-sm" />
      <h1 class="text-h5 text-bold" style="color: black">Usuários Registrados</h1>
      <q-btn
        id="botaoAdd"
        class="text-accent q-ml-md"
        flat
        icon="add"
        size="20px"
        @click="criarUsuario"
      />
    </div>

    <div class="row q-gutter-sm">
      <q-input
        v-model="search"
        class="q-mb-lg"
        filled
        type="search"
        label="Buscar venda"
        hint="Digite o nome do cliente"
        style="width: 300px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        style="height: 55px; width: 50px"
        icon="filter_alt"
        color="grey-3"
        text-color="grey-7"
        unelevated
      />
    </div>

    <DialogEditUser v-model="dialogEditUser" :user="userSelecionado" @salvar="salvarEdicao" />
    <DialogAddUser v-model="dialogAddUser" />

    <div v-if="usersStore.users.length === 0" class="text-center q-mt-xl" style="color: black">
      Nenhum usuário registrado.
    </div>

    <div v-else class="q-gutter-md">
      <q-card
        v-for="user in showUsers"
        :key="user.id"
        flat
        bordered
        class="q-mb-md"
        style="
          border-left: 6px solid goldenrod;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        "
      >
        <q-card-section class="row justify-between items-start">
          <div>
            <div class="text-h6" style="color: black">
              <q-icon name="person" size="20px" class="q-mr-sm" /> {{ user.name }}
            </div>
            <div class="text-subtitle2" style="color: black">
              <q-icon name="mail" size="16px" class="q-mr-sm" /> E-mail: {{ user.email }}
            </div>
            <div class="text-subtitle2" style="color: black">
              <q-icon name="work" size="16px" class="q-mr-sm" /> Cargo: {{ user.role }}
            </div>
          </div>

          <div class="row q-gutter-sm">
            <q-btn flat dense color="secondary" icon="edit" @click="abrirEdicao(user)" />
            <q-btn flat dense color="negative" icon="delete" @click="deletarUsuario(user.id)" />
          </div>
          <!-- <q-dialog v-model="dialogDeleteUser" persistent>
            <q-card
              style="
                border-top: 6px solid goldenrod;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              "
            >
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Você confirma a exclusão do usuário(a) {{ user.name }}?</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="grey" v-close-popup />
                <q-btn
                  flat
                  label="Confirm"
                  color="secondary"
                  @click="confirmar"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog> -->
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useUsersStore } from 'src/store/usuarios'
import { computed, onMounted, ref } from 'vue'
import DialogEditUser from 'src/components/dialogs/DialogEditUser.vue'
import DialogAddUser from 'src/components/dialogs/DialogAddUser.vue'

const $q = useQuasar()
const search = ref('')
const usersStore = useUsersStore()
const dialogEditUser = ref(false)
const dialogAddUser = ref(false)
const userSelecionado = ref(null)
// const dialogDeleteUser = ref(false)

const showUsers = computed(() => {
  const termo = search.value.toLowerCase()
  return usersStore.users.filter((u) => u.name.toLowerCase().includes(termo))
})

function criarUsuario() {
  dialogAddUser.value = true
}

// function abrirDelecao() {
//   dialogEditUser.value = true
// }

function abrirEdicao(user) {
  userSelecionado.value = { ...user }
  dialogEditUser.value = true
}

async function salvarEdicao(usuarioAtualizado) {
  await usersStore.editUser(
    usuarioAtualizado.id,
    usuarioAtualizado.nome,
    usuarioAtualizado.email,
    usuarioAtualizado.role,
  )
}
async function deletarUsuario(id) {
  try {
    await usersStore.deletarUser(id)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'delete',
      message: 'Usuário deletado com sucesso',
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Erro ao deletar o usuário',
    })
  }
}

onMounted(async () => {
  await usersStore.getUsers()
})
</script>

<style scoped>
.text-h6 {
  font-weight: 600;
}

#botaoAdd {
  border-radius: 10px;
}
</style>
