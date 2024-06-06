<template>
  <RouterLink
    tag="a"
    :to="{
      name: props.to
    }"
    class="group inline-flex items-center text-sm font-medium"
    :class="`${props.themeColor ? 'text-white' : 'text-white'}`"
    v-slot="{ isActive }"
  >
    <div
      class="rounded-md px-4 py-2 hover:bg-white/20"
      :class="{
        'bg-white/20': isActive
      }"
    >
      <slot></slot>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string
  themeColor?: string
}>()
</script>
