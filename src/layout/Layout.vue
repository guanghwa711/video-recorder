<template>
  <div v-if="!isNoAuthRoute">
    <Navbar :themeColor="themeColor"/>

    <div class="py-10" style="height: calc(100% - 64px)" v-if="!isotherRoutes">
      <main v-if="isAuthenticated || isNoAuthRoute" class="mx-auto min-h-[80vh] max-w-7xl rounded-xl bg-white sm:px-6 lg:px-12 lg:py-8">
        <router-view />
      </main>
    </div>
    <div v-else class="min-h-[86.5vh]">
      <router-view />
    </div>
    <Footer :themeColor="themeColor" />
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
const { isAuthenticated, user } = useAuth0()
const router = useRouter()

if(!localStorage.getItem('access') || localStorage.getItem('access')== 'fail'){
  let sign = prompt("What's your sign?");

  if (sign.toLowerCase() === "tchiips") {
    alert("Wow! Singin Success!");
    localStorage.setItem('access', 'success')
  }
  else{
    localStorage.setItem('access', 'fail')
  }
}

const themeColor = computed(()=> {
  if(user?.value?.user_role == 'recruiter') return 'bg-red-600'
  if(user?.value?.user_role == 'candidate') return 'bg-indigo-900'
  if(user?.value?.user_role == 'admin') return 'bg-white'
})

const noAuthRoutes = ['/home'];
const otherRoutes = ['/about', '/contact', '/data-privacy', '/terms-of-service'];
const isNoAuthRoute = computed(() => noAuthRoutes.includes(router.currentRoute.value.path))
const isotherRoutes = computed(() => otherRoutes.includes(router.currentRoute.value.path))
</script>
