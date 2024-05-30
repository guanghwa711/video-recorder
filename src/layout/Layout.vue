<template>
  <div v-if="!isNoAuthRoute">
    <Navbar />

    <div class="py-10" style="height: calc(100% - 64px)" v-if="!isotherRoutes">
      <main v-if="isAuthenticated || isNoAuthRoute" class="mx-auto min-h-[80vh] max-w-7xl rounded-xl bg-white sm:px-6 lg:px-12 lg:py-8">
        <router-view />
      </main>
    </div>
    <div v-else class="min-h-[783px]">
      <router-view />
    </div>
    <Footer />
  </div>
  <div v-else>
    <Home/>
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import { useRouter } from 'vue-router'
import Home from '@/modules/home/views/Home.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { computed } from 'vue';
const { isAuthenticated } = useAuth0()
const router = useRouter()

const noAuthRoutes = ['/home', '/logged-out'];
const otherRoutes = ['/about', '/contact', '/data-privacy', '/terms-of-service'];
const isNoAuthRoute = computed(() => noAuthRoutes.includes(router.currentRoute.value.path))
const isotherRoutes = computed(() => otherRoutes.includes(router.currentRoute.value.path))
</script>
