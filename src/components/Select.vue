<template>
    <SelectRoot v-model="selectedOption">
      <SelectTrigger
        class="w-full sm:w-[180px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9 outline-none"
        aria-label="Customise options"
      >
        <SelectValue :placeholder="placeholder" />
        <PhCaretDown />
      </SelectTrigger>
  
      <SelectPortal>
        <SelectContent
          class="w-full sm:w-[200px] bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
          :side-offset="5"
        >
          <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <PhCaretUp />
          </SelectScrollUpButton>
  
          <SelectViewport class="p-[5px]">
            <!-- <SelectLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
              Fruits
            </SelectLabel> -->
            <SelectGroup>
              <SelectItem
                v-for="(option, index) in options"
                :key="index"
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                :value="option"
              >
                <!-- <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Icon icon="radix-icons:check" />
                </SelectItemIndicator> -->
                <SelectItemText>
                  {{ option }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
  
          <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <PhCaretDown />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </template>

<script setup lang="ts">
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue';
import { ref, watchEffect } from 'vue'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'

const props = withDefaults(
  defineProps<{
    options: string[];
    placeholder: string;
  }>(),
  {
    placeholder: "Select Options..."
  }
)
const selectedOption = defineModel<string>('selected:value');
</script>
