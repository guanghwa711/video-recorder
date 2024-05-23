<template>
    <div class="flex h-full items-center justify-center">
        <div class="flex w-full max-w-sm flex-col space-y-4">
            <div class="mb-4 flex justify-center">
                <div class="flex h-40 w-40 items-center justify-center rounded-xl bg-slate-100 p-6">
                    <PhImage class="h-full w-full text-slate-300" />
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
            <textarea v-model="candidate.bio_text" class="peer h-28 w-full rounded-md border border-slate-400 bg-white focus-within:border-slate-400 pl-3 text-sm placeholder-slate-400 outline-none !ring-0 focus:ring-0"></textarea>
            <Label>Contract Type</Label>
            <Select v-model:selected:value="candidate.seeking_contract_type" :options="['apprenti', 'employee', 'cadre']" :label="`Contract Type`" />
            <Label>Seeking</Label>
            <Select  v-model:selected:value="candidate.seeking_field" :options="['web', 'mobile']" :label="`Seeking`"/>
            <Label>Seeking Rate</Label>
            <div class="flex items-center gap-x-2">
                <Slider v-model:value="candidate.seeking_rate" />
                <span>{{ candidate.seeking_rate[0] }} %</span>
            </div>

            <div class="pt-4">
                <Button @click="updateUser" class="w-full">Update Profile</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { PhImage } from '@phosphor-icons/vue'
import Button from '@/components/Button.vue'
import Input from '@/components/input/Input.vue'
import { toast } from 'vue3-toastify'
import Select from '@/components/Select.vue'
import Slider from '@/components/Slider.vue'
import API from '@/utils/api/api'
import Label from '@/components/input/Label.vue'

const userId = localStorage.getItem('user_id')
const candidate = reactive({
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
    seeking_rate: [20]
});

onMounted(() => {
    getUser();
})

const getUser = () => {
    API.getUserById(Number(userId))
        .then((response) => {
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
</script>