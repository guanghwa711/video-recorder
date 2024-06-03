<template>
  <div class="flex flex-col space-y-1 w-full md:w-[400px]">
    <Label :name="props.name" class="font-medium">{{ props.label }}</Label>

    <Border
      :borderless="props.borderless"
      :class="{
        '!bg-slate-50': props.disabled
      }"
    >
      <Icon class="!px-0 !pr-2">
        <slot name="suffix-icon"></slot>
      </Icon>

      <input
        :id="props.name"
        :type="props.type"
        :name="props.name"
        :placeholder="props.placeholder"
        :autocomplete="props.autocomplete"
        :required="props.required"
        :disabled="props.disabled"
        :value="props.value || props.modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="peer h-10 w-full rounded-md !border-0 pl-3 text-sm placeholder-slate-400 outline-none !ring-0 focus:ring-0"
        :class="{
          '!pl-0 !pr-1': hasIconSlot,
          'bg-slate-50': props.disabled
        }"
      />

      <Icon v-if="hasIconSlot">
        <slot name="icon"></slot>
      </Icon>
    </Border>

    <Error v-if="props.error">
      {{ props.error }}
    </Error>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Label from './Label.vue'
import Border from './Border.vue'
import Icon from './Icon.vue'
import Error from './Error.vue'

const slots = useSlots()

const props = withDefaults(
  defineProps<{
    type: 'text' | 'email' | 'password' | 'number'
    label?: string
    name?: string
    placeholder?: string
    autocomplete?: string
    borderless?: boolean
    required?: boolean
    disabled?: boolean
    value?: string | number
    modelValue?: string | number
    error?: string
  }>(),
  {
    autocomplete: 'off',
    required: false,
    disabled: false,
    borderless: false
  }
)

defineEmits(['update:modelValue'])

const hasIconSlot = computed(() => !!slots.icon || !!slots['suffix-icon'])
</script>
