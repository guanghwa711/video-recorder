<template>
    <div class="flex h-full itmes-center justify-center">
        <div class="flex w-full max-w-sm flex-col space-y-4">
            <div class="mb-4 flex flex-col justify-center">
                <div class="flex justify-center">
                    <div class="flex h-36 w-36 items-center justify-center rounded-full border-slate-400 border-[3px] bg-slate-100 p-[0.5px]">
                        <PhImage v-if="!candidate.profile_photo" class="h-full w-full rounded-full text-slate-300" />
                        <img v-else class="w-full h-full object-cover rounded-full" :src="candidate.profile_photo" alt="user avatar" />
                    </div>
                    <input type="file" accept="image/*" @change="onFileInputChange" style="display: none" ref="avatarUploadInput" />
                    <FullSpinner v-if="isUploading" />
                </div>
                <div class="flex justify-center mt-3" v-if="!candidate.profile_photo">
                    <Button :outline="true" class="w-40" @click="triggerFileUplaodInput">Upload</Button>
                </div>
                <div class="flex justify-center mt-3" v-else>
                    <Button :outline="true" class="w-40" @click="triggerFileUplaodInput">Change</Button>
                </div>
            </div>
            
            <Input type="text" label="First name" v-model="candidate.first_name" placeholder="First name" />
            <Input type="text" label="Last name" v-model="candidate.last_name" placeholder="Last name" />
            <Input type="text" label="Phone number" v-model="candidate.phone" placeholder="Phone number" />
            <Input type="text" label="Company" v-model="candidate.company" placeholder="Company" />
            <Input type="text" label="Street" v-model="candidate.address_street" placeholder="Street" />
            <Input type="text" label="City" v-model="candidate.address_city" placeholder="City" />
            <Input type="text" label="Country" v-model="candidate.address_country" placeholder="Country" />
            <Input type="text" label="Post Code" v-model="candidate.address_postcode" placeholder="Post Code" />
            <Label>Bio</Label>
            <textarea v-model="candidate.bio_text"
                class="peer h-28 w-full rounded-md border border-slate-400 bg-white focus-within:border-slate-400 pl-3 text-sm placeholder-slate-400 outline-none !ring-0 focus:ring-0"></textarea>
            <Label>Contract Type</Label>
            <Select v-model:selected:value="candidate.seeking_contract_type"
                :options="['apprenti', 'employee', 'cadre']" :label="`Contract Type`" />
            <Label>Seeking</Label>
            <Select v-model:selected:value="candidate.seeking_field" :options="['web', 'mobile']" :label="`Seeking`" />
            <Label>Seeking Rate</Label>
            <div class="flex items-center gap-x-2">
                <Slider class="w-[330px]" v-model:value="candidate.seeking_rate"/>
                <span>{{ candidate.seeking_rate[0] }} %</span>
            </div>

            <div class="pt-4">
                <Button @click="updateUser" class="w-full">Update Profile</Button>
            </div>
           
            <div class="pt-4">
                <Button @click="deleteCandidateModal = true" class="w-full">Delete Profile</Button>
            </div>

        </div>
        <Modal
            :show-modal="deleteCandidateModal"
            :show-buttons="false"
            @close="deleteCandidateModal = false"
            >
            <div class="space-y-2">
                <div class="text-xl font-medium">Will you delete this candidate?</div>

                <div class="space-y-4">
                <div class="text-sm text-slate-600">
                    If you delete profile, you will lost your all data.
                </div>
                </div>

                <div class="flex justify-end gap-2 pt-2">
                <Button :outline="true" @click="deleteCandidateModal = false" class="px-4">Cancel</Button>
                <Button @click="deleteCandidate" class="px-6">Ok</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { PhImage } from '@phosphor-icons/vue'
import Button from '@/components/Button.vue'
import Input from '@/components/input/Input.vue'
import { toast } from 'vue3-toastify'
import Select from '@/components/Select.vue'
import Slider from '@/components/Slider.vue'
import API from '@/utils/api/api'
import Label from '@/components/input/Label.vue'
import Modal from '@/components/Modal.vue'
import FullSpinner from '@/components/FullSpinner.vue'
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios'

const {logout} = useAuth0();
const avatarUploadInput = ref<HTMLInputElement | null>(null)
const userId = localStorage.getItem('user_id');
const deleteCandidateModal = ref(false);
const isUploading = ref<boolean>(false);
const candidate = reactive({
    id:0,
    first_name: "",
    last_name: "",
    phone: "",
    company: "",
    address_street: "",
    address_postcode: "",
    address_city: "",
    address_country: "",
    bio_text: "",
    seeking_contract_type: "",
    seeking_field: "",
    seeking_rate: [20],
    profile_photo: ""
});

onMounted(() => {
    getUser();
})

const triggerFileUplaodInput = () => {
    avatarUploadInput.value?.click();
}

const onFileInputChange = (event: any) => {
    const file = event.target.files[0];
    uploadAvatar(file);
};

const uploadAvatar = async (file: File) => {
    if (!file) {
        alert('Please select a file first!');
        return;
    }
    isUploading.value = true;

    const response = await API.getS3SignedURL(Number(userId), file.name)
    try {
        await axios.put('https://proxy.cors.sh/' + response.data.url, file, {
          headers: {
            'Content-Type': file.type,
            'x-amz-acl': 'public-read',
            'x-cors-api-key': "temp_368b76b526936e794eb3e109cc7fb026"
          },
        });
        const newURL = new URL(response.data.url)
        const imgUrl = newURL.origin + newURL.pathname + `?t=${Date.now()}`;
        candidate.profile_photo = imgUrl;
        console.log('File uploaded successfully:', imgUrl);
        isUploading.value = false;
        toast("Avatar image has been uploaded successfully!", {
            autoClose: 3000,
            theme: "light",
            type: "success"
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        toast("Failed to upload", {
            autoClose: 3000,
            theme: "light",
            type: "error"
        });
    } finally {
        avatarUploadInput.value!.value = '';
    }
};

const getUser = () => {
    API.getUserById(Number(userId))
        .then((response) => {
            candidate.id= response.data.candidate.id
            candidate.first_name = response.data.candidate.first_name;
            candidate.last_name = response.data.candidate.last_name;
            candidate.phone = response.data.candidate.phone;
            candidate.company = response.data.candidate.company;
            candidate.bio_text = response.data.candidate.bio_text;
            candidate.address_street = response.data.candidate.address_street;
            candidate.address_postcode = response.data.candidate.address_postcode;
            candidate.address_city = response.data.candidate.address_city;
            candidate.address_country = response.data.candidate.address_country;
            candidate.seeking_contract_type = response.data.candidate.seeking_contract_type;
            candidate.seeking_field = response.data.candidate.seeking_field;
            candidate.seeking_rate = [response.data.candidate.seeking_rate];
            candidate.profile_photo = response.data.candidate.profile_photo;
        })
}

const updateUser = () => {
    API.updateUserById(Number(userId), candidate)
        .then((response) => {
            getUser();
            toast("User info updated successfully!", {
                autoClose: 3000,
                theme: "light",
                type: "success"
            });
        })
}

const deleteCandidate = () => {
  API.deleteCandidate(candidate.id)
    .then((response:any)=> {
        localStorage.removeItem('user_id');
        localStorage.removeItem("user_role");
        logout({ 
            logoutParams: { 
                returnTo: window.location.origin 
            }
        });
    })
    .catch((error:any) => {
      console.log(error, "Error while deleting...")
      deleteCandidateModal.value = false
    })
}
</script>