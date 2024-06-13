<template>
  <Navbar :items="navbarItems" :themeColor="themeColor">
    <NavbarDropdown :items="navbarDropdownItems" :themeColor="themeColor">
      <!-- <template #profile="{ active }">
        <button
          :class="[
            active ? 'bg-slate-100' : 'text-gray-900',
            'group flex w-full items-center rounded-md px-2 py-2 text-sm'
          ]"
          @click="goToProfile"
        >
          <PhUserCircle class="mr-2 h-5 w-5 text-red-600" />
          Profile
        </button>
      </template> -->

      /* BEGIN ALEX TEMPORARY CODE
      ////////////////////////////
      ///// MAKE SURE TO REFACTOR THIS WHOE FILE FOR AUTH0
      ////////////////////////////
      */
      <template #login="{ active }">
        <div v-if="!isAuthenticated">
          <button
            :class="[
              active ? 'bg-slate-100' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm'
            ]"
              @click="goToLogin"
            >
            <PhSignIn class="mr-2 h-5 w-5 text-red-600" />
            Login
          </button>
        </div>
        <div v-else></div>
      </template>

      /* END ALEX TEMPORARY CODE
      //////////////////////////
      */

      <template #logout="{ active }">
        <div v-if="isAuthenticated">
          <button
            :class="[
              active ? 'bg-slate-100' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm'
            ]"
            @click="goToLogout"
          >
          <PhSignOut class="mr-2 h-5 w-5 text-red-600" />
            Logout
          </button>
        </div>
        <div v-else></div>
      </template>
    </NavbarDropdown>
  </Navbar>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'
import NavbarDropdown from '@/components/navbar/NavbarDropdown.vue'
import API from '@/utils/api/api'
import { PhSignOut, PhSignIn } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';
const {loginWithRedirect, isAuthenticated, isLoading, logout, user} = useAuth0();
const userId = localStorage.getItem("user_id");

const router = useRouter()

const navbarItems = [
  { title: 'Recruiters', to: 'recruiter' },
  { title: 'Candidates', to: 'candidate' },
  { title: 'About us', to: 'about' },
  { title: 'Contact', to: 'contact' }
]

const navbarDropdownItems = [{ name: 'login' }, { name: 'logout' }]

onMounted(() => {
  if(['/recruiter', '/candidate', '/admin'].includes(router.currentRoute.value.path)) {
    const userRole = localStorage.getItem('user_role')
    
    if(userRole) {
      handeRouteByUserRole(userRole);
    }
  }
})

watchEffect(() => {
  if (!isLoading.value) {
    if (isAuthenticated.value) {
      if(!userId) {
        API.handleUserLoginSignUp({
          email: user.value?.email,
          first_name: user.value?.first_name,
          last_name: user.value?.last_name,
          user_type: user.value?.user_role, 
          sub: user.value?.sub
        })
        .then((response) => {
          localStorage.setItem("user_id", response.data?.id);
          if(response.data?.is_admin) {
            localStorage.setItem("user_role", 'admin');
            handeRouteByUserRole('admin')
          }
          else {
            localStorage.setItem("user_role", user.value?.user_role);
            handeRouteByUserRole(user.value?.user_role)
          }
        })
        .catch(error => {
          console.log(error, "User creation failed")
        })
      }
    } else {
      if(['/about', '/contact', '/data-privacy', '/terms-of-service'].includes(router.currentRoute.value.path)) {
        router.push(router.currentRoute.value.path)
      }
      else router.push('/home')
    }
  }
})

function goToProfile() {
  router.push({
    name: 'profile'
  })
}

function goToLogin() {
  loginWithRedirect();
}

function goToLogout() {
  localStorage.removeItem('user_id');
  localStorage.removeItem("user_role");
  localStorage.removeItem("access");
  logout({ 
    logoutParams: { 
      returnTo: window.location.origin 
    } 
  });
}

const handeRouteByUserRole = (userRole: string) => {
  if (userRole == 'recruiter') {
    router.push('/recruiter');
  }
  if (userRole == 'candidate') {
    router.push('/candidate');
  }
  if (userRole == 'admin') {
    router.push('/admin');
  }
}
const props = defineProps<{
  themeColor?: string
}>()

</script>
