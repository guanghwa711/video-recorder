<template>
    <div class="relative h-full">
        <div class="flex justify-center">
            
            <div class="w-[100vw] h-[100vh] overflow-hidden max-md:hidden">
                <video ref="videoEl" id="video" preload="metadata" autoplay loop muted
                    class="w-full h-full object-cover">
                    <source :src="'https://shark-app-987ih.ondigitalocean.app/uploads/LP_bg_26e69fedde.mp4'"
                        type="video/mp4" />
                </video>
            </div>

            <div class="flex flex-col md:flex-row absolute">
                <div class="flex flex-col items-center justify-center">
                    <img :src="getImgUrl(homepageContent?.recruiter_bg)" alt=""
                        class="h-[100vh] w-[100vw] xl:w-[50vw] md:hidden absolute object-cover">
                    <div
                        class="flex items-center justify-center w-[100vw] mix-blend-multiply h-[100vh] bg-red-600 opacity-80 md:w-[50vw]">
                    </div>

                    <div class="absolute gap-6 flex flex-col items-center justify-center">
                        <div class="text-center text-white text-5xl font-bold leading-[52px]">{{
                            homepageContent?.recruiter_title }}</div>
                        <button
                            class="px-6 py-2 rounded-lg text-base font-semibold leading-relaxed tracking-tight hover:bg-red-600 outline outline-1 justify-center cursor-pointer text-white items-center gap-2 inline-flex">
                            <RouterLink to="/recruiter">{{ homepageContent?.recruiter }}</RouterLink>
                        </button>
                    </div>
                </div>
                
                <div class="flex flex-col items-center justify-center">
                    <img :src="getImgUrl(homepageContent?.candidate_bg)" alt=""
                        class="h-[100vh] w-[100vw] xl:w-[50vw] md:hidden absolute object-cover" />
                    <div
                        class="flex items-center justify-center h-[100vh] w-[100vw] mix-blend-multiply bg-indigo-900 opacity-80 md:w-[50vw]">
                    </div>
                    <div class="absolute gap-6 flex flex-col items-center justify-center">
                        <div class="text-center text-white text-5xl font-bold leading-[52px]">{{
                            homepageContent?.candidate_title }}</div>
                        <button
                            class="px-6 py-2 rounded-lg outline outline-1 justify-center hover:bg-indigo-900 text-base font-semibold leading-relaxed tracking-tight cursor-pointer text-white items-center gap-2 inline-flex">
                            <RouterLink to="/candidate">{{ homepageContent?.candidate }}</RouterLink>
                        </button>
                    </div>
                </div>

                <div class="absolute flex md:hidden bottom-0 w-full items-center justify-center">
                    <div
                        class="flex flex-col sm:flex-row items-center justify-center text-center h-16 gap-2 text-xs lg:text-sm  font-medium text-white">
                        <div>
                            © 2024 Nakama Agency. All rights reserved. |
                        </div>
                        <div>
                            <RouterLink to="data-privacy">Privacy Policy</RouterLink> | <RouterLink to="terms-of-service">Terms
                                of Service</RouterLink>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="absolute w-[85%] xl:w-[90%] mt-8 px-6 py-[4px] bg-opacity-10 bg-white rounded-lg backdrop-blur-[114px] justify-between items-center inline-flex">
                <img :src="getImgUrl(homepageContent?.navbar?.logo_img)" class="cursor-pointer h-7" />
                <div class="flex flex-col sm:flex-row gap-6 p-2.5 justify-end max-md:hidden">
                    <button class="text-slate-50 text-lg font-bold leading-[27px] tracking-tight">
                        <RouterLink to="/about">{{ homepageContent?.navbar?.aboutus }}</RouterLink>
                    </button>
                    <button class="text-slate-50 text-lg font-bold leading-[27px] tracking-tight">
                        <RouterLink to="/contact">{{ homepageContent?.navbar?.contact }}</RouterLink>
                    </button>
                    <button
                        class="px-6 py-2 rounded-lg border text-white border-white justify-center items-center gap-2 inline-flex"
                        v-if="!isAuthenticated" @click="goToLogin">Login</button>
                    <button
                        class="px-6 py-2 rounded-lg border text-white border-white justify-center items-center gap-2 inline-flex"
                        v-else @click="goToLogout">Logout</button>
                </div>
                <img src="/src//assets//menu.png" alt="" class="flex gap-6 py-5 justify-end md:hidden">
            </div>
        </div>
        <div class="absolute bottom-0 hidden md:flex w-full items-center justify-center">
            <div
                class="flex flex-col sm:flex-row items-center justify-center text-center h-16 gap-2 text-xs lg:text-sm  font-medium text-white">
                <div>
                    © 2024 Nakama Agency. All rights reserved. |
                </div>
                <div>
                    <RouterLink to="data-privacy">Privacy Policy</RouterLink> | <RouterLink to="terms-of-service">Terms
                        of Service</RouterLink>
                </div>
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">
import { onMounted, ref, watchEffect, nextTick } from 'vue'
import API from '@/utils/api/api'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';
import { getStrapiObject, getImgUrl } from '@/utils/http/strapi';

const { loginWithRedirect, isAuthenticated, isLoading, logout, user } = useAuth0();
const userId = localStorage.getItem("user_id");
const homepageContent = ref<any>(null);
const videoEl = ref<HTMLVideoElement | null>(null);

const router = useRouter()

onMounted(() => {
    nextTick(() => {
        if (videoEl.value) {
            videoEl.value.addEventListener('canplaythrough', () => {
                videoEl.value?.play();
            })
        }
    })
})

onMounted(async () => {
    videoEl.value?.play()
    homepageContent.value = await getStrapiObject("home-page", ['navbar', 'recruiter_bg', 'candidate_bg', 'landing_movie'])
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
            router.push('/home')
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