<script setup lang="ts">

interface Props {
  label: string,
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['onClick'])

const handleClick = () => {
  if (!props.disabled) {
    emit('onClick')
  }
}
</script>

<template>
  <div :class="['button', { 'button--disabled': props.disabled }]" class="button" @click="handleClick">{{ label }}</div>
</template>

<style scoped lang="scss">
.button {
  margin-top: 0.5rem;
  cursor: pointer;
  color: white;
  background: rgba(170, 255, 0, 0.5);
  width: fit-content;
  padding: 0.6rem;
  border-radius: 0.3rem;
  &--disabled {
    background: rgba(170, 255, 255, 0.3);
    cursor: not-allowed;
  }
}
</style>