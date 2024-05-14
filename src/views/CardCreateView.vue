<script setup lang="ts">
import CreateCardForm from '@/components/CreateCardForm.vue'
</script>

<template>
  <div class="create-card-page">
    <h2 class="create-card-page__header">{{ $t("message.createCard.header") }}</h2>

    <CreateCardForm />

  </div>
</template>

<style scoped lang="scss">
.create-card-page {
  &__header {
    margin-bottom: 1rem;
  }
}
</style>