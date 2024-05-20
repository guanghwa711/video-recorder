<template>
    <div class="h-[80vh]">
        <Tabs :tabs="tabs" class="h-full">
            <template #tab1>
                <div class="flex px-5 h-full">
                    <!-- <div class="w-full max-w-60 space-y-3">
                        <div>Candidates</div>
                        <div class="border h-[90%]">
                            <List :items="candidateItems" v-model:item:selected="selectedCandidate" />
                        </div>
                    </div> -->
                    <div class="h-full mx-4"></div>
                    <div v-if="!isLoading && videoResumes.length > 0" class="grid grid-cols-3 gap-4 h-fit w-full">
                        <VideoResume @get-video-resume="() => getVideoResumesByStatus('created')" v-for="video in videoResumes" :vid="video.id" :key="video.id" :date="video.createdAt" :is-live="video.is_live" :video-id="video.video_id" :status="video.status" />
                    </div>
                    <div v-if="!isLoading && videoResumes.length == 0" class="m-auto font-medium text-xl text-gray-700">
                        Not found
                    </div>
                    <div class="m-auto" v-if="isLoading">
                        <Spinner />
                    </div>
                </div>
            </template>
        </Tabs>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import Tabs from '@/components/Tabs.vue'
// import List from '@/components/List.vue'
import VideoResume from '../components/VideoResume.vue'
import Spinner from '@/components/Spinner.vue'
// import type { IListItem } from '@/components/List.vue'
import API from '@/utils/api/api'

const videoResumes = ref<any[]>([])
// const candidates = ref<any[]>([])
// const candidateItems = computed(() => {
//     return candidates.value.map((candidate) => ({id: candidate.id, name: candidate.first_name + " " + candidate.last_name}))
// })
// const selectedCandidate = ref<IListItem | undefined>();
const isLoading = ref<boolean>(false);

const tabs = [
    { title: 'Videos', value: 'tab1' }
]

onMounted(() => {
    getVideoResumesByStatus("created")
})

// const getAllCandidates = () => {
//     API.getCandidates()
//     .then((response) => {
//       candidates.value = response.data
//     })
// }

const getVideoResumesByStatus = (status: string) => {
    isLoading.value = true;
    API.getVideoResumesByStatus(status as string)
        .then((response) => {
            videoResumes.value = response.data
            isLoading.value = false;
        })
        .catch((error) => {
            console.log("error while getting video resumes")
            isLoading.value = false
        })
}

// watchEffect(() => {
//     if (selectedCandidate.value) {
//         getVideoResumesByStatus("created")
//     }
// })
</script>