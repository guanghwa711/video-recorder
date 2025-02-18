import { createRouter, createWebHistory } from 'vue-router';
import Recruiter from '@/modules/recruiter/views/Recruiter.vue';
import Candidate from '@/modules/candidate/views/Candidate.vue';
import Home from '@/modules/home/views/Home.vue';
import LoggedOut from '@/modules/loggedOut/LoggedOut.vue';
import { toast } from 'vue3-toastify';
import Admin from '@/modules/admin/views/Admin.vue';
import About from '@/modules/about/About.vue';
import Contacts from '@/modules/contacts/Contacts.vue';
import DataPrivacy from '@/modules/data-privacy/DataPrivacy.vue'
import TermsOfService from '@/modules/terms-of-service/TermsOfService.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home'
    },
    {
      path: '/recruiter',
      name: 'recruiter',
      component: Recruiter,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('user_role') == 'recruiter') {
          return true;
        } else {
          if (localStorage.getItem('user_id')) {
            toast("You don't have recruiter role now", {
                autoClose: 3000,
                theme: "light",
                type: "warning"
            });
            return false;
          } router.push('/');
        }
      }
    },
    {
      path: '/candidate',
      name: 'candidate',
      component: Candidate,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('user_role') == 'candidate') {
          return true;
        } else {
          if (localStorage.getItem('user_id')) {
            toast("You don't have candidate role now", {
                autoClose: 3000,
                theme: "light",
                type: "warning"
            });
            return false;
          } router.push('/');
        }
      }
    },
    {
      path: '/logged-out',
      name: 'LoggedOut',
      component: LoggedOut
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('user_role') == 'admin') {
          return true;
        } else {
          if (localStorage.getItem('user_id')) {
            toast("You don't have admin role now", {
                autoClose: 3000,
                theme: "light",
                type: "warning"
            });
            return false;
          } router.push('/');
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contacts
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: TermsOfService
    },
    {
      path: '/data-privacy',
      name: 'data-privacy',
      component: DataPrivacy
    },
  ]
})

export default router
