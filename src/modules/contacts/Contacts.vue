<template>
    <div class="flex items-center justify-center">
        <div
            class="w-full h-80 opacity-80 mix-blend-multiply bg-indigo-900 absolute flex items-center justify-center">
        </div>
        <div class="absolute flex flex-col items-center justify-center">
            <div class="text-center text-white text-4xl lg:text-6xl font-extrabold leading-[64px] tracking-widest">
                Contact Us</div>
        </div>
        <div class="w-full h-80 bg-[url('@/assets/3.png')] bg-center bg-cover bg-no-repeat">
        </div>
    </div>
    <div class="mx-20 m-10 flex flex-col items-center justify-center">
        <div class="flex w-full max-w-sm flex-col space-y-4">
            <Input type="text" v-model="contact.name" label="Name" placeholder="Name" />
            <Input type="text" v-model="contact.number" label="Contact" placeholder="Contact" />
            <Label>Message</Label>
            <textarea v-model="contact.message"
                class="peer h-28 w-full rounded-md border border-slate-400 bg-white focus-within:border-slate-400 pl-3 text-sm placeholder-slate-400 outline-none !ring-0 focus:ring-0"></textarea>
                <div class="pt-4">
                    <Button class="w-full">Submit</Button>
                </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Input from '@/components/input/Input.vue'
import Button from '@/components/Button.vue'
import Label from '@/components/input/Label.vue'

const contact = reactive({
    name: '',
    number: '',
    message: ''
});

</script>