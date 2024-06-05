<template>
  <nav :class="themeColor">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <img src="../../assets/logo.png" @click="router.push('/')" class="cursor-pointer" v-if="props.themeColor" />
        <div v-else class="flex items-center justify-center">
          <img src="../../assets/logo1.png" @click="router.push('/')" class="cursor-pointer h-8" />
        </div>
        <div class="flex">
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-4">
            <NavbarItem v-for="(item, index) in props.items" :key="index" :to="item.to" :themeColor="props.themeColor">
              {{ item.title }}
            </NavbarItem>
          </div>

          <div class="relative hidden w-12 sm:ml-6 sm:flex sm:items-center">
            <slot></slot>
          </div>

          <div class="mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <MobileMenu :items="mobilemenuItems" :themeColor="props.themeColor" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
import NavbarItem from './NavbarItem.vue'
import MobileMenu from './MobileMenu.vue';

const mobilemenuItems = [{ name: 'Contact us' }, { name: 'About' }, { name: 'logout' }]
const props = defineProps<{
  items: { title: string; to: string }[]
  themeColor?: string
}>()
</script>
