<template>
    <div class="flex justify-center">
        <div class="absolute flex items-center justify-center p-4 gap-x-96">
            <img src="../../../assets/logo.png"/>
            <div class="flex gap-20">
                <button class="text-slate-50 text-lg font-bold">Recruiter</button>
                <button class="text-slate-50 text-lg font-bold">Candidate</button>
                <button class="text-slate-50 text-lg font-bold">About us</button>
                <button class="text-slate-50 text-lg font-bold">Contact</button>
                <button class="outline-slate-50 text-slate-50 font-bold text-lg outline outline-offset-8 outline-1 w-28 rounded-sm" @click="goToLogin">Login</button>
            </div>
        </div>
        <div class="flex flex-row">
            <div class="flex items-center justify-center">
                <button class="outline-slate-50 text-slate-50 font-normal outline outline-offset-4 outline-1 text-3xl w-96 rounded-sm absolute">Recruiter</button>
                <img src="../.././../assets/1.png" alt="" class="h-[100vh] w-[50vw]">
            </div>
            <div class="flex items-center justify-center">
                <button class="outline-slate-50 text-slate-50 font-normal outline outline-offset-4 outline-1 text-3xl w-96 rounded-sm absolute">Candidate</button>
                <img src="../.././../assets/2.png" alt="" class="h-[100vh] w-[50vw]"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
const {loginWithRedirect, isAuthenticated, isLoading, logout, user} = useAuth0();
function goToLogin() {
  loginWithRedirect();
}
</script>