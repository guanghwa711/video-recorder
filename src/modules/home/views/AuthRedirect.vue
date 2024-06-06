<template>
    <div>

    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
import { useAuth0 } from '@auth0/auth0-vue';
const { user } = useAuth0();

onMounted(async () => {
    if (['/recruiter', '/candidate', '/admin'].includes(router.currentRoute.value.path)) {
        const userRole = user?.value?.user_role

        if (userRole) {
            handeRouteByUserRole(userRole);
        }
    }
    else router.push(router.currentRoute.value.path)
})

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