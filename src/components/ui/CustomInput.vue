<template>
  <label>
    <div>{{ label }}</div>
    <input v-if="!props.textarea" :class="{ 'full-width': fullWidth }" type="text" :name="name" v-model="model">
    <textarea v-else class="custom-textarea" type="text" :name="name" v-model="model" />
  </label>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

interface Props {
  label: string;
  name: string;
  fullWidth: boolean;
  textarea?: boolean;
}

const model = defineModel({ type: String })

const emit = defineEmits(['update:modelValue'])

const props = defineProps<Props>();

</script>

<style scoped lang="scss">
input, textarea {
  background-color: black;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.8rem;
  border-radius: 0.3rem;
  &:focus {
    outline: 2px solid  rgba(170, 255, 0, 0.5);
  }
}

textarea {
  max-width: 100%;
  width: 100%;
  resize: vertical;
  min-height: 100px;
}
</style>
