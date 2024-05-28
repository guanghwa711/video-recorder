<template>
    <div class="flex h-full justify-center w-full">
        <div class="flex w-full max-w-sm flex-col space-y-4">
            <div class="mb-4 flex justify-center items-center w-full">
                <div class="flex h-20 w-20 items-center justify-center rounded-full border-slate-400 border-[2px] bg-slate-100 p-[0.5px]">
                    <PhImage v-if="!props.profile_photo" class="h-full w-full rounded-full text-slate-300" />
                    <img v-else class="w-full h-full object-cover rounded-full" :src="props.profile_photo" alt="user avatar" />
                </div>
                <p class="text-2xl text-slate-700 font-medium ml-5">{{ props.firstName }} {{ props.lastName }}</p>
            </div>
            <hr class="my-5" />
            <div class="mb-4 flex justify-center w-full">
                <div class="aspect-square max-h-40 shrink-0 rounded-xl bg-slate-200 p-2 mr-5" v-if="props.videoId">
                    <mux-player class="aspect-square max-h-40 w-full shrink-0 rounded-xl bg-slate-200" ref="muxplayer"
                        :playback-id="props.videoId" metadata-video-title="Test video title"
                        metadata-viewer-user-id="user-id-007"></mux-player>
                </div>
                <div class="items-center justify-center">
                    <div class="text-sm text-slate-700 font-medium m-3 flex" v-if="status=='approved'">
                        <p class="font-extrabold mr-2">Email:</p> {{ props.email }}
                    </div>
                    <div class="text-sm text-slate-700 font-medium m-3 flex" v-if="status=='approved'">
                        <p class="font-extrabold mr-2">Phone Number:</p> {{ props.phone }}
                    </div>
                    <div class="text-sm text-slate-700 font-medium m-3 flex">
                        <p class="font-extrabold mr-2">Company:</p> {{ props.company }}
                    </div>
                    <div class="text-sm text-slate-700 font-medium m-3 flex">
                        <p class="font-extrabold mr-2">Contract Type:</p> {{ props.seeking_contract_type }}
                    </div>
                    <div class="text-sm text-slate-700 font-medium m-3 flex">
                        <p class="font-extrabold mr-2">Seeking:</p> {{ props.seeking_field }}
                    </div>
                    <div class="text-sm text-slate-700 font-medium m-3 flex">
                        <p class="font-extrabold mr-2">Seeking Rate:</p> {{ props.seeking_rate }}%
                    </div>
                    <div class="text-sm text-slate-700 font-medium m-3 flex">
                        <p class="font-extrabold mr-2">Bio:</p> {{ props.bio }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { PhImage } from '@phosphor-icons/vue'

onMounted(() => {
    if (document.getElementById('mux-player')) return; // was already loaded
    var scriptTag = document.createElement("script");
    scriptTag.src = "https://cdn.jsdelivr.net/npm/@mux/mux-player";
    scriptTag.id = "mux-player";
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
})

const props = defineProps<{
    firstName: string
    lastName: string
    email?: string
    phone?: string
    videoId?: string
    company?: string
    seeking_contract_type?: string
    seeking_field?: string
    seeking_rate?: string
    bio?: string
    status?: string
    profile_photo?: string
}>()

</script>