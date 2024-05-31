<template>
  <TabsRoot class="flex w-full flex-col" default-value="tab1">
    <TabsList class="relative flex w-full shrink-0 border-b border-slate-200 text-xs md:text-sm  lg:text-base">
      <TabsIndicator
        class="absolute -bottom-0.5 left-0 h-0.5 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300"
      >
        <div class="h-full w-full bg-red-600" />
      </TabsIndicator>

      <TabsTrigger
        class="flex h-[45px] max-w-fit flex-1 cursor-default select-none items-center justify-center rounded-tl-md bg-white px-5 lg:px-10 font-medium leading-none text-slate-800 outline-none hover:text-red-600 focus-visible:relative data-[state=active]:text-red-600"
        v-for="tab in props.tabs"
        :key="tab.value"
        :value="tab.value"
      >
        <div class="shrink-0">{{ tab.title }}</div>
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="tab in props.tabs"
      :key="tab.value"
      class="grow rounded-b-md bg-white px-0 py-8 outline-none"
      :value="tab.value"
    >
      <slot :name="tab.value"> </slot>
    </TabsContent>
  </TabsRoot>
</template>

<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'

const props = defineProps<{
  tabs: { title: string; value: string }[]
}>()
</script>
