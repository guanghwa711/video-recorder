<template>
    <Button @click="triggerFileUplaodInput" :outline="true" class="w-60">
        <div class="flex items-center px-2">
            <PhUpload class="h-5 w-5 text-red-600" />
            <span class="ml-2">Upload Video</span>
        </div>
    </Button>
    <div :hidden="!isUploading" class="absolute top-0 left-0 z-40 w-full h-full bg-black opacity-30">
    </div>
    <div :hidden="!isUploading" class="spinner z-50">
    </div>
    <input type="file" @change="handleUploadFileInput" style="display: none" ref="fileUploadInput" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Button from '@/components/Button.vue';
import { PhUpload } from '@phosphor-icons/vue';
import { toast } from 'vue3-toastify'
import API from '@/utils/api/api';

const api_url = 'https://clownfish-app-9zwdy.ondigitalocean.app';
const fileUploadInput = ref<HTMLInputElement | null>(null)
const uploadingSpinner = ref<HTMLElement | null>(null)
const isUploading = ref(false);
const userId = localStorage.getItem("user_id");

const props = defineProps<{
  uploadedVideoCount: number;
}>()

const emit = defineEmits<{
  (e: 'getVideoResumes'): void;
}>();

watchEffect(() => {
    if(!isUploading.value) {
        uploadingSpinner.value?.setAttribute("display", "none");
        emit('getVideoResumes');
    } else {
        uploadingSpinner.value?.setAttribute("display", "block");
    }
})

const triggerFileUplaodInput = () => {
    if (props.uploadedVideoCount >= 3) {
        toast("You have already 3 upladed videos, To upload a new video, please remove one first.", {
            autoClose: 3000,
            theme: "light",
            type: "warning"
        });
    } else {
        fileUploadInput.value?.click();
    }
}

const handleUploadFileInput = (event: any) => {
    const file = event.target.files[0];
    uploadVideoToMux(file);
}

const uploadVideoToMux = async (blob: Blob) => {
    isUploading.value = true;
    const uploadConfigResponse = await fetch(`${api_url}/video-upload/get-upload-url`);
    const uploadConfig = await uploadConfigResponse.json();
    const uploadURL = uploadConfig.url;
    const uploadID = uploadConfig.id;
    try {
        await fetch(uploadURL, {
            method: 'PUT',
            body: blob,
            headers: { "content-type": blob.type }
        });
        await API.createVideoResume({
            user_id: userId,
            upload_id: uploadID,
            status: 'created',
            is_live: false
        })
    } catch (error) {
        console.error(error);
    } finally {
        isUploading.value = false;
        fileUploadInput.value!.value = '';
    }
}
</script>

<style scoped>
.spinner {
    top: 48%;
    left: 48%;
    position: absolute;
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-left-color: #EF4444;
    animation: spin 1s ease infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>