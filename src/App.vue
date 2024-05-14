<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'

import i18n from '@/i18n/i18n';

const route = useRoute()

watch(() => route, (val) => {
  try {
    const currentRouteLocale: string = val.params.language
    const availableLocales: ('en' | 'ru')[] = i18n.global.availableLocales

    if (availableLocales.includes(currentRouteLocale)) {
      i18n.global.locale.value = currentRouteLocale
    }  
  } catch(e) {
    console.error('error in route watcher: ', e)
  }
}, { deep: true })
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>