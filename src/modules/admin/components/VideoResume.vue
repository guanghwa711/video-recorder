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
  
      <div class="flex items-center mt-2 gap-x-2">
        <div class="flex w-full gap-2">
          <Button :outline="true" class="w-full max-w-52 text-red-600 disabled:!bg-gray-300 disabled:!text-gray-600 disabled:!border-gray-300" @click="showApproveModal = true" :disabled="status == 'approved'">
            <div class="flex items-center">
              <PhCheck class="h-5 w-5" />
              <span class="ml-2">{{status == "approved" ? "Approved" : "Approve"}}</span>
            </div>
          </Button>

          <Button
            :outline="true"
            class="w-full max-w-52 !border-slate-500 !text-slate-500 disabled:!bg-gray-300 disabled:!text-gray-600 disabled:!border-gray-300"
            @click="showDeclineModal = true"
            :disabled="status == 'declined'"
          >
            <div class="flex items-center">
              <PhX class="h-5 w-5" />
              <span class="ml-2">{{status == "declined" ? "Declined" : "Decline"}}</span>
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
        :show-modal="showApproveModal"
        :show-buttons="false"
        @close="showApproveModal = false"
      >
        <div class="space-y-2">
          <div class="text-xl font-medium">Will you make aprove this video?</div>
  
          <div class="space-y-4">
            <div class="text-sm text-slate-600">
              Once you approve the video, the user can use make it live.
            </div>
          </div>
  
          <div class="flex justify-end gap-2 pt-2">
            <Button :outline="true" @click="showApproveModal = false" class="px-4">Cancel</Button>
            <Button @click="() => updateVideoStatus('approved')" class="px-6">Approve</Button>
          </div>
        </div>
      </Modal>
      <Modal
        :show-modal="showDeclineModal"
        :show-buttons="false"
        @close="showDeclineModal = false"
      >
        <div class="space-y-2">
          <div class="text-xl font-medium">Will you make decline this video?</div>
  
          <div class="space-y-4">
            <div class="text-sm text-slate-600">
              Once you decline the video, the user can't use make it live.
            </div>
          </div>
  
          <div class="flex justify-end gap-2 pt-2">
            <Button :outline="true" @click="showDeclineModal = false" class="px-4">Cancel</Button>
            <Button @click="() => updateVideoStatus('declined')" class="px-6">Decline</Button>
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
  import { PhImage, PhTrash, PhCheck, PhX } from '@phosphor-icons/vue'
  import Button from '@/components/Button.vue'
  import Modal from '@/components/Modal.vue';
  import API from '@/utils/api/api';
  
  const muxplayer = ref<HTMLElement | null>(null)
  const showApproveModal = ref<boolean>(false);
  const showDeclineModal = ref<boolean>(false);
  const deleteVideoModal = ref<boolean>(false);
  
  const isHiddenPlayer = computed(() => {
    return props.videoId === '';
  })
  
  const emit = defineEmits<{
    (e: 'getVideoResume'): void;
  }>();
  
  const deleteVideo = () => {
    API.deleteVideoResume(props.vid)
      .then(response => {
        deleteVideoModal.value = false;
        emit('getVideoResume');
      })
  }

  const updateVideoStatus = (status: string) => {
    API.updateVideoResumeStatus(props.vid, status)
      .then((response) => {
        showApproveModal.value = false;
        showDeclineModal.value = false;
        emit('getVideoResume');
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
  