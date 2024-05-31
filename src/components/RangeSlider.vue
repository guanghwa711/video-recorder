<template>
    <SliderRoot
      v-model="sliderValue" :default-value="[20, 80]" :min-steps-between-thumbs="1" class="relative flex items-center select-none touch-none w-[180px] h-5" :max="100"
      :step="10"
    >
      <SliderTrack class="bg-slate-300 relative grow rounded-full h-[3px]">
        <SliderRange class="absolute bg-red-600 rounded-full h-full" />
      </SliderTrack>
      <SliderThumb
        class="block w-5 h-5 bg-red-600 shadow-[0_2px_2px] shadow-red-600 rounded-[10px] hover:bg-red-600 focus:outline-none"
        aria-label="Volume"
      />
      <SliderThumb
        class="block w-5 h-5 bg-red-600 shadow-[0_2px_2px] shadow-red-600 rounded-[10px] hover:bg-red-600 focus:outline-none"
        aria-label="Volume"
      />
    </SliderRoot>
  </template>

<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'

const sliderValue = defineModel<number[]>('value')
</script>