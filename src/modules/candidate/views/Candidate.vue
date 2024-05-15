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

            <VideoUploader @get-video-resumes="getVideoResumes" />
          </div>

          <div v-if="!isUpLoading && videoResumes.length > 0" class="grid grid-cols-3 gap-4">
            <Video v-for="video in videoResumes" @get-video-resumes="getVideoResumes" :vid="video.id" :key="video.id" :date="video.createdAt" :is-live="video.is_live" :video-id="video.video_id" />
          </div>
          <div v-if="!isUpLoading && videoResumes.length == 0" class="m-auto font-medium text-xl text-gray-700">
            Not found
          </div>
          <div class="m-auto" v-if="isUpLoading">
            <Spinner />
          </div>

          <Modal :show-modal="showVideoRecorderModal" :show-buttons="false" @close="showVideoRecorderModal = false" size="w-[35%]">
            <VideoRecorder @get-video-resumes="getVideoResumes" v-model:is-uploading="isUpLoading" />
          </Modal>

        </div>
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tabs from '@/components/Tabs.vue'
import Candidacy from '../components/Candidacy.vue'
import Video from '../components/Video.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue';
import VideoRecorder from '../components/VideoRecorder.vue'
import VideoUploader from '../components/VideoUploader.vue'
import { PhVideoCamera } from '@phosphor-icons/vue'
import Spinner from '@/components/Spinner.vue'
import API from '@/utils/api/api'

const showVideoRecorderModal = ref(false)
const videoResumes = ref<any[]>([])
const isUpLoading = ref<boolean>(false);

onMounted(() => {
  getVideoResumes();
})

const getVideoResumes = () => {
  isUpLoading.value = true;
  API.getVideoResumesByUserId(localStorage.getItem("user_id") as string)
    .then((response) => {
      videoResumes.value = response.data.sort((a: any, b: any) => {
        if (a.is_live && !b.is_live) {
            return -1;
        }
        else if (!a.is_live && b.is_live) {
            return 1;
        }
        else {
            return 0;
        }
      })
      isUpLoading.value = false
    })
}

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
</script>
