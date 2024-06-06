<template> 
    <div class="flex flex-col sm:flex-row items-center text-wrap justify-center h-16 gap-2 text-xs md:text-sm font-medium" :class="`${props.themeColor ? 'text-white'+ ' ' + props.themeColor  : 'text-white bg-red-600'}`">
      <div>
        © 2024 Nakama Agency. All rights reserved. | 
      </div>
      <div>
        <RouterLink to="data-privacy">Privacy Policy</RouterLink> | <RouterLink to="terms-of-service">Terms of Service</RouterLink>
      </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  themeColor?: string
}>()
</script>