<template>
  <div v-if="candidateId && videoId" class="justify-start items-start gap-4 flex sm:flex-row flex-col">
    <div class="w-[300px] sm:w-[250px] h-[250px] relative bg-white">
      <mux-player class="w-[300px] sm:w-[250px] h-[250px] rounded-2xl" ref="muxplayer" @click="handlePlayModal = true"
        metadata-video-title="Test video title" metadata-viewer-user-id="user-id-007"></mux-player>
    </div>

    <div class="flex h-full w-full flex-col gap-4">
      <div @click="showUserInfoModal = true">
        <div class="text-[34px] font-bold text-slate-900 text-center sm:text-start">{{ props.firstName }} {{
          props.lastName }}</div>

        <div class="w-full rounded-lg text-base font-normal text-slate-600">
          {{ props.bio || "This candidate has not bio yet." }}
        </div>
      </div>
      <div v-if="!props.propositionDate" class="flex w-full gap-5">
        <Button :outline="true"
          class="w-[218px] h-[43px] px-[22px] py-2 rounded flex-col justify-center items-center inline-flex"
          @click="showPropositionModal = true">
          <div class="justify-center items-center gap-2 inline-flex">
            <!-- <PhPaperPlaneTilt class="h-5 w-5 text-red-600 cursor-pointer" /> -->
            <span class="text-red-600 text-lg font-bold leading-[27px] tracking-tight">Send proposition</span>
          </div>
        </Button>
        <!-- <Button :outline="true" class="w-full max-w-32 xl:max-w-52 md:max-w-40"@click="showPropositionModal = true"> -->
        <div class="flex items-center" @click="showShortlistModal = true">
          <PhThumbsUp class="h-5 w-5 text-slate-600 cursor-pointer" />
          <!-- <span class="ml-2 text-xs lg:text-sm">Shortlist</span> -->
        </div>
        <!-- </Button> -->
        <!-- <Button :outline="true" class="w-full max-w-32 xl:max-w-52 md:max-w-40" @click="showNotinteresetedModal = true"> -->
        <div class="flex items-center" @click="showNotinteresetedModal = true">
          <PhThumbsDown class="h-5 w-5 text-slate-600 cursor-pointer" />
          <!-- <span class="ml-2 text-xs lg:text-sm">Not interested</span> -->
        </div>
        <!-- </Button> -->

      </div>

      <div v-if="props.propositionDate" class="flex gap-4">
        <div v-if="['uninterested', 'shortlisted'].includes(props.status as string)" class="flex gap-5">
          <Button :outline="true"
            class="w-[218px] h-[43px] px-[22px] py-2 rounded flex-col justify-center items-center inline-flex"
            @click="showPropositionModal = true">
            <div class="justify-center items-center gap-2 inline-flex">
              <!-- <PhPaperPlaneTilt class="h-5 w-5 text-red-600 cursor-pointer" /> -->
              <span class="text-red-600 text-lg font-bold leading-[27px] tracking-tight">Send proposition</span>
            </div>
          </Button>
        </div>

        <div v-if="['shortlisted'].includes(props.status as string)" class="flex gap-4">
          <!-- <Button :outline="true" class="w-full max-w-32 xl:max-w-52 md:max-w-40" @click="showNotinteresetedModal = true"> -->
          <div class="flex items-center" @click="removeShortlistModal = true">
            <PhThumbsUp class="h-5 w-5 text-red-600 cursor-pointer"  weight="fill"/>
            <!-- <span class="ml-2 text-xs lg:text-sm">Not interested</span> -->
          </div>
          <!-- </Button> -->
        </div>

        <div v-if="['shortlisted'].includes(props.status as string)" class="flex gap-4">
          <!-- <Button :outline="true" class="w-full max-w-32 xl:max-w-52 md:max-w-40" @click="showNotinteresetedModal = true"> -->
          <div class="flex items-center" @click="showNotinteresetedModal = true">
            <PhThumbsDown class="h-5 w-5 text-slate-600 cursor-pointer"/>
            <!-- <span class="ml-2 text-xs lg:text-sm">Not interested</span> -->
          </div>
          <!-- </Button> -->
        </div>
        
      </div>
      <div v-if="props.propositionDate"
        class="w-[88px] h-[26px] px-[9px] py-3 bg-gray-200 rounded-[7px] justify-center items-center gap-2.5 inline-flex">
        <PhStar v-if="props.status == 'shortlisted'" class="h-6 w-6 text-slate-900" />
        <PhCheck v-if="props.status == 'approved'" class="h-6 w-6 text-slate-900" />
        <PhClock v-if="props.status == 'requested'" class="h-6 w-6 text-slate-900" />
        <PhEyeSlash v-if="props.status == 'uninterested'"
          class="h-6 w-6 text-slate-900" />
        <PhX v-if="props.status == 'declined'"
          class="h-6 w-6 text-slate-900" />
        <span class="text-zinc-600 text-[10px] font-normal leading-[15px] tracking-tight">{{ props.status }}</span>
      </div>

    </div>
  </div>

  <Modal :show-modal="showShortlistModal" :show-buttons="false" @close="showShortlistModal = false">
    <div class="space-y-2">
      <div class="text-xl font-medium">Shortlist this Candidate?</div>

      <div class="space-y-4">
        <div class="text-sm text-slate-600">
          By shortlisting this candidate, you will be able to find them easier at a later time.
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button :outline="true" @click="showShortlistModal = false" class="px-4">Cancel</Button>
        <Button @click="() => updateCandidacyStatus('shortlisted')" class="px-6">Shortlist</Button>
      </div>
    </div>
  </Modal>

  <Modal :show-modal="showPropositionModal" :show-buttons="false" @close="showPropositionModal = false">
    <div class="space-y-2">
      <div class="text-xl font-medium">Send proposition to Candidate?</div>

      <div class="space-y-4">
        <div class="text-sm text-slate-600">
          We will let them know. You can find their details in the "My candidates" section from now
          on.
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button :outline="true" @click="showPropositionModal = false" class="px-4">Cancel</Button>
        <Button @click="() => updateCandidacyStatus('requested')" class="px-6">Send</Button>
      </div>
    </div>
  </Modal>

  <Modal :show-modal="showNotinteresetedModal" :show-buttons="false" @close="showNotinteresetedModal = false">
    <div class="space-y-2">
      <div class="text-xl font-medium">Not interested for this candidate?</div>

      <div class="space-y-4">
        <div class="text-sm text-slate-600">
          We will let them know. You can find their details in the "My candidates" section from now
          on.
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button :outline="true" @click="showNotinteresetedModal = false" class="px-4">Cancel</Button>
        <Button @click="() => updateCandidacyStatus('uninterested')" class="px-6">Ok</Button>
      </div>
    </div>
  </Modal>

  <Modal :show-modal="removeShortlistModal" :show-buttons="false" @close="removeShortlistModal = false">
    <div class="space-y-2">
      <div class="text-xl font-medium">Will you remove this candidacy?</div>

      <div class="space-y-4">
        <div class="text-sm text-slate-600">
          We will let them know. You can find their details in the "Find candidate" section from now
          on.
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button :outline="true" @click="showNotinteresetedModal = false" class="px-4">Cancel</Button>
        <Button @click="() => removeCandidacy()" class="px-6">Ok</Button>
      </div>
    </div>
  </Modal>

  <Modal :show-modal="showUserInfoModal" :show-buttons="false" :size="`w-[500px]`" @close="showUserInfoModal = false">
    <CandidateInfo :firstName="props.firstName" :lastName="props.lastName" :email="props.email" :phone="props.phone"
      :company="props.company" :videoId="props.videoId" :seeking_contract_type="props.seeking_contract_type"
      :seeking_field="props.seeking_field" :seeking_rate="props.seeking_rate" :bio="props.bio" :status="props.status"
      :profile_photo="props.profile_photo" />
  </Modal>

  <Modal :show-modal="handlePlayModal" :show-buttons="false" @close="handlePlayModal = false" size="w-[90%] min-[450px]:w-[70%] sm:w-1/2 xl:w-[680px]">
    <div class="relative bg-black w-full h-full mt-3">
      <mux-player class="w-full rounded-2xl h-[200px] md:h-[300px] lg:h-[400px] xl:h-[480px]" ref="muxplayer" :playback-id="videoId"
      metadata-video-title="Test video title" metadata-viewer-user-id="user-id-007"></mux-player>
    </div>
  </Modal>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PhImage, PhStar, PhPaperPlaneTilt, PhCheck, PhClock, PhX, PhEyeSlash, PhThumbsUp, PhThumbsDown } from '@phosphor-icons/vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import API from '@/utils/api/api'
import CandidateInfo from './CandidateInfo.vue'

const userId = localStorage.getItem("user_id");

onMounted(() => {
  if (document.getElementById('mux-player')) return; // was already loaded
  var scriptTag = document.createElement("script");
  scriptTag.src = "https://cdn.jsdelivr.net/npm/@mux/mux-player";
  scriptTag.id = "mux-player";
  document.getElementsByTagName('head')[0].appendChild(scriptTag);
})

const emit = defineEmits<{
  (e: 'getCandidacies'): void;
  (e: 'getCandidates'): void;
}>();

const props = defineProps<{
  candidateId: number
  candidacyId: number
  firstName: string
  lastName: string
  email?: string
  phone?: string
  bio: string
  propositionDate?: string
  videoId?: string
  status?: string
  company?: string
  seeking_contract_type?: string
  seeking_field?: string
  seeking_rate?: string
  profile_photo?: string
}>()

const updateCandidacyStatus = (status: string) => {
  API.updateCandidacies({
    user_id: userId,
    candidate_id: props.candidateId,
    status: status
  })
    .then((response) => {
      showPropositionModal.value = false;
      showShortlistModal.value = false;
      showNotinteresetedModal.value = false;
      emit("getCandidacies");
      emit("getCandidates");
    })
}

const removeCandidacy = () => {
  API.removeCandidacy(props.candidacyId)
  .then((response) => {
    removeShortlistModal.value = false;
      emit("getCandidacies");
      emit("getCandidates");
    })
}

const handlePlayModal = ref(false) 

const showPropositionModal = ref(false)
const showShortlistModal = ref(false)
const showNotinteresetedModal = ref(false)
const showUserInfoModal = ref<boolean>(false);
const removeShortlistModal = ref(false)
</script>
