<template>
  <label :for="props.name" class="text-sm text-slate-700 font-medium">
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string
}>()
</script>
