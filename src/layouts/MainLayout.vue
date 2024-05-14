<script setup lang="ts">
import i18n from '@/i18n/i18n'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const onlanguagechange = (e: 'en' | 'ru') => {

  const routeName = route.name

  i18n.global.locale.value = e
  if (routeName) {
    router.push({ name: routeName, params: { language: e } });
  }}
</script>

<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <nav class="main-layout__nav">
        <RouterLink exact-active-class="active" :to="{ path: `/${$i18n.locale}/` }">{{ $t("message.home.tabTitle") }}</RouterLink>
        <RouterLink exact-active-class="active" :to="{ name: 'Card Create Page', params: { language: $i18n.locale } }">{{ $t("message.createCard.tabTitle") }}</RouterLink>
        <RouterLink exact-active-class="active" :to="{ name: 'Cards List Page', params: { language: $i18n.locale } }">{{ $t("message.cardsList.tabTitle") }}</RouterLink>
      </nav>
      <div class="main-layout__nav__local-changer">
        <img
          src="https://flagicons.lipis.dev/flags/4x3/ru.svg"
          :class="$i18n.locale === 'ru'
            ? 'main-layout__nav__local-changer__icon--active' 
            : 'main-layout__nav__local-changer__icon'
          "
          alt="ru"
          @click="onlanguagechange('ru')"
        >
        <img
          src="https://flagicons.lipis.dev/flags/4x3/gb.svg"
          :class="$i18n.locale === 'en'
            ? 'main-layout__nav__local-changer__icon--active' 
            : 'main-layout__nav__local-changer__icon'
          "
          alt="gb"
          @click="onlanguagechange('en')"
        >
      </div>
    </header>
    <main class="main-layout__main">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: black;
    padding: 1.3rem 2rem;
  }

  &__nav {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    a {
      transition: color 0.3s ease;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      &:hover {
        color: rgba(170, 255, 0, 0.9);
      }
    }
    &__local-changer {
      display: flex;
      flex-direction: row;
      column-gap: 1rem;
      &__icon {
        transition: all ease 0.5s;
        cursor: pointer;
        width: 1.5rem;
        filter: saturate(0);
        &--active {
          width: 1.5rem;
          filter: saturate(1);
        }
      }
    }
  }

  &__main {
    padding: 2rem;
    flex: 1;
    height: 100%;
    height: 100vh;
  }
}

.active {
  color: rgba(170, 255, 0, 0.9) !important;
}
</style>