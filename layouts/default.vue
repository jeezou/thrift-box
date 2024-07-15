<template>
  <div class="default-layout">
    <header class="header">
      <nuxt-link 
        to="/"
        class="header__link"
      >
        Главная
      </nuxt-link>

      <nuxt-link 
        to="/admin"
        class="header__link"
      >
        Админ
      </nuxt-link>

      <nuxt-link 
        to="/login"
        class="header__link"
      >
        Логин
      </nuxt-link>
    </header>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 32px;
}

.header {
  margin-bottom: 48px;
  padding: 0 0 32px;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  display: flex;
  column-gap: 24px;

  &__link {
    cursor: pointer;
    color: #242524;
    text-decoration: none;
    font-size: 20px;
  }
}
</style>