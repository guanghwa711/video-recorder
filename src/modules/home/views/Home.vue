<template>
    <div class="flex justify-center">
        <div class="absolute flex items-center justify-center p-4 gap-x-96">
            <img src="../../../assets/logo.png" class="cursor-pointer"/>
            <div class="flex gap-20">
                <button class="text-slate-50 text-lg font-bold">
                    <RouterLink to="/recruiter">Recruiter</RouterLink>
                </button>
                <button class="text-slate-50 text-lg font-bold"><RouterLink to="/candidate">
                    Candidate</RouterLink>
                </button>
                <button class="text-slate-50 text-lg font-bold">
                    <RouterLink to="/about">About us</RouterLink>
                </button>
                <button class="text-slate-50 text-lg font-bold">
                    <RouterLink to="/contact">Contact</RouterLink>
                </button>
                <button class="outline-slate-50 text-slate-50 font-bold text-lg outline outline-offset-8 outline-1 w-28 rounded-sm" v-if="!isAuthenticated" @click="goToLogin">Login</button>
                <button class="outline-slate-50 text-slate-50 font-bold text-lg outline outline-offset-8 outline-1 w-28 rounded-sm" v-else @click="goToLogout">Logout</button>
            </div>
        </div>
        <div class="flex flex-row">
            <div class="flex items-center justify-center">
                <button class="outline-slate-50 text-slate-50 font-normal outline outline-offset-4 outline-1 text-3xl w-96 rounded-sm absolute">
                    <RouterLink to="/recruiter">Recruiter</RouterLink>
                </button>
                <img src="../.././../assets/1.png" alt="" class="h-[100vh] w-[50vw]">
            </div>
            <div class="flex items-center justify-center">
                <button class="outline-slate-50 text-slate-50 font-normal outline outline-offset-4 outline-1 text-3xl w-96 rounded-sm absolute">
                    <RouterLink to="/candidate">Candidate</RouterLink>
                </button>
                <img src="../.././../assets/2.png" alt="" class="h-[100vh] w-[50vw]"/>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import API from '@/utils/api/api'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';
const {loginWithRedirect, isAuthenticated, isLoading, logout, user} = useAuth0();
const userId = localStorage.getItem("user_id");

const router = useRouter()
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
      router.push('/logged-out')
    }
  }
})

function goToLogin() {
  loginWithRedirect();
}

function goToLogout() {
  localStorage.removeItem('user_id');
  localStorage.removeItem("user_role");
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
</script>