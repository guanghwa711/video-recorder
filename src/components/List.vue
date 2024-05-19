<script setup lang="ts">
import { ListboxContent, ListboxItem, ListboxRoot, ListboxItemIndicator } from 'radix-vue'

export interface IListItem {
  id: number;
  name: string;
}

const props = defineProps<{
  items: IListItem[]
}>()

const selectedItem = defineModel<IListItem>('item:selected')

</script>

<template>
  <ListboxRoot v-model="selectedItem">
    <ListboxContent>
      <ListboxItem v-for="item in props.items" :key="item.id" :value="item" class="w-full flex items-center px-[25px] h-[25px] leading-none text-[13px] relative text-green9 select-none outline-none data-[highlighted]:ring-green9 data-[highlighted]:ring-1 focus:ring-green9 focus:ring-1  data-[state=checked]:bg-slate-200 data-[state=checked]:text-black data-[disabled]:opacity-50 rounded-sm">
        <ListboxItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <Icon icon="radix-icons:check" />
        </ListboxItemIndicator>
        {{ item.name }}
      </ListboxItem>
    </ListboxContent>
  </ListboxRoot>
</template>