<template>
  <div v-if="candidateId" class="flex h-52 min-h-52 w-full gap-8 rounded-xl border border-slate-200 p-6">
    <div class="aspect-square h-full w-40 shrink-0 rounded-xl bg-slate-200 p-2">
      <div v-if="!videoId">
        <PhImage class="h-full w-full text-slate-300" />
      </div>
      <div v-if="videoId">
        <mux-player
          class="aspect-square max-h-40 w-full shrink-0 rounded-xl bg-slate-200"
          ref="muxplayer"
          :playback-id="videoId"
          metadata-video-title="Test video title"
          metadata-viewer-user-id="user-id-007"
        ></mux-player>
      </div>
    </div>

    <div class="flex h-full w-full flex-col justify-between">
      <div class="space-y-2" @click="showUserInfoModal= true">
        <div class="text-2xl font-medium">{{ props.firstName }} {{ props.lastName }}</div>

        <div class="w-full rounded-lg text-sm text-slate-600">
          {{ props.bio || "This candidate has not bio yet." }}
        </div>
      </div>

      <div v-if="props.propositionDate" class="mb-1 flex items-center text-sm text-slate-600">
        <PhCheckCircle v-if="['shortlisted', 'approved'].includes(props.status as string)" class="h-6 w-6 text-primary-500" />
        <PhClock v-if="props.status == 'requested'" class="h-6 w-6 text-primary-500" />
        <PhX v-if="['uninterested', 'declined'].includes(props.status as string)" class="h-6 w-6 text-primary-500" />
        <span class="ml-2">{{ props.status }}</span>
      </div>
      <div v-else class="flex w-full gap-4">
        <Button :outline="true" class="w-full max-w-52" @click="showShortlistModal = true">
          <div class="flex items-center">
            <PhStar class="h-5 w-5 text-primary-500" />
            <span class="ml-2">Shortlist</span>
          </div>
        </Button>

        <Button :outline="true" class="w-full max-w-52" @click="showPropositionModal = true">
          <div class="flex items-center">
            <PhPaperPlaneTilt class="h-5 w-5 text-primary-500" />
            <span class="ml-2">Send proposition</span>
          </div>
        </Button>

        <Button :outline="true" class="w-full max-w-52" @click="showNotinteresetedModal = true">
          <div class="flex items-center">
            <PhThumbsDown class="h-5 w-5 text-primary-500" />
            <span class="ml-2">Not interested</span>
          </div>
        </Button>
      
      </div>
      <div v-if="['uninterested', 'shortlisted'].includes(props.status as string)" class="flex w-full gap-4">
        <Button :outline="true" class="w-full max-w-52" @click="showPropositionModal = true">
          <div class="flex items-center">
            <PhPaperPlaneTilt class="h-5 w-5 text-primary-500" />
            <span class="ml-2">Send proposition</span>
          </div>
        </Button>
      </div>

      <div v-if="['shortlisted'].includes(props.status as string)" class="flex w-full gap-4">
        <Button :outline="true" class="w-full max-w-52" @click="showNotinteresetedModal = true">
          <div class="flex items-center">
            <PhThumbsDown class="h-5 w-5 text-primary-500" />
            <span class="ml-2">Not interested</span>
          </div>
        </Button>
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

  <Modal
    :show-modal="showPropositionModal"
    :show-buttons="false"
    @close="showPropositionModal = false"
  >
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

  <Modal
    :show-modal="showNotinteresetedModal"
    :show-buttons="false"
    @close="showNotinteresetedModal = false"
  >
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

  <Modal :show-modal="showUserInfoModal" :show-buttons="false" :size="`w-[500px]`" @close="showUserInfoModal = false">
    <CandidateInfo 
      :firstName="props.firstName" 
      :lastName="props.lastName"
      :email="props.email"
      :phone="props.phone"
      :company="props.company"
      :videoId="props.videoId"
      :seeking_contract_type="props.seeking_contract_type"
      :seeking_field="props.seeking_field"
      :seeking_rate="props.seeking_rate"
      :bio="props.bio"
      :status="props.status"
    />
  </Modal>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PhImage, PhStar, PhPaperPlaneTilt, PhCheckCircle, PhClock, PhX, PhThumbsDown } from '@phosphor-icons/vue'
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
  firstName: string
  lastName: string
  email?: string
  phone?: string
  bio: string
  propositionDate?: string
  videoId?: string
  status?: string
  company?:string
  seeking_contract_type?:string
  seeking_field?: string
  seeking_rate?: string

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

const showPropositionModal = ref(false)
const showShortlistModal = ref(false)
const showNotinteresetedModal = ref(false)
const showUserInfoModal = ref<boolean>(false);
</script>
