<template>
    <div class="text-center text-2xl mt-20">
        You are logged out now, Please log in again.
    </div>
    <div class="flex justify-center mt-10">
        <Button :outline="true" @click="loginWithRedirect" class="px-4">Log in</Button>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { useAuth0 } from '@auth0/auth0-vue';
const {loginWithRedirect, isAuthenticated, isLoading, logout, user} = useAuth0();
</script>