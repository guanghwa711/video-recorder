<template>
  <nav :class="themeColor">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <img src="../../assets/logo.png" @click="router.push('/')" class="cursor-pointer" v-if="props.themeColor"/>
        <div v-else class="flex items-center justify-center">
          <img src="../../assets/logo1.png" @click="router.push('/')" class="cursor-pointer h-8"/>
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

          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <button
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg
                class="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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

const props = defineProps<{
  items: { title: string; to: string }[]
  themeColor?: string
}>()
</script>
