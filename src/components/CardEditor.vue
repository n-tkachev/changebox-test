<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCardsStore } from '@/stores/cards'
import CustomTextarea from '@/components/ui/CustomTextarea.vue'
import CustomButton from '@/components/ui/CustomButton.vue'
import DynamicCardItem from '@/components/DynamicCardItem.vue'
import { useToast } from 'vue-toastification'
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const toast = useToast()

const cardsStore = useCardsStore()

const emit = defineEmits(['close'])

const props = defineProps<{
  editable?: boolean;
  id?: number | null
}>()

const loading = ref<boolean>(false)

const defaultTemplate: string = `<div style="border-radius: 0.3rem; background-color: rgba(255, 255, 255, 0.1); padding: 1rem;">
  <h3 style="margin-bottom: 1rem;">Card Title</h3>
  <img style="width: 100%" src="https://miro.medium.com/v2/resize:fit:554/0*xd39ifqJ21CXtQ4-.jpg" alt="cover" />
  <p>Some description<p>
</div>`

const templateModel = ref(``)

const saveFormData = () => {
  loading.value = true
 
  if (props.editable && props.id) {
      cardsStore.updateCardById(props.id, {
      template: templateModel.value
    })
    .then(res => {
      toast.success((t('message.createCard.successEdited')))
      emit('close')
    })
    .catch(err => toast.error((t('message.createCard.errorEdited'))))
    return
  }

  cardsStore.saveCard({
    template: templateModel.value
  })
  .then(res => {
    toast.success((t('message.createCard.successCreated')))
    loading.value = false
    templateModel.value = defaultTemplate
  })
  .catch(err => toast.error((t('message.createCard.errorCreated'))))
}

onMounted(async () => {
  debugger
  if (props.editable && props.id) {
    const result = await cardsStore.getCardById(props.id)
    if (result) {
      templateModel.value = result.template
    }
  } else {
    templateModel.value = defaultTemplate
  }
})
</script>

<template>
  <div class="card-editor">
    <div class="card-editor__wrapper">
      <div class="card-editor__wrapper__left">
        <CustomTextarea fullHeight name="editor" label="" v-model="templateModel" />
      </div>
      <div class="card-editor__wrapper__right">
        <DynamicCardItem :templateModel="templateModel" />
      </div>
    </div>
    <div class="card-editor__action">
      <CustomButton :label="$t('message.createCard.save')" @onClick="saveFormData" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-editor {
  width: fit-content;
  border-radius: 0.3rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  &__wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    &__left, &__right {
      width: 400px;
    }
  }
  &__action {
    margin-top: 1rem;
  }
}
</style>
