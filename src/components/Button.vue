<template>
  <component
    ref="buttonRef"
    :is="props.link ? 'a' : 'button'"
    :href="props.link ? props.href : undefined"
    :disabled="props.disabled || props.loading || (props.noTextLoading && props.loading)"
    class="bg-red-600 enabled:hover:bg-primary-600 flex cursor-pointer items-center justify-center rounded-md border border-transparent py-2 text-sm font-semibold text-white focus:outline-none"
    :class="{
      '!cursor-not-allowed bg-opacity-50':
        props.disabled || props.loading || (props.noTextLoading && props.loading),
      '!border-red-600 !text-red-600 border !bg-transparent hover:!bg-slate-50/50': props.outline,
      'ring-red-600 ring-offset-2 ring-offset-white focus:ring-1 ':
        props.ring
    }"
    @click="click"
  >
    <Spinner
      v-if="props.loading || (props.noTextLoading && props.loading)"
      class="-ml-6 mr-2 !h-4 !w-4 text-white"
      :class="{
        '!text-red-600': props.outline,
        'absolute !mx-0': props.noTextLoading
      }"
    />

    <span
      :class="{
        invisible: props.noTextLoading && props.loading,
        'pointer-events-none': !props.pointerEvents
      }"
    >
      <slot></slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMagicKeys, watchThrottled } from '@vueuse/core'
import Spinner from './Spinner.vue'

const { enter } = useMagicKeys()

const props = withDefaults(
  defineProps<{
    loading?: boolean
    noTextLoading?: boolean
    disabled?: boolean
    outline?: boolean
    ring?: boolean
    pointerEvents?: boolean
    link?: boolean
    href?: string
    clickOnEnter?: boolean
  }>(),
  {
    loading: false,
    noTextLoading: true,
    disabled: false,
    outline: false,
    ring: false,
    pointerEvents: false,
    link: false,
    href: undefined,
    clickOnEnter: false
  }
)

const emit = defineEmits(['click'])

const buttonRef = ref<HTMLElement | null>(null)

function click() {
  if (props.disabled) return
  emit('click')
}

watchThrottled(
  enter,
  () => {
    if (props.clickOnEnter) click()
  },
  {
    throttle: 500
  }
)

defineExpose({
  buttonRef
})
</script>
