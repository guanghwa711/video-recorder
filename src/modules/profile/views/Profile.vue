<template>
  <div class="h-full">
    <h1 class="text-xl">Profile settings</h1>

    <div class="mt-20" v-if="user_role == 'recruiter'">
      <Recruiter />
    </div>
    <div class="mt-20" v-if="user_role == 'candidate'">
      <Candidate />
    </div>
  </div>
</template>

<script setup lang="ts">
import Recruiter from '../components/Recruiter.vue'
import Candidate from '../components/Candidate.vue';

const user_role = localStorage.getItem('user_role')
</script>
