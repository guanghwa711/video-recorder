<template>
  <div class="flex w-full flex-col gap-2 rounded-xl border border-slate-200 p-[10px]">
    <div class="aspect-square max-h-40 w-full shrink-0 rounded-xl bg-slate-200 p-2">
      <PhImage class="h-full w-full text-slate-300" />
    </div>

    <div class="space-y-1">
      <div class="text-base">
        <span class="font-semibold">{{ props.recruiterName }}</span>
        wants to get to know you!
      </div>
      <div class="text-xs text-slate-500">{{ props.date }}</div>
    </div>

    <div v-if="preposition_text" class="mt-2 w-full rounded-lg text-justify text-sm text-slate-600">
      {{ preposition_text }}
    </div>

    <div class="flex w-full gap-2 pt-4">
      <Button :outline="true" class="w-full max-w-52 text-red-600 disabled:!bg-gray-300 disabled:!text-gray-600 disabled:!border-gray-300" @click="showAcceptModal = true" :disabled="status == 'approved'">
        <div class="flex items-center px-1">
          <PhCheck class="h-5 w-5" />
          <span class="ml-2 text-sm md:text-xs lg:text-sm">{{status == "approved" ? "Accepted" : "Accept"}}</span>
        </div>
      </Button>

      <Button
        :outline="true"
        class="w-full max-w-52 !border-slate-500 !text-slate-500 disabled:!bg-gray-300 disabled:!text-gray-600 disabled:!border-gray-300"
        @click="showDeclineModal = true"
        :disabled="status == 'declined'"
      >
        <div class="flex items-center px-1">
          <PhX class="h-5 w-5" />
          <span class="ml-2 text-sm md:text-xs lg:text-sm">{{status == "declined" ? "Declined" : "Decline"}}</span>
        </div>
      </Button>
    </div>
  </div>

  <Modal :show-modal="showAcceptModal" :show-buttons="false" @close="showAcceptModal = false">
    <div class="space-y-2">
      <div class="text-xl font-medium">Accept this Candidacy?</div>

      <div class="space-y-4">
        <div class="text-sm text-slate-600">
          By accepting this candidacy, you will be able to proceed with the recruitment process.
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button :outline="true" @click="showAcceptModal = false" class="px-4">Cancel</Button>
        <Button @click="() => handleAccpet()" class="px-6">Accept</Button>
      </div>
    </div>
  </Modal>

  <Modal :show-modal="showDeclineModal" :show-buttons="false" @close="showDeclineModal = false">
    <div class="space-y-2">
      <div class="text-xl font-medium">Decline this Candidacy?</div>

      <div class="space-y-4">
        <div class="text-sm text-slate-600">
          By declining this candidacy, you decide not to proceed with the recruitment process and
          you won't see this candidacy again.
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button :outline="true" @click="showDeclineModal = false" class="px-4">Cancel</Button>
        <Button @click="() => updateCandidacyStatus('declined')" class="px-6">Decline</Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import emailjs from '@emailjs/browser';
import { PhCheck, PhX, PhImage } from '@phosphor-icons/vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import API from '@/utils/api/api'

const userId = localStorage.getItem("user_id");

const props = defineProps<{
  recruiterName: string
  date: string
  recruiterId: number,
  recruiterEmail: string,
  status: string
  preposition_text?: string
}>()

const emit = defineEmits<{
  (e: 'getCandidacies'): void;
}>();

const contact = {
    name:props.recruiterName,
    email: props.recruiterEmail,
    message: `${props.recruiterName} has accepted your proposition`
};

const handleAccpet = () => {
  sendEmail();
  updateCandidacyStatus('approved')
}

const sendEmail = () => {
    emailjs.send(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID, contact, {
        publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY,
    })
        .then(() => {
                console.log('success')
            },
            (error) => {
                console.log('FAILED...', error.text);
            },
        );
}

const updateCandidacyStatus = (status: string) => {
  API.updateCandidacies({
    user_id: userId,
    recruiter_id: props.recruiterId,
    status: status,
  })
  .then((response) => {
    showDeclineModal.value = false;
    showAcceptModal.value = false;
    emit("getCandidacies");
  })
}

const showAcceptModal = ref(false)
const showDeclineModal = ref(false)
</script>
