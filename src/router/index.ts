import { createRouter, createWebHistory } from 'vue-router';
import Recruiter from '@/modules/recruiter/views/Recruiter.vue';
import Candidate from '@/modules/candidate/views/Candidate.vue';
import Profile from '@/modules/profile/views/Profile.vue';
import Home from '@/modules/home/views/Home.vue';
import LoggedOut from '@/modules/loggedOut/LoggedOut.vue';
import { toast } from 'vue3-toastify';
import Admin from '@/modules/admin/views/Admin.vue';

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
            // router.push('/candidate');
          } else return true
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
            // router.push('/recruiter');
          } else return true
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
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
      // beforeEnter: (to, from) => {
      //   if (localStorage.getItem('user_role') == 'admin') {
      //     return true;
      //   } else {
      //     if (localStorage.getItem('user_id')) {
      //       toast("You don't have admin role now", {
      //           autoClose: 3000,
      //           theme: "light",
      //           type: "warning"
      //       });
      //       return false;
      //       // router.push('/recruiter');
      //     } else return true
      //   }
      // }
    }
  ]
})

export default router
