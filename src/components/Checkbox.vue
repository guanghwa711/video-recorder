<template>
  <div class="flex flex-col gap-2.5">
    <label class="flex flex-row items-center gap-4 [&>.checkbox]:hover:bg-slate-50">
      <CheckboxRoot
        v-model:checked="checked"
        class="border flex h-[22px] w-[22px] appearance-none items-center justify-center rounded-[4px] border-slate-300 bg-white outline-none hover:bg-slate-50"
      >
        <CheckboxIndicator class="flex h-full w-full items-center justify-center rounded bg-white">
          <PhCheck class="h-4 w-4 text-red-600" weight="bold" />
        </CheckboxIndicator>
      </CheckboxRoot>

      <span class="select-none text-sm">{{ props.label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
import { PhCheck } from '@phosphor-icons/vue';

const props = withDefaults(
  defineProps<{
    label: string;
  }>(),
  {
    label: ''
  }
);

const checked = defineModel<boolean>('checked')

const emit = defineEmits<{
  (e: 'update', checked: boolean): void
}>()
</script>
