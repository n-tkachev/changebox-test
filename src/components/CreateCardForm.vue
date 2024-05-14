<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import CustomInput from '@/components/ui/CustomInput.vue'
import CustomTextarea from '@/components/ui/CustomTextarea.vue'
import CustomButton from '@/components/ui/CustomButton.vue'
import { useCardsStore } from '@/stores/cards'
import type { CardData } from '@/interfaces/interfaces'
import { fileToBase64 } from '@/utils/utils'

const emit = defineEmits(['close'])

const props = defineProps<{
  editable?: boolean;
  id?: number | null
}>()

const cardsStore = useCardsStore()

const loading = ref<boolean>(false)

const formData = reactive<CardData>({
  title: '',
  description: '',
  image: ''
})

const filePicker = ref()

const onClickedFilePicker = () => {
  if (filePicker.value) {
    filePicker.value.click()
  }
}

const handleImageChange = (event: Event) => {
  try {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      fileToBase64(target.files[0], (res: string) => {
        formData.image = res
      })
    }
  } catch (e) {}
}

const resetForm = () => {
  formData.image = ''
  formData.description = ''
  formData.title = ''
}

const saveFormData = () => {
  loading.value = true
 
  if (props.editable && props.id) {
      cardsStore.updateCardById(props.id, {
      title: formData.title,
      description: formData.description,
      image: formData.image
    })
    .then(res => {
      emit('close')
    })
    return
  }

  cardsStore.saveCard({
    title: formData.title,
    description: formData.description,
    image: formData.image
  })
  .then(res => {
    loading.value = false
    resetForm()
  })
}

onMounted(async () => {
  if (props.editable && props.id) {
    const result = await cardsStore.getCardById(props.id)
    if (result) {
      formData.title = result.title
      formData.description = result.description
      formData.image = result.image
    }
  }
})
</script>

<template>
  <div class="create-card-form">
    <CustomInput full-width :label="$t('message.createCard.title')" name="title" v-model="formData.title" />
    <CustomTextarea full-width :label="$t('message.createCard.title')" name="title" v-model="formData.description" />

    <input v-show="false" ref="filePicker" type="file" accept="image/*" @change="handleImageChange">

    <CustomButton :label="$t('message.createCard.selectImage')" @onClick="onClickedFilePicker" />

    <img v-if="formData.image" class="create-card-form__image-preview" :src="formData.image" alt="Uploaded Image" style="max-width: 100%; height: auto;">

    <CustomButton :disabled="loading" :label="$t('message.createCard.save')" @onClick="saveFormData" />
  </div>
</template>

<style scoped lang="scss">
.create-card-form {
  display: flex;
  width: 300px;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.3rem;
  background: rgba(255, 255, 255, 0.1);
  &__image-preview {
    width: 100%;
    height: auto;
    margin-top: 0.5rem;
  }
}
</style>