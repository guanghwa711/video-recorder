<template>
  <div>
    <Tabs :tabs="tabs">
      <template #tab1>
        <Profile/>
      </template>
      <template #tab2>
        <div class="flex px-10">
          <div class="w-full max-w-60 space-y-3">
            <div class="font-medium">Job Title</div>
            <Select v-model:selected:value="selectedJobTitle" :options="['All', 'Web', 'Mobile']" />
            <!-- <Checkbox v-model:checked="jobTitle.web" label="Web" />
            <Checkbox v-model:checked="jobTitle.mobile" label="Mobile" /> -->
            
            <div class="mb-4 pt-6 font-medium">Contract Type</div>
            <Checkbox v-model:checked="contractType.apprenti" label="Apprenti" />
            <Checkbox v-model:checked="contractType.employee" label="Employee" />
            <Checkbox v-model:checked="contractType.cadre" label="Cadre" />

            <div class="mb-4 pt-6 font-medium">Seeking Rate</div>
            <!-- <Checkbox v-model:checked="enableSeekingRate" label="Enable Seeking Rate" /> -->
            <div class="flex items-center gap-x-2">
              <Slider v-model:value="seekingRate" />
              <span>{{ seekingRate[0] }} %</span>
            </div>
          </div>

          <div v-if="!isLoading && candidates.length > 0"  class="w-full grid grid-cols-1 gap-4">
            <Candidate
              @get-candidacies="getCandidacies"
              @get-candidates="getCandidates"
              :is-loading="true"
              v-for="candidate in candidates"
              :key="candidate.id"
              :candidateId="candidate.id"
              :firstName="candidate.first_name"
              :lastName="candidate.last_name"
              :email="candidate.candidate?.email"
              :phone="candidate.phone"
              :bio="candidate.bio_text"
              :video-id="candidate?.video_resume[0]?.video_id"
              :company="candidate?.company"
              :seeking_contract_type="candidate?.seeking_contract_type"
              :seeking_field= "candidate?.seeking_field"
              :seeking_rate="candidate?.seeking_rate"
              :profile_photo="candidate?.profile_photo"
            />
          </div>
          <div v-if="!isLoading && candidates.length == 0" class="m-auto font-medium text-xl text-gray-700">
            Not found
          </div>
          <div class="m-auto" v-if="isLoading">
            <Spinner />
          </div>
        </div>
      </template>

      <template #tab3>
        <div class="flex px-10">
          <div class="w-full max-w-60 space-y-3">
            <div class="mb-4 font-medium">Candidates</div>
            <Checkbox v-model:checked="candidacyStatus.shortlisted" label="Shortlisted" />
            <Checkbox v-model:checked="candidacyStatus.requested" label="Proposition Sent" />
            <Checkbox v-model:checked="candidacyStatus.approved" label="Proposition Accepted" />
            <Checkbox v-model:checked="candidacyStatus.declined" label="Proposition Declined" />
            <Checkbox v-model:checked="candidacyStatus.uninterested" label="Uninterested" />
          </div>

          <div v-if="candidacies.length > 0" class="w-full grid grid-cols-1 gap-4">
            <Candidate
              @get-candidacies="getCandidacies"
              v-for="candidacy in candidacies"
              :key="candidacy?.id"
              :candidateId="candidacy?.candidate?.id"
              :firstName="candidacy?.candidate?.first_name"
              :lastName="candidacy?.candidate?.last_name"
              :email="candidacy?.candidate?.candidate?.email"
              :phone="candidacy?.candidate?.phone"
              :proposition-date="candidacy?.candidate?.createdAt"
              :bio="candidacy?.candidate?.bio_text"
              :video-id="candidacy?.candidate?.video_resume[0]?.video_id"
              :status="candidacy?.status"
              :company="candidacy?.candidate?.company"
              :seeking_contract_type="candidacy?.candidate?.seeking_contract_type"
              :seeking_field= "candidacy?.candidate?.seeking_field"
              :seeking_rate="candidacy?.candidate?.seeking_rate"
              :profile_photo="candidacy?.candidate?.profile_photo"
            />
          </div>
          <div v-if="!isLoading && candidacies.length == 0" class="m-auto font-medium text-xl text-gray-700">
            Not found
          </div>
          <div class="m-auto" v-if="isLoading">
            <Spinner />
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
import Tabs from '@/components/Tabs.vue'
import Candidate from '../components/Candidate.vue'
import Checkbox from '@/components/Checkbox.vue'
import Select from '@/components/Select.vue'
import Slider from '@/components/Slider.vue'
import Profile from '../../profile/components/Recruiter.vue'
import API from '@/utils/api/api';
import Spinner from '@/components/Spinner.vue'
import type { ICandidateFilterObj } from '@/utils/common/types'
import { SEEKING_CONTRACT_TYPE, CANDIDACY_STATUS } from '@/utils/common/enums';

const candidates = ref<any[]>([])
const candidacies = ref<any[]>([])

const selectedJobTitle = ref<string>("All");
const seekingRate = ref<number[]>([100]);
// const enableSeekingRate = ref<boolean>(false);
const isLoading = ref<boolean>(true);
const userId = localStorage.getItem("user_id");

const contractType = reactive({
  apprenti: true,
  employee: true,
  cadre: true
})

const candidacyStatus = reactive({
  shortlisted: true,
  requested: true,
  approved: true,
  declined: true,
  uninterested: false
})

const tabs = [
  { title: 'My profile', value: 'tab1' },
  { title: 'Find candidate', value: 'tab2' },
  { title: 'My candidates', value: 'tab3' }
]

// onMounted(() => {
//   isLoading.value = true;
//   API.getCandidates()
//   .then(response => {
//     candidates.value = response.data
//     isLoading.value = false;
//   })
// })

const getCandidacies = () => {
  let queryParams: any = {
    status: [],
    user_id: userId
  };

  if (candidacyStatus.shortlisted) {
    queryParams.status.push(CANDIDACY_STATUS.SHORTLISTED)
  }

  if (candidacyStatus.approved) {
    queryParams.status.push(CANDIDACY_STATUS.APPROVED)
  }

  if (candidacyStatus.requested) {
    queryParams.status.push(CANDIDACY_STATUS.REQUESTED)
  }

  if (candidacyStatus.declined) {
    queryParams.status.push(CANDIDACY_STATUS.DECLINED)
  }

  if (candidacyStatus.uninterested) {
    queryParams.status.push(CANDIDACY_STATUS.UNINTERESTED)
  }
  
  API.getCandidacies(queryParams)
    .then(response => {
      candidacies.value = response.data
    })
}

const getCandidates = () => {
  isLoading.value = true;
  let queryParams: ICandidateFilterObj = {
    seeking_field: [],
    seeking_rate: [],
    seeking_contract_type: []
  };
  
  if(selectedJobTitle.value) {
    queryParams.seeking_field.push(selectedJobTitle.value.toLowerCase())
    if(selectedJobTitle.value == 'All') {
      queryParams.seeking_field  = []
    }
  }

  if(seekingRate.value) {
    queryParams.seeking_rate.push(seekingRate.value[0].toString())
  }
  // if (jobTitle.web) {
  //   queryParams.seeking_field.push(SEEKING_FIELD.WEB);
  // }
  // if (jobTitle.mobile) {
  //   queryParams.seeking_field.push(SEEKING_FIELD.MOBILE);
  // }
  if (contractType.apprenti) {
    queryParams.seeking_contract_type.push(SEEKING_CONTRACT_TYPE.APPRENTI);
  }
  if (contractType.employee) {
    queryParams.seeking_contract_type.push(SEEKING_CONTRACT_TYPE.EMPLOYEE);
  }
  if (contractType.cadre) {
    queryParams.seeking_contract_type.push(SEEKING_CONTRACT_TYPE.CADRE);
  }

  API.getCandidates(Number(userId), queryParams)
    .then(response => {
      candidates.value = response.data
      isLoading.value = false;
    })
}

watchEffect(() => {
  getCandidates();
})

watchEffect(() => {
  getCandidacies()
})
</script>
