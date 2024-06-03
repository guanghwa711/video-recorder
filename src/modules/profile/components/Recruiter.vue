<template>
  <div class="flex h-full items-center justify-center">
    <div class="flex min-w-[280px] w-full min-[450px]:w-[400px] flex-col space-y-4 px-8 sm:p-0">
      <Input type="text" label="First name" v-model="recruiter.first_name" placeholder="First name" />
      <Input type="text" label="Last name" v-model="recruiter.last_name" placeholder="Last name" />
      <Input type="text" label="Phone number" v-model="recruiter.phone" placeholder="Phone number" />
      <Input type="text" label="Company" v-model="recruiter.company" placeholder="Company" />
      <Input type="text" label="Street" v-model="recruiter.address_street" placeholder="Street" />
      <Input type="text" label="City" v-model="recruiter.address_city" placeholder="City" />
      <Input type="text" label="Country" v-model="recruiter.address_country" placeholder="Country" />
      <Input type="text" label="Post Code" v-model="recruiter.address_postcode" placeholder="Post Code" />
      <Input type="number" label="Commerce Registration" v-model="recruiter.commerce_registration"
        placeholder="Commerce Registration" />

      <div class="pt-4">
        <Button @click="updateUser" class="w-full md:w-[400px]">Update Profile</Button>
      </div>
      <div class="pt-[10px] !m-0">
          <Button @click="deleteRecruiterModal = true" class="w-full md:w-[400px]">Delete Profile</Button>
      </div>
    </div>
  </div>
  <Modal
    :show-modal="deleteRecruiterModal"
    :show-buttons="false"
    @close="deleteRecruiterModal = false"
    >
    <div class="space-y-2">
        <div class="text-xl font-medium">Will you delete this candidate?</div>

        <div class="space-y-4">
        <div class="text-sm text-slate-600">
            If you delete profile, you will lost your all data.
        </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
        <Button :outline="true" @click="deleteRecruiterModal = false" class="px-4">Cancel</Button>
        <Button @click="deleteRecruiter" class="px-6">Ok</Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/input/Input.vue'
import Modal from '@/components/Modal.vue'
import { toast } from 'vue3-toastify'
import API from '@/utils/api/api'
import { useAuth0 } from '@auth0/auth0-vue';
const {logout} = useAuth0();

const userId = localStorage.getItem('user_id')
const deleteRecruiterModal = ref(false)
const recruiter = reactive({
  id: 0,
  first_name: "",
  last_name: "",
  phone: "",
  company: "",
  address_street: "",
  address_postcode: "",
  address_city: "",
  address_country: "",
  commerce_registration: ""
});

onMounted(() => {
  getUser();
})

const getUser = () => {
  API.getUserById(Number(userId))
    .then((response) => {
      recruiter.id = response.data.recruiter.id;
      recruiter.first_name = response.data.recruiter.first_name;
      recruiter.last_name = response.data.recruiter.last_name;
      recruiter.phone = response.data.recruiter.phone;
      recruiter.company = response.data.recruiter.company;
      recruiter.address_street = response.data.recruiter.address_street;
      recruiter.address_postcode = response.data.recruiter.address_postcode;
      recruiter.address_city = response.data.recruiter.address_city;
      recruiter.address_country = response.data.recruiter.address_country;
      recruiter.commerce_registration = response.data.recruiter.commerce_registration;
    })
}

const updateUser = () => {
  API.updateUserById(Number(userId), recruiter)
    .then((response) => {
      getUser();
      toast("User info updated successfully!", {
        autoClose: 3000,
        theme: "light",
        type: "success"
      });
    })
}

const deleteRecruiter = () => {
  API.deleteRecruiter(recruiter.id)
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
      deleteRecruiterModal.value = false
    })
}
</script>