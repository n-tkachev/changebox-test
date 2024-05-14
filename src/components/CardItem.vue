<script setup lang="ts">
import { useCardsStore } from '@/stores/cards'
import type { CardData } from '@/interfaces/interfaces'

const cardsStore = useCardsStore()

const emit = defineEmits(['deleted', 'edit'])

const props = defineProps<{
  card: CardData;
}>() as { card: CardData }

const onDelete = () => {
  if (props.card.id !== undefined) {
    cardsStore.deleteCard(props.card.id)
      .then(() => {
        emit('deleted')
      })
  } else {
    console.error('Card id is undefined')
  }
}

const onEdit = () => {
  emit('edit', props.card.id)
}
</script>

<template>
  <div class="card-item">
    <div class="card-item__header">
      <h3>{{ props.card.title }}</h3>
      <div class="card-item__header__icons">
        <div class="card-item__header__icons__icon">
          <i class="material-icons" @click="onEdit">edit</i>
        </div>
        <div class="card-item__header__icons__icon">
          <i class="material-icons" @click="onDelete">delete</i>
        </div>
      </div>
    </div>
    <p>{{ props.card.description }}</p>
    <img v-if="props.card.image" :src="props.card.image" alt="cover" style="max-width: 100%; height: auto;">
  </div>
</template>

<style scoped lang="scss">
.card-item {
  border-radius: 0.3rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-weight: bold;
    }
    &__icons {
      display: flex;
      flex-direction: row;
      column-gap: 1rem;
      &__icon {
        cursor: pointer;
        :deep(i) {
          transition: color 0.2s ease-in-out;
          &:hover {
            color: rgba(170, 255, 0, 0.8);
          }
        }
      }
    }
  }
  img {
    margin-top: 1rem;
  }
}
</style>
