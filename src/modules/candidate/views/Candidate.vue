<template>
  <div>
    <Tabs :tabs="tabs">
      <template #tab1>
        <div class="space-y-6 px-10">
          <div class="grid grid-cols-3 gap-4">
            <Candidacy v-for="candidacy in candidacies" :key="candidacy.id"
              :recruiter-name="candidacy.recruiter.firstName + ' ' + candidacy.recruiter.lastName"
              :date="candidacy.createdAt" />
          </div>
        </div>
      </template>

      <template #tab2>
        <div class="space-y-6 px-10">
          <div class="flex gap-4">
            <Button @click="showVideoRecorderModal = true" :outline="true" class="w-60">
              <div class="flex items-center">
                <PhVideoCamera class="h-5 w-5 text-red-500" />
                <span class="ml-2">Record Video</span>
              </div>
            </Button>

            <VideoUploader />
          </div>

          <div class="grid grid-cols-3 gap-4">
            <Video v-for="video in videos" :key="video.id" :date="video.createdAt" :is-live="video.isLive" />
          </div>

          <Modal :show-modal="showVideoRecorderModal" :show-buttons="false" @close="showVideoRecorderModal = false" size="w-[35%]">
            <VideoRecorder />
          </Modal>

        </div>
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '@/components/Tabs.vue'
import Candidacy from '../components/Candidacy.vue'
import Video from '../components/Video.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue';
import VideoRecorder from '../components/VideoRecorder.vue'
import VideoUploader from '../components/VideoUploader.vue'
import { PhVideoCamera, PhUpload } from '@phosphor-icons/vue'

const showVideoRecorderModal = ref(false)

const tabs = [
  { title: 'My candidacies', value: 'tab1' },
  { title: 'My videos', value: 'tab2' }
]

const candidacies = [
  {
    id: 1,
    recruiter: {
      firstName: 'John',
      lastName: 'Doe'
    },
    createdAt: '24 April 2024 - 10:14 AM'
  },
  {
    id: 2,
    recruiter: {
      firstName: 'Jane',
      lastName: 'Doe'
    },
    createdAt: '24 April 2024 - 10:14 AM'
  }
]

const videos = [
  {
    id: 1,
    createdAt: 'Fri 05 April 2024 10:14 AM',
    isLive: true
  },
  {
    id: 2,
    createdAt: 'Sat 04 April 2024 10:14 AM',
    isLive: false
  },
  {
    id: 2,
    createdAt: 'Sat 04 April 2024 10:14 AM',
    isLive: false
  }
]
</script>
