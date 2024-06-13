<template>
    <div class="absolute right-0 w-full flex justify-end">
        <Menu as="div" class="relative z-10 w-full flex justify-end text-left">
            <MenuButton class="flex items-center">
                <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 gap-6 py-5"
                    aria-controls="mobile-menu" aria-expanded="false">
                    <img src="/src/assets//menu.png" alt="" >
                </button>
            </MenuButton>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute right-0 top-16 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white bg-opacity-10 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div class="flex flex-col px-1 py-1">
                        <NavbarItem v-for="(item, index) in items" :key="index" :to="item.to" class="!text-white">
                            {{ item.title }}
                        </NavbarItem>
                        <button :class="'text-white group flex w-full items-center rounded-md px-2 py-2 text-sm'"
                            @click="goToLogout" v-if="isAuthenticated">
                            <PhSignOut class="mr-2 h-5 w-5 text-white" />
                            Logout
                        </button>
                        <button :class="'text-white group flex w-full items-center rounded-md px-2 py-2 text-sm'"
                            @click="goToLogin" v-else>
                            <PhSignIn class="mr-2 h-5 w-5 text-white" />
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
import NavbarItem from '@/components/navbar/NavbarItem.vue';
import { PhSignIn, PhSignOut } from '@phosphor-icons/vue'
import { useAuth0 } from '@auth0/auth0-vue';
const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

const items = [
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

</script>