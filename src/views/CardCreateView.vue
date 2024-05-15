<script setup lang="ts">
import { ref } from 'vue'
import CardEditor from '@/components/CardEditor.vue'

const templateModel = ref(`<div style="border-radius: 0.3rem; background-color: rgba(255, 255, 255, 0.1); padding: 1rem;">
  <h3 style="margin-bottom: 1rem;">Card Title</h3>
  <img src="https://miro.medium.com/v2/resize:fit:554/0*xd39ifqJ21CXtQ4-.jpg" alt="cover" />
  <p>Some description<p>
</div>`)
</script>

<template>
  <div class="create-card-page">
    <h2 class="create-card-page__header">{{ $t("message.createCard.header") }}</h2>

    <CardEditor />

  </div>
</template>

<style scoped lang="scss">
.create-card-page {
  &__header {
    margin-bottom: 1rem;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    &__left-column {
      :deep(textarea) {
        height: 100%;
        min-height: 100%;
        resize: vertical;
      };
      display: flex;
      flex-direction: column;
    }
  }
  .custom-button { 
    margin-top: 1rem;
  }
}
</style>