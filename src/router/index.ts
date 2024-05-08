import { createRouter, createWebHistory } from 'vue-router';
import Recruiter from '@/modules/recruiter/views/Recruiter.vue';
import Candidate from '@/modules/candidate/views/Candidate.vue';
import Profile from '@/modules/profile/views/Profile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/recruiter'
    },
    {
      path: '/recruiter',
      name: 'recruiter',
      component: Recruiter
    },
    {
      path: '/candidate',
      name: 'candidate',
      component: Candidate
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }, /*
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    } */
  ]
})

export default router
