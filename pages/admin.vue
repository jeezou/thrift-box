<template>
  <div class="admin-page">
    <h1 class="admin-page__title h1">
      Обновление данных
    </h1>

    <form 
      class="admin-page__form"
      action="submit"
      @submit.prevent="onSubmit"
    >
      <div class="admin-page__form-item">
        <label for="wallet">Адрес кошелька:</label>
        <input type="text" v-model="form.wallet">
      </div>

      <div class="admin-page__form-item">
        <label for="wallet">Текущий баланс (usd):</label>
        <input type="text" v-model="form.balance" :disabled="form.autoreload">
      </div>

      <div class="admin-page__form-item">
        <label for="wallet">Целевой баланс (usd):</label>
        <input type="text" v-model="form.targetBalance">
      </div>

      <div class="admin-page__form-item">
        <label for="wallet">Цель (заголовок):</label>
        <input type="text" v-model="form.target">
      </div>

      <div class="admin-page__form-item">
        <label for="wallet">Автообновление:</label>
        <input type="checkbox" v-model="form.autoreload">
      </div>

      <div 
        v-if="isMsg"
        class="admin-page__msg"
        :class="{'admin-page__msg_error' : isErr}"
      >
        {{ msg }}
      </div>

      <button 
        class="admin-page__submit"
        type="submit"
        :disabled="noChanges"
      >
        Обновить
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { IUser } from '~/server/types/user'

const { data: auth } = await useFetch('/api/auth')

if(!auth.value){
  await navigateTo('/login')
}

const { data: user, error } = await useFetch('/api/data')

const form = ref<IUser>({
  wallet: '',
  balance: '',
  targetBalance: '',
  target: '',
  autoreload: false
})

const isMsg = ref(false)
const isErr = ref(false)
const msg = ref('')

if(!error.value && user.value) {
  updateForm(user.value)
}

function updateForm(data: IUser) {
  form.value = {
    wallet: data.wallet,
    balance: data.balance,
    targetBalance: data.targetBalance,
    target: data.target,
    autoreload: data.autoreload
  }
}

async function onSubmit() {
  const anyIsEmpty = Object.entries(form.value).filter(([key, value]) => key !== 'autoreload').some(([key, value]) => !value)

  if(anyIsEmpty) {
    msg.value = "Необходимо заполнить все поля"
    isMsg.value = true
    isErr.value = true
    return;
  }

  const res = await $fetch('/api/update', {
    method: 'PATCH',
    body: { ...form.value }
  })

  updateForm(res)
  
  await nextTick();
  msg.value = "Обновление прошло успешно"
  isMsg.value = true

  setTimeout(() => isMsg.value = false, 3000)
}

watch(form, () => {
  isErr.value = false
  isMsg.value = false
})

watch(() => form.value.autoreload, async (newValue) => {
  if(newValue) {
    const balance = await $fetch('/api/balance', {
      params: {
        address: form.value.wallet
      }
    })

    form.value.balance = balance.toString();
  }
})

const noChanges = computed(() => {
  const {_id, __v, ...props } = user.value
  return JSON.stringify(props) === JSON.stringify(form.value)
})
</script>

<style lang="scss" scoped>
.admin-page {
  &__form {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    width: 630px;

    &-item {
      margin-top: 16px;
      display: flex;
      align-items: center;
      column-gap: 16px;

      label {
        min-width: 250px;
      }

      input {
        width: 100%;

        &[type="checkbox"] {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  &__submit {
    margin-top: 24px;
    font-size: 18px;
    padding: 6px 12px;
  }

  &__msg {
    margin-top: 16px;
    color: green;
    font-weight: 500;

    &_error {
      color: red;
    }
  }
}
</style>