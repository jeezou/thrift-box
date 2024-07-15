<template>
  <div class="login-page">
    <h1 class="login-page__title h1">
      Вход
    </h1>

    <form 
      class="login-page__form"
      action="submit"
      @submit.prevent="onSubmit"
    >
      <div class="login-page__form-item">
        <label for="login">Логин</label>
        <input 
          type="text"
          id="login"
          v-model="login"
        >
      </div>

      <div class="login-page__form-item">
        <label for="password">Пароль</label>
        <input 
          type="password"
          id="password"
          v-model="password"
        >
      </div>

      <div 
        v-if="isErr"
        class="login-page__error"
      >
        {{ errorMsg }}
      </div>

      <button type="submit" class="login-page__submit">
        Войти
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const login = ref()
const password = ref()

const errorMsg = ref()
const isErr = ref(false)

async function onSubmit() {
  if(!login.value || !password.value) {
    errorMsg.value = 'Введите логин и пароль'
    isErr.value = true
    return;
  }

  const res = await $fetch('/api/login', { 
    method: 'POST', 
    body: {
      login: login.value.trim(),
      password: password.value.trim()
    }
  })

  if(res) {
    router.push('/admin')
  } else {
    errorMsg.value = 'Неверный логин или пароль'
    isErr.value = true
  }
}

watch([login, password], () => {
  isErr.value = false
})
</script>

<style lang="scss" scoped>
.login-page {
  &__form {
    width: 450px;
    margin-top: 32px;

    &-item {
      margin-top: 16px;
      display: flex;
      align-items: center;
      column-gap: 24px;

      label {
        width: 120px;
        font-weight: 500;
        font-size: 20px;
      }

      input {
        font-size: 18px;
        width: 100%;
      }
    }
  }

  &__submit {
    margin-top: 32px;
    width: 100%;
    font-size: 24px;
  }

  &__error {
    margin-top: 16px;
    color: red;
    font-weight: 500;
  }
}
</style>