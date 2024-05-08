<template>
  <Navbar :items="navbarItems">
    <NavbarDropdown :items="navbarDropdownItems">
      <template #profile="{ active }">
        <button
          :class="[
            active ? 'bg-slate-100' : 'text-gray-900',
            'group flex w-full items-center rounded-md px-2 py-2 text-sm'
          ]"
          @click="goToProfile"
        >
          <PhUserCircle class="mr-2 h-5 w-5 text-primary-500" />
          Profile
        </button>
      </template>

      /* BEGIN ALEX TEMPORARY CODE
      ////////////////////////////
      ///// MAKE SURE TO REFACTOR THIS WHOE FILE FOR AUTH0
      ////////////////////////////
      */
      <template #login="{ active }">
        <button
          :class="[
            active ? 'bg-slate-100' : 'text-gray-900',
            'group flex w-full items-center rounded-md px-2 py-2 text-sm'
          ]"
          @click="goToLogin"
        >
          <PhSignIn class="mr-2 h-5 w-5 text-primary-500" />
          Login
        </button>
      </template>

      /* END ALEX TEMPORARY CODE
      //////////////////////////
      */

      <template #logout="{ active }">
        <button
          :class="[
            active ? 'bg-slate-100' : 'text-gray-900',
            'group flex w-full items-center rounded-md px-2 py-2 text-sm'
          ]"
        >
          <PhSignOut class="mr-2 h-5 w-5 text-primary-500" />
          Logout
        </button>
      </template>
    </NavbarDropdown>
  </Navbar>
</template>

<script setup lang="ts">
import Navbar from '@/components/navbar/Navbar.vue'
import NavbarDropdown from '@/components/navbar/NavbarDropdown.vue'

import { PhUserCircle, PhSignOut, PhSignIn } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';
const auth0 = useAuth0();

const router = useRouter()

const navbarItems = [
  { title: 'Recruiters', to: 'recruiter' },
  { title: 'Candidates', to: 'candidate' },
  { title: 'About us', to: 'home' },
  { title: 'Contact', to: 'home' }
]

const navbarDropdownItems = [{ name: 'profile' }, { name: 'login' }, { name: 'logout' }]

function goToProfile() {
  router.push({
    name: 'profile'
  })
}

function goToLogin() {
  auth0.loginWithRedirect();
}

function goToLogout() {
  auth0.logout({ 
    logoutParams: { 
      returnTo: window.location.origin 
     } 
  });
}
  
</script>
