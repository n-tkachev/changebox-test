<script setup lang="ts">
import { ref } from 'vue'
import { useCardsStore } from '@/stores/cards'
import { onMounted } from 'vue'
import DialogEditCard from '@/components/DialogEditCard.vue'
import CardItem from '@/components/CardItem.vue'

const cardsStore = useCardsStore()

const isShownEditCardDialog = ref<boolean>(false)
const idToEdit = ref<number | null>(null)

onMounted(async () => {
  await cardsStore.openDB()
  await cardsStore.getAllCards()
})

const onEdit = (e: number) => {
  isShownEditCardDialog.value = true
  idToEdit.value = e
}
</script>

<template>
  <div>
    <DialogEditCard :id="idToEdit" v-if="isShownEditCardDialog" @close="isShownEditCardDialog = false" />

    <h2>{{ $t("message.cardsList.header") }}</h2>
  
    <div class="cards-list">
      <CardItem
      v-for="[key, card] in Object.entries(cardsStore.cards)"
      :card="card"
      :key="key"
      @deleted="cardsStore.getAllCards"
      @edit="onEdit"
    />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards-list {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>