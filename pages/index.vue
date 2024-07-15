<template>
  <div class="main-page" v-if="user">
    <h1 class="main-page__title h1">
      Коплю на <span>{{ user.target }}</span>
    </h1>

    <div class="main-page__item">
      <span class="main-page__item-label">
        Текущий баланс:
      </span>
      <span class="main-page__item-value">
        {{ user.balance }} usdt
      </span>
    </div>

    <div class="main-page__item">
      <span class="main-page__item-label">
        Цель:
      </span>
      <span class="main-page__item-value">
        {{ user.targetBalance }} usdt
      </span>
    </div>

    <!-- <hr class="main-page__item"> -->

    <div class="main-page__item main-page__item_reload">
      <span class="main-page__item-label">
        Автообновление:
      </span>
      <span 
        class="main-page__item-value"
        :class="`main-page__item-value_reload-${user.autoreload ? 'enabled' : 'disabled'}`"
      >
        {{ user.autoreload ? 'Включено' : 'Выключено' }}
      </span>
    </div>

    <div class="main-page__item">
      <span class="main-page__item-label">
        Адрес кошелька:
      </span>
      <span class="main-page__item-value">
        {{ user.wallet }}
      </span>
    </div>

    <button 
      class="main-page__reload"
      @click="onUpdate"
    >
      Обновить
    </button>
  </div>
</template>

<script lang="ts" setup>
const { data: user } = await useFetch('/api/data');

async function onUpdate() {
  if(user.value){
    const walletBalance = await $fetch('/api/balance', {
      method: 'GET',
      params: {
        address: user.value.wallet
      }
    });
    const res = await $fetch('/api/update', {
      method: 'PATCH',
      body: { ...user.value, balance: walletBalance }
    })
    user.value = { ...res };
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  &__title {
    margin-bottom: 40px;

    span {
      padding: 4px 8px;
      border-radius: 8px;
      background: rgb(168, 235, 168);
    }
  }

  &__item {
    max-width: 700px;
    margin-left: 0;
    margin-top: 24px;
    font-size: 20px;

    &_reload {
      margin-top: 40px;
    }

    &-label {
      font-weight: 500;
    }

    &-value {
      &_reload {
        &-enabled {
          color: green;
        }

        &-disabled {
          color: red;
        }
      }
    }
  }

  &__reload {
    margin-top: 32px;
    font-size: 24px;
    border-radius: 12px;
    padding: 8px 12px;
    cursor: pointer;
  }
}
</style>