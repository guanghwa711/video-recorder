<template>
  <div>
    <Tabs :tabs="tabs">
      <template #tab1>
        <!-- <div v-if="profilestatus.valueOf() == true">
          <ProfileEdit @get-status="changeStatus"/>
        </div>
        <div v-else>
          <Profile @get-status="changeStatus"/>
        </div> -->
        <Profile/>
      </template>
      
      <template #tab2>
        <div class="space-y-6 px-10">
          <div class="grid grid-cols-3 gap-4">
            <Candidacy v-for="candidacy in candidacies" :key="candidacy.id"
              :recruiter-name="candidacy.recruiter.first_name + ' ' + candidacy.recruiter.last_name"
              :date="candidacy.createdAt"
              :recruiter-id="candidacy.recruiter.id"
              :status="candidacy.status"
              :preposition_text="candidacy?.preposition_text"
              @get-candidacies="getCandidacies"
            />
          </div>
        </div>
      </template>

      <template #tab3>
        <div class="space-y-6 px-10">
          <div class="flex gap-4">
            <Button @click="handleClickRecordVideo" :outline="true" class="w-60">
              <div class="flex items-center">
                <PhVideoCamera class="h-5 w-5 text-red-500" />
                <span class="ml-2">Record Video</span>
              </div>
            </Button>

            <VideoUploader :uploaded-video-count="videoResumes.length" @get-video-resumes="getVideoResumes" />
          </div>

          <div v-if="!isUpLoading && videoResumes.length > 0" class="grid grid-cols-3 gap-4">
            <Video v-for="video in videoResumes" @get-video-resumes="getVideoResumes" :vid="video.id" :key="video.id" :date="video.createdAt" :is-live="video.is_live" :video-id="video.video_id" :status="video.status" />
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
import Modal from '@/components/Modal.vue'
import VideoRecorder from '../components/VideoRecorder.vue'
import VideoUploader from '../components/VideoUploader.vue'
import Profile from '../../profile/components/Candidate.vue'
import { PhVideoCamera } from '@phosphor-icons/vue'
import Spinner from '@/components/Spinner.vue'
import { toast } from 'vue3-toastify'
import API from '@/utils/api/api'

const showVideoRecorderModal = ref(false)
const videoResumes = ref<any[]>([])
const candidacies = ref<any[]>([])
const isUpLoading = ref<boolean>(false);
const userId = localStorage.getItem("user_id");
// const profilestatus = ref(false)

// const changeStatus = () => {
//   profilestatus.value = !profilestatus.value
// }

const tabs = [
  { title: 'My profile', value: 'tab1' },
  { title: 'My candidacies', value: 'tab2' },
  { title: 'My videos', value: 'tab3' },
]

onMounted(() => {
  getVideoResumes();
  getCandidacies();
})

const getVideoResumes = () => {
  isUpLoading.value = true;
  API.getVideoResumesByUserId(Number(localStorage.getItem("user_id")))
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

const getCandidacies = () => {
  API.getCandidacies({user_id: userId})
    .then(response => {
      candidacies.value = response.data
    })
}

const handleClickRecordVideo = () => {
  if (videoResumes.value.length >= 3) {
    toast("You have already 3 upladed videos, To upload a new video, please remove one first.", {
        autoClose: 3000,
        theme: "light",
        type: "warning"
    });
  } else {
    showVideoRecorderModal.value = true;
  }
}
</script>
