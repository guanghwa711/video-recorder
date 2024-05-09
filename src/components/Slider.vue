<template>
    <SliderRoot
      v-model="sliderValue" class="relative flex items-center select-none touch-none w-[180px] h-5" :max="100"
      :step="10"
    >
      <SliderTrack class="bg-red-500 relative grow rounded-full h-[3px]">
        <SliderRange class="absolute bg-red-500 rounded-full h-full" />
      </SliderTrack>
      <SliderThumb
        class="block w-5 h-5 bg-red-500 shadow-[0_2px_2px] shadow-red-500 rounded-[10px] hover:bg-red-500 focus:outline-none"
        aria-label="Volume"
      />
    </SliderRoot>
  </template>

<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'

const sliderValue = defineModel<number[]>('value')
</script>