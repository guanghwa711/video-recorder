<template>
  <div class="relative flex w-full flex-col gap-2 rounded-xl border border-slate-200 p-6">
    <div class="aspect-square max-h-40 w-full shrink-0 rounded-xl bg-slate-200">
      <div :hidden="!isHiddenPlayer"  class="h-full w-full">        
        <PhImage class="h-full w-full text-slate-300" />
      </div>
      <div :hidden="isHiddenPlayer">
        <mux-player
          class="aspect-square max-h-40 w-full shrink-0 rounded-xl bg-slate-200"
          ref="muxplayer"
          :playback-id="props.videoId"
          metadata-video-title="Test video title"
          metadata-viewer-user-id="user-id-007"
        ></mux-player>
      </div>
    </div>

    <div class="text-base font-medium">
      {{ props.date }}
    </div>

    <div class="text-sm font-medium">
      <span class="text-yellow-500" v-if="props.status == 'created'">Pending</span>
      <span class="text-green-500" v-if="props.status == 'approved'">Approved</span>
      <span class="text-red-600" v-if="props.status == 'declined'">Declined</span>
    </div>

    <div class="flex items-center mt-4 justify-between">
      <div class="w-2/3">
        <div
          v-if="props.isLive"
          class="flex h-10 items-center rounded-lg justify-center bg-slate-50 text-sm text-slate-600"
        >
          <PhCheckCircle class="h-6 w-6 text-red-600" />
          <span class="ml-2 font-medium">Live video</span>
        </div>
    
        <Button @click="handleOpenLiveVideoModal" v-else :outline="true" class="w-full">
          <div class="flex items-center">
            <PhStar class="h-5 w-5 text-red-600" />
            <span class="ml-2">Make Live</span>
          </div>
        </Button>
      </div>
      <div>
        <Button @click="deleteVideoModal = true" :outline="true" class="px-1 py-0">
            <PhTrash class="h-5 w-5 text-red-600" />
        </Button>
      </div>
    </div>

    <Modal
      :show-modal="makeLiveModal"
      :show-buttons="false"
      @close="makeLiveModal = false"
    >
      <div class="space-y-2">
        <div class="text-xl font-medium">Will you make live this video?</div>

        <div class="space-y-4">
          <div class="text-sm text-slate-600">
            You can have only one live video at one time.
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button :outline="true" @click="makeLiveModal = false" class="px-4">Cancel</Button>
          <Button @click="() => makeLiveVideo(vid, userId as string)" class="px-6">Make Live</Button>
        </div>
      </div>
    </Modal>
    <Modal
      :show-modal="deleteVideoModal"
      :show-buttons="false"
      @close="deleteVideoModal = false"
    >
      <div class="space-y-2">
        <div class="text-xl font-medium">Will you delete this video?</div>

        <div class="space-y-4">
          <div class="text-sm text-slate-600">
            You can have only 3 uploaded videos. To upload a new video, please remove one first.
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button :outline="true" @click="deleteVideoModal = false" class="px-4">Cancel</Button>
          <Button @click="deleteVideo" class="px-6">Delete</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { PhStar, PhImage, PhCheckCircle, PhTrash } from '@phosphor-icons/vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue';
import { toast } from 'vue3-toastify';
import API from '@/utils/api/api';

const userId = localStorage.getItem('user_id')
const muxplayer = ref<HTMLElement | null>(null)
const makeLiveModal = ref<boolean>(false);
const deleteVideoModal = ref<boolean>(false);

const isHiddenPlayer = computed(() => {
  return props.videoId === '';
})

const emit = defineEmits<{
  (e: 'getVideoResumes'): void;
}>();

const handleOpenLiveVideoModal = () => {
  if (['created', 'declined'].includes(props.status)) {
    toast("This video has not approved yet, You can make live once the video is approved.", {
        autoClose: 3000,
        theme: "light",
        type: "error"
    });
  } else {
    makeLiveModal.value = true;
  }
}

const makeLiveVideo = (id: number, userId: string) => {
  API.makeVideoResumeLive(id, userId)
    .then(response => {
      emit('getVideoResumes');
    })
    .catch((error) => {
      console.log(error, "Error while deleting...")
      makeLiveModal.value = false
    })
}

const deleteVideo = () => {
  API.deleteVideoResume(props.vid)
    .then(response => {
      emit('getVideoResumes');
    })
    .catch((error) => {
      console.log(error, "Error while deleting...")
      deleteVideoModal.value = false
    })
}

onMounted(() => {
  if (document.getElementById('mux-player')) return; // was already loaded
  var scriptTag = document.createElement("script");
  scriptTag.src = "https://cdn.jsdelivr.net/npm/@mux/mux-player";
  scriptTag.id = "mux-player";
  document.getElementsByTagName('head')[0].appendChild(scriptTag);
})

const props = defineProps<{
  date: string
  isLive: boolean
  videoId: string
  vid: number
  status: string
}>()
</script>
