<template>
    <div class="relative">
        <div class="flex justify-center">
            <div class="absolute flex items-center justify-center p-4 gap-x-10 xl:gap-x-72 lg:gap-x-72 md:gap-x-48">
                <img :src="getImgUrl(homepageContent?.navbar?.logo_img)"
                    class="cursor-pointer w-14 xl:w-40 lg:w-28 md:w-16" />
                <div class="flex gap-5 xl:gap-20 lg:gap-15 md:gap-10">
                    <button class="text-slate-50 text-xs xl:text-lg lg:text-base md:text-sm font-bold">
                        <RouterLink to="/recruiter">{{ homepageContent?.navbar?.recruiter }}</RouterLink>
                    </button>
                    <button class="text-slate-50 text-xs xl:text-lg lg:text-base md:text-sm font-bold">
                        <RouterLink to="/candidate">
                            {{ homepageContent?.navbar?.candidate }}</RouterLink>
                    </button>
                    <button class="text-slate-50 text-xs xl:text-lg lg:text-base md:text-sm  font-bold">
                        <RouterLink to="/about">{{ homepageContent?.navbar?.aboutus }}</RouterLink>
                    </button>
                    <button class="text-slate-50 text-xs xl:text-lg lg:text-base md:text-sm font-bold">
                        <RouterLink to="/contact">{{ homepageContent?.navbar?.contact }}</RouterLink>
                    </button>
                    <button
                        class="outline-slate-50 text-slate-50 font-bold text-xs xl:text-lg lg:text-base md:text-sm outline outline-offset-8 outline-1 w-14 xl:w-28 lg:w-20 md:w-16 rounded-sm"
                        v-if="!isAuthenticated" @click="goToLogin">Login</button>
                    <button
                        class="outline-slate-50 text-slate-50 font-bold text-xs xl:text-lg lg:text-base md:text-sm outline outline-offset-8 outline-1 w-14 xl:w-28 lg:w-20 md:w-16 rounded-sm"
                        v-else @click="goToLogout">Logout</button>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row">
                <div class="flex items-center justify-center">
                    <button
                        class="outline-slate-50 text-slate-50 font-normal outline outline-offset-4 outline-1 text-2xl xl:text-3xl w-80 xl:w-96 rounded-sm absolute">
                        <RouterLink to="/recruiter">{{ homepageContent?.recruiter }}</RouterLink>
                    </button>
                    <img :src="getImgUrl(homepageContent?.recruiter_bg)" alt="" class="h-[100vh] w-[100vw] xl:w-[50vw]">
                </div>
                <div class="flex items-center justify-center">
                    <button
                        class="outline-slate-50 text-slate-50 font-normal outline outline-offset-4 outline-1 text-2xl xl:text-3xl w-80 xl:w-96 rounded-sm absolute">
                        <RouterLink to="/candidate">{{ homepageContent?.candidate }}</RouterLink>
                    </button>
                    <img :src="getImgUrl(homepageContent?.candidate_bg)" alt=""
                        class="h-[100vh] w-[100vw] xl:w-[50vw]" />
                </div>
            </div>
        </div>
        <div class="relative flex items-center justify-center">
            <div
                class="flex absolute items-center justify-center text-center h-16 gap-2 text-xs lg:text-sm  font-medium bottom-0 text-white">
                © 2024 Your Company Name. All rights reserved. | <RouterLink to="data-privacy">Privacy Policy
                </RouterLink> |
                <RouterLink to="terms-of-service">Terms of Service</RouterLink>
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import API from '@/utils/api/api'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';
import { getStrapiObject, getImgUrl } from '@/utils/http/strapi';

const { loginWithRedirect, isAuthenticated, isLoading, logout, user } = useAuth0();
const userId = localStorage.getItem("user_id");
const homepageContent = ref<any>(null);

const router = useRouter()
onMounted(async () => {
    homepageContent.value = await getStrapiObject("home-page", ['navbar', 'recruiter_bg', 'candidate_bg'])
    if (['/recruiter', '/candidate', '/admin'].includes(router.currentRoute.value.path)) {
        const userRole = localStorage.getItem('user_role')

        if (userRole) {
            handeRouteByUserRole(userRole);
        }
    }
})

watchEffect(() => {
    if (!isLoading.value) {
        if (isAuthenticated.value) {
            if (!userId) {
                API.handleUserLoginSignUp({
                    email: user.value?.email,
                    first_name: user.value?.first_name,
                    last_name: user.value?.last_name,
                    user_type: user.value?.user_role,
                    sub: user.value?.sub
                })
                    .then((response) => {
                        localStorage.setItem("user_id", response.data?.id);
                        if (response.data?.is_admin) {
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