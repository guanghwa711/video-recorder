<template>
    <div class="w-100" @click.stop>
        <div class="relative bg-black w-full h-full mt-3">
            <div class="spinner" :hidden="!isUploading"></div>
            <div class="recording-spinner" :hidden="!isRecording"></div>
            <video class="w-full flex h-[480px]" ref="camera" autoplay></video>
        </div>
        <div class="mt-3">
            <div class="flex gap-x-2">
                <Button class="w-48" @click="handleRecording" :disabled="isUploading">
                    <div class="flex items-center">
                        <PhRecord class="h-5 w-5 text-white" />
                        <span class="ml-2">
                            {{ getButtonTitle() }}
                        </span>
                    </div>
                </Button>
                <Button class="w-48" @click="handleUploadRecordedVideo" :disabled="isRecording || isUploading || recordedBlobs.length == 0 || isUploaded">
                    <div class="flex items-center">
                        <PhFloppyDisk class="h-5 w-5 text-white" />
                        <span class="ml-2">
                            Keep this Video
                        </span>
                    </div>
                </Button>
                <Button class="px-1 py-0" @click="deleteRecordedVideo" :disabled="recordedBlobs.length == 0 || isUploaded || isUploading">
                    <PhTrash class="h-5 w-5 text-white" />
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from '@/components/Button.vue';
import { PhTrash, PhRecord, PhFloppyDisk } from '@phosphor-icons/vue';
import API from '@/utils/api/api';

const api_url = 'https://proxy.cors.sh/' + 'http://clownfish-app-9zwdy.ondigitalocean.app:8080';
const isUploading = ref(false);
const isUploaded = ref(false);
const isRecording = ref(false);
const isTestingCam = ref(false);
const showModal = ref(false);
const isPlaying = ref(false);
const userId = localStorage.getItem("user_id");

const recordedBlobs = ref<Blob[]>([]);
const mediaRecorder = ref<MediaRecorder | null>(null);
const camera = ref<HTMLVideoElement | null>(null);

onMounted(() => {
    showModal.value = true;
    recordedBlobs.value = [];
    isUploaded.value = false;
    isRecording.value = false;
    mediaRecorder.value = null;
    isPlaying.value = false;
    isUploading.value = false;
    testCamera();
})

const init = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        camera.value!.srcObject = stream;
        mediaRecorder.value = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mediaRecorder.value.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                recordedBlobs.value.push(event.data);
            }
        };
    } catch (e) {
        alert('Error accessing media devices. Please check your camera again.');
        return;
    }
}

const handleRecording = () => {
    if (!isRecording.value && recordedBlobs.value.length == 0) {
        startRecording();
    }
    if (isRecording.value) {
        stopRecording();
    }
    if (recordedBlobs.value.length > 0) {
        playRecording();
    }
}

const startRecording = () => {
    if (isTestingCam) {
        pauseCamera();
    }
    // Ensure the stream is available; if not, re-initialize it
    if (!camera.value?.srcObject) {
        init().then(() => {
            _startRecording();
        });
    } else {
        _startRecording();
    }
}

const _startRecording = () => {
    if (camera.value?.srcObject) {
        recordedBlobs.value = [];
        mediaRecorder.value?.start();
        isRecording.value = true;
    }
}

const stopRecording = async () => {
    return new Promise((resolve, reject) => {
        // Handler to be called when the last blob of data is received
        mediaRecorder.value!.onstop = resolve;
        mediaRecorder.value!.onerror = (event) => reject(event);

        // Stop the media recorder
        mediaRecorder.value?.stop();
    }).then(() => {
        isRecording.value = false;
        camera.value!.srcObject = null;
        const url = URL.createObjectURL(new Blob(recordedBlobs.value, { type: 'video/webm' }));
        camera.value!.src = url;
        camera.value?.load(); // Reload the video element to apply the new source
        camera.value!.onended = () => {
            isPlaying.value = false;
        };
        camera.value?.pause();
    }).catch((error) => {
        console.error('Error stopping media recorder:', error);
    });
}

const playRecording = () => {
    if (recordedBlobs.value.length > 0) {
        // Check if the video is paused
        if (camera.value?.paused) {
            camera.value?.play().then(() => {
                isPlaying.value = true;
            }).catch(error => {
                console.error("Error attempting to play video:", error);
            });
        } else {
            camera.value?.pause();
            isPlaying.value = false;
        }
    } else {
        alert('Please select a valid .webm video file.');
    }
}

const deleteRecordedVideo = () => {
    // Clear the recorded blobs
    recordedBlobs.value = [];
    // Reset the video element
    camera.value!.srcObject = null;
    camera.value!.src = '';
    // Reset states as necessary
    isPlaying.value = false;
    isUploaded.value = false;

    testCamera();
    // Additional cleanup as needed
}

const getButtonTitle = () => {
    if (!isRecording.value && recordedBlobs.value.length == 0) {
        return "Start Recording";
    }
    if (isRecording.value) {
        return "Stop Recording";
    }
    if (recordedBlobs.value.length > 0 && !isPlaying.value) {
        return "Play";
    }
    if (recordedBlobs.value.length > 0 && isPlaying.value) {
        return "Pause";
    }
}

const handleUploadRecordedVideo = () => {
    if (recordedBlobs.value.length > 0) {
        const blob = new Blob(recordedBlobs.value, { type: 'video/webm' });
        uploadVideoToMux(blob);
    } else {
        console.error('No recorded data available');
    }
}

const testCamera = async () => {
    try {
        isTestingCam.value = true;
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        camera.value!.srcObject = stream;
        mediaRecorder.value = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mediaRecorder.value.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                recordedBlobs.value.push(event.data);
            }
        };
    } catch (e) {
        console.log("Can't turn on your camera. Please check your web camera.");
        isTestingCam.value = false;
    }
}

const pauseCamera = () => {
    camera.value!.srcObject = null;
    mediaRecorder.value = null;
    isTestingCam.value = false;
    camera.value!.pause();
}

const uploadVideoToMux = async (blob: Blob) => {
    isUploading.value = true;
    const uploadConfigResponse = await fetch(`${api_url}/video-upload/get-upload-url`, { headers: { 'x-cors-api-key': "temp_368b76b526936e794eb3e109cc7fb026" } });
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
        // const uploadDataResponse = await fetch(`${api_url}/video-upload/get-playback-id?upload_id=${uploadID}`, {headers: {'x-cors-api-key': "temp_368b76b526936e794eb3e109cc7fb026"}})
        // const uploadData = await uploadDataResponse.json();
        // setTimeout(() => {
        //   isUploaded = true;
        //   $refs.muxplayer.setAttribute("playback-id", uploadData.playback_ids[0].id);
        //   isUploading = false;
        // }, 5000);
        isUploaded.value = true;
        isUploading.value = false;
        isPlaying.value = false;
    } catch (error) {
        console.error(error);
    }
}

</script>

<style scoped>
.spinner {
    top: 48%;
    left: 48%;
    position: absolute;
    z-index: 9999;
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

.recording-spinner {
    position: absolute;
    top: 10px;
    /* Adjust as needed */
    right: 10px;
    /* Adjust as needed */
    width: 15px;
    /* Size of the spinner */
    height: 15px;
    /* Size of the spinner */
    border-radius: 50%;
    background-color: red;
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 1);
    transform: scale(1);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
}
</style>