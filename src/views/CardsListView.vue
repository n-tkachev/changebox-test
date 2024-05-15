<script setup lang="ts">
import { ref } from 'vue'
import { useCardsStore } from '@/stores/cards'
import { onMounted } from 'vue'
import DialogEditCard from '@/components/DialogEditCard.vue'
import DynamicCardItem from '@/components/DynamicCardItem.vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const toast = useToast()

const cardsStore = useCardsStore()

const isShownEditCardDialog = ref<boolean>(false)
const idToEdit = ref<number | null>(null)

onMounted(async () => {
  await cardsStore.openDB()
  await cardsStore.getAllCards()
})

const onDelete = (e: number | undefined) => {
  if (e !== undefined) {
    cardsStore.deleteCard(e)
      .then(() => {
        return cardsStore.getAllCards()
      })
      .then(() => {
        toast.success((t('message.createCard.successDeleted')))
      })
      .catch(err => toast.error((t('message.createCard.errorDeleted'))))
  }
}

const onEdit = (e: number | undefined) => {
  if (e !== undefined) {
    isShownEditCardDialog.value = true
    idToEdit.value = e
  }
}

</script>

<template>
  <div>
    <DialogEditCard :id="idToEdit" v-if="isShownEditCardDialog" @close="isShownEditCardDialog = false" />

    <h2>{{ $t("message.cardsList.header") }}</h2>
  
    <div class="cards-list">
      <div class="cards-list__card-wrapper" v-for="[key, card] in Object.entries(cardsStore.cards)" :key="key">
        <div class="cards-list__card-wrapper__actions">
          <i class="icon-edit material-icons" @click="onEdit(card.id)">edit</i>
          <i class="icon-delete material-icons" @click="onDelete(card.id)">delete</i>
        </div>
        <DynamicCardItem
          :templateModel="card.template"
          @deleted="cardsStore.getAllCards"
          @edit="onEdit"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards-list {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  &__card-wrapper {
    position: relative;
    &__actions {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      position: absolute;
      padding: 1rem;
      top: 0;
      right: 0;
      .icon-edit {
        transition: color 0.2s ease-in-out;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.3);
        &:hover {
          color: rgba(255, 165, 0, 0.8);
        }
      }
      .icon-delete {
        transition: color 0.2s ease-in-out;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.3);
        &:hover {
          color: rgba(255, 0, 0, 0.8);
        }
      }
    }
  }
}
</style>