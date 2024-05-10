<template>
  <div v-if="candidateId" class="flex h-52 min-h-52 w-full gap-8 rounded-xl border border-slate-200 p-6">
    <div class="aspect-square h-full w-40 shrink-0 rounded-xl bg-slate-200 p-2">
      <PhImage class="h-full w-full text-slate-300" />
    </div>

    <div class="flex h-full w-full flex-col justify-between">
      <div class="space-y-2">
        <div class="text-2xl font-medium">{{ props.firstName }} {{ props.lastName }}</div>

        <div class="w-full rounded-lg text-sm text-slate-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni obcaecati at aliquid maxime
          possimus quam placeat, quae aperiam, adipisci corrupti aliquam praesentium culpa minima
          libero.
        </div>
      </div>

      <div v-if="props.propositionDate" class="mb-1 flex items-center text-sm text-slate-600">
        <PhCheckCircle class="h-6 w-6 text-primary-500" />
        <span class="ml-2">Proposition sent on {{ props.propositionDate }}</span>
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
        <Button class="px-6">Shortlist</Button>
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
        <Button class="px-6">Send</Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PhImage, PhStar, PhPaperPlaneTilt, PhCheckCircle } from '@phosphor-icons/vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'

const props = defineProps<{
  candidateId: number
  firstName: string
  lastName: string
  bio: string
  propositionDate?: string
}>()

const showPropositionModal = ref(false)
const showShortlistModal = ref(false)
</script>
