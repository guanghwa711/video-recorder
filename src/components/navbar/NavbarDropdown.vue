<template>
  <div class="absolute right-0 flex w-full justify-end">
    <Menu as="div" class="relative z-10 inline-block text-left">
      <MenuButton class="flex items-center">
        <PhUserCircle class="h-8 w-8" weight="duotone" :class="`${props.themeColor ? 'text-white'+ ' ' + props.themeColor  : 'text-white' + ' ' + 'bg-red-600'}`" />
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-for="item in props.items" :key="item.name" v-slot="{ active }">
              <slot :name="item.name" :active="active"></slot>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PhUserCircle } from '@phosphor-icons/vue'

const props = defineProps<{
  items: { name: string }[];
  themeColor?: string;
}>()
</script>
