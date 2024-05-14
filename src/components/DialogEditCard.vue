<script setup lang="ts">
  import CreateCardForm from './CreateCardForm.vue'

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
      <CreateCardForm :id="props.id" editable @close="$emit('close')" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
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
}
</style>