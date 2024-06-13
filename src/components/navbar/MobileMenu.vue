<template>
    <div class="absolute right-0 flex w-full justify-end">
        <Menu as="div" class="relative z-10 inline-block text-left">
            <MenuButton class="flex items-center">
                <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2" aria-controls="mobile-menu"
                    aria-expanded="false">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Open main menu</span>
                    <!-- Menu open: "hidden", Menu closed: "block" -->
                    <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <!-- Menu open: "block", Menu closed: "hidden" -->
                    <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </MenuButton>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute right-0 mt-2 w-[100vw] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div class="flex flex-col px-1 py-1">
                        <NavbarItem v-for="(otheritem, idx) in otheritems" :key="idx" :to="otheritem.to" v-if="!isAuthenticated">
                            {{ otheritem.title }}
                        </NavbarItem>
                        <NavbarItem v-for="(item, index) in items" :key="index" :to="item.to" v-else>
                            {{ item.title }}
                        </NavbarItem>
                        <button :class="'text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'"
                            @click="goToLogout" v-if="isAuthenticated">
                            <PhSignOut class="mr-2 h-5 w-5 text-red-600" />
                            Logout
                        </button>
                        <button :class="'text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'"
                            @click="goToLogin" v-else>
                            <PhSignIn class="mr-2 h-5 w-5 text-red-600" />
                            Login
                        </button>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import NavbarItem from './NavbarItem.vue';
import { PhSignOut, PhSignIn } from '@phosphor-icons/vue'
import { useAuth0 } from '@auth0/auth0-vue';
const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

const items: { title: string; to: string }[] = [
    { title: 'Recruiters', to: 'recruiter' },
    { title: 'Candidates', to: 'candidate' },
    { title: 'About us', to: 'about' },
    { title: 'Contact', to: 'contact' }
]

const otheritems: { title: string; to: string }[] = [
    { title: 'About us', to: 'about' },
    { title: 'Contact', to: 'contact' }
]

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

const props = defineProps<{
    themeColor?: string
}>()

</script>