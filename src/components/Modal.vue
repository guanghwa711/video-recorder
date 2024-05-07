<template>
  <TransitionRoot appear :show="props.showModal" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[110]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-xl bg-white px-6 pb-6 pt-8 text-left align-middle shadow-xl transition-all"
              :class="props.size"
            >
              <div @click="closeModal" class="cursor-pointer">
                <PhX class="absolute right-4 top-4 h-4 w-4 text-slate-500" weight="bold" />
              </div>

              <slot></slot>

              <div v-if="props.showButtons" class="mt-6 flex justify-end space-x-2">
                <Button :outline="true" class="px-4" @click="closeModal">Cancel</Button>
                <Button
                  :loading="props.loading"
                  :no-text-loading="true"
                  @click="$emit('submit')"
                  class="px-5"
                  >Continue</Button
                >
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import { PhX } from '@phosphor-icons/vue';
import Button from './Button.vue';

const props = withDefaults(
  defineProps<{
    showModal: boolean;
    showButtons: boolean;
    size?: string;
    loading?: boolean;
  }>(),
  {
    showModal: false,
    showButtons: true,
    size: 'max-w-lg',
    loading: false
  }
);

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit'): void;
}>();

function closeModal() {
  emit('close');
}
</script>
