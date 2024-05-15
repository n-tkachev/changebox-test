<script setup lang="ts">
import CardEditor from './CardEditor.vue';

  // import CreateCardForm from './CreateCardForm.vue'

  const props = defineProps<{
    id?: number | null;
  }>()
</script>

<template>
  <div class="dialog">
    <div>
      <div class="dialog__header">
        <i class="material-icons" @click="$emit('close')">close</i>
      </div>
      <div class="dialog__form-wrapper">
        <CardEditor editable :id="props.id" @close="$emit('close')" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  &__header {
    i {
      cursor: pointer;
    }
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
  &__form-wrapper {
    background: black;
  }
}
</style>