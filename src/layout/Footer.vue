<template>
    <div class="flex items-center justify-center h-16 gap-2 text-xs lg:text-sm font-medium text-white" :class="props.themeColor">
        © 2024 Your Company Name. All rights reserved. | <RouterLink to="data-privacy">Privacy Policy</RouterLink> | <RouterLink to="terms-of-service">Terms of Service</RouterLink>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  themeColor?: string
}>()
</script>