<template>
    <div class="grid grid-cols-5 grid-rows-6 w-full gap-4">
        <div class="rounded-lg col-span-5 row-span-6 lg:col-span-3 h-full bg-slate-200 shadow">
            <div class="bg-[url('src/assets/profile.png')] h-24 bg-cover rounded-tl-lg rounded-tr-lg">
                <img :src="candidate.profile_photo" alt="avatar image"
                    class="mt-6 ml-9 w-32 h-32 rounded-full absolute object-cover" />
            </div>
            <div class="flex mt-24 border-indigo-900 border-b mx-7 items-center">
                <!-- <h6 class="text-black text-xl font-bold leading-7 w-64">
                    Last Name First Name of the Candidate
                </h6> -->
                <h6 class="text-black text-xl font-bold leading-7">
                    {{ candidate.first_name }} {{ candidate.last_name }}
                </h6>
                <!-- <DatePicker/> -->
                <h6 class="ml-auto text-black text-lg font-normal">mm.dd.yy</h6>
                <EditIcon class="ml-7 cursor-pointer" @click="chageStatus"/>
            </div>
            <div class="px-11 py-2 space-y-4">
                <h6 class="text-black text-lg font-normal mb-9">Candidate Title</h6>
                <h6 class="text-black text-lg font-normal">Address : {{ candidate?.address_street }}</h6>
                <h6 class="text-black text-lg font-normal">Zip Code and City: {{ candidate?.address_postcode }} {{ candidate?.address_city }} </h6>
                <h6 class="text-black text-lg font-normal">Telephone Number: {{ candidate?.phone }}</h6>
                <h6 class="text-black text-lg font-normal">Email</h6>
            </div>
        </div>
        <div class="col-span-5 lg:col-span-2 row-span-3 bg-slate-200 py-4 px-6 rounded-lg shadow">
            <div class="flex pb-2 border-indigo-900 border-b mb-1 items-center">
                <h6 class="text-black text-xl font-bold leading-7">
                    My experiences
                </h6>
                <EditIcon class="ml-auto cursor-pointer" @click="chageStatus"/>
            </div>
            <ul class="space-y-1 px-7">
                <li class="text-black text-lg font-normal list-disc">Most recent job</li>
                <li class="text-black text-lg font-normal list-disc">Job dates</li>
                <li class="text-black text-lg font-normal list-disc">Job before</li>
                <li class="text-black text-lg font-normal list-disc">Job dates</li>
                <li class="text-black text-lg font-normal list-disc">Job less recent </li>
                <li class="text-black text-lg font-normal list-disc">Job dates</li>
            </ul>
        </div>
        <div class="col-span-5 lg:col-span-2 row-span-3 bg-slate-200 py-4 px-6 rounded-lg shadow">
            <div class="flex pb-2 border-indigo-900 border-b mb-1 items-center">
                <h6 class="text-black text-xl font-bold leading-7">
                    My Training
                </h6>
                <EditIcon class="ml-auto cursor-pointer" @click="chageStatus"/>
            </div>
            <ul class="space-y-1 px-7">
                <li class="text-black text-lg font-normal list-disc">Highest Training</li>
                <li class="text-black text-lg font-normal list-disc">Training dates</li>
                <li class="text-black text-lg font-normal list-disc">Highest Training</li>
                <li class="text-black text-lg font-normal list-disc">Training dates</li>
                <li class="text-black text-lg font-normal list-disc">Highest Training</li>
                <li class="text-black text-lg font-normal list-disc">Training dates</li>
            </ul>
        </div>
    </div>
    <div class="flex grid-cols-4 justify-center bg-slate-200 rounded-lg shadow px-11 py-9 gap-20 mt-10">
        <img src="../../assets/2.png" alt="avatar image"
            class="w-[426px] h-[421px] col-span-4 lg:col-span-2 object-cover rounded-tl rounded-tr" />
        <div class="col-span-4 lg:col-span-2">
            <div class="text-black text-5xl font-normal leading-[52px] mb-8">Video FAQ</div>
            <div class="w-[464px] h-[50px] relative space-y-9">
                <div class="rounded shadow py-3 px-5 flex bg-white">
                    <div class="flex mr-5">
                        <h6 class="text-red-600 text-2xl font-black mr-1">i</h6>
                        <h6 class="text-indigo-900 text-2xl font-black">i</h6>
                    </div>
                    <div class=" text-black text-lg font-normal leading-7 ">Lorem Ipsum .. </div>
                    <h6 class="ml-auto text-2xl font-black">></h6>
                </div>
                <div class="rounded shadow py-3 px-5 flex bg-white">
                    <div class="flex mr-5">
                        <h6 class="text-red-600 text-2xl font-black mr-1">i</h6>
                        <h6 class="text-indigo-900 text-2xl font-black">i</h6>
                    </div>
                    <div class=" text-black text-lg font-normal leading-7 ">Lorem Ipsum .. </div>
                    <h6 class="ml-auto text-2xl font-black">></h6>
                </div>
                <div class="rounded shadow py-3 px-5 flex bg-white">
                    <div class="flex mr-5">
                        <h6 class="text-red-600 text-2xl font-black mr-1">i</h6>
                        <h6 class="text-indigo-900 text-2xl font-black">i</h6>
                    </div>
                    <div class=" text-black text-lg font-normal leading-7 ">Lorem Ipsum .. </div>
                    <h6 class="ml-auto text-2xl font-black">></h6>
                </div>
                <div class="rounded shadow py-3 px-5 flex bg-white">
                    <div class="flex mr-5">
                        <h6 class="text-red-600 text-2xl font-black mr-1">i</h6>
                        <h6 class="text-indigo-900 text-2xl font-black">i</h6>
                    </div>
                    <div class=" text-black text-lg font-normal leading-7 ">Lorem Ipsum .. </div>
                    <h6 class="ml-auto text-2xl font-black">></h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import EditIcon from '../../assets/EditIcon.vue'
import API from '@/utils/api/api'

const userId = localStorage.getItem('user_id');

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

const emit = defineEmits<{
  (e: 'getStatus'): void;
}>();

const chageStatus = () =>{
    emit('getStatus')
}

onMounted(() => {
    getUser();
})

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

</script>