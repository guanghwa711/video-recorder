<template>
  <div>
    <Tabs :tabs="tabs">
      <template #tab1>
        <div class="flex px-10">
          <div class="w-full max-w-60 space-y-3">
            <div class="font-medium">Job Title</div>
            <Select v-model:selected:value="selectedJobTitle" :options="['web', 'mobile', 'all']" />
            <!-- <Checkbox v-model:checked="jobTitle.web" label="Web" />
            <Checkbox v-model:checked="jobTitle.mobile" label="Mobile" /> -->
            
            <div class="mb-4 pt-6 font-medium">Contract Type</div>
            <Checkbox v-model:checked="contractType.apprenti" label="Apprenti" />
            <Checkbox v-model:checked="contractType.employee" label="Employee" />
            <Checkbox v-model:checked="contractType.cadre" label="Cadre" />

            <div class="mb-4 pt-6 font-medium">Seeking Rate</div>
            <Checkbox v-model:checked="enableSeekingRate" label="Enable Seeking Rate" />
            <div class="flex items-center gap-x-2">
              <Slider v-model:value="seekingRate" />
              <span>{{ seekingRate[0] }} %</span>
            </div>
          </div>

          <div v-if="!isLoading && candidates.length > 0"  class="grid grid-cols-1 gap-4">
            <Candidate
              :is-loading="true"
              v-for="candidate in candidates"
              :key="candidate.id"
              :candidateId="candidate.id"
              :firstName="candidate.first_name"
              :lastName="candidate.last_name"
              :bio="candidate.bio"
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

      <template #tab2>
        <div class="flex px-10">
          <div class="w-full max-w-60 space-y-3">
            <div class="mb-4 font-medium">Candidates</div>
            <Checkbox label="All candidates" />
            <Checkbox label="Shortlisted" />
            <Checkbox label="Not shortlisted" />

            <div class="mb-4 pt-6 font-medium">Contract type</div>
            <Checkbox label="Full time" />
            <Checkbox label="Short term" />
            <Checkbox label="Internship" />
          </div>

          <div class="grid grid-cols-1 gap-4">
            <Candidate
              v-for="candidate in candidatesWithCandidacy"
              :key="candidate.id"
              :candidateId="candidate.id"
              :firstName="candidate.firstName"
              :lastName="candidate.lastName"
              :proposition-date="candidate.Candidacy[0].createdAt"
              :bio="''"
            />
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, reactive } from 'vue'
import Tabs from '@/components/Tabs.vue'
import Candidate from '../components/Candidate.vue'
import Checkbox from '@/components/Checkbox.vue'
import Select from '@/components/Select.vue'
import Slider from '@/components/Slider.vue'
import API from '@/utils/api/api';
import Spinner from '@/components/Spinner.vue'
import type { ICandidateFilterObj } from '@/utils/common/types'
import { SEEKING_CONTRACT_TYPE } from '@/utils/common/enums';

const candidates = ref<any[]>([])

const selectedJobTitle = ref<string>("");
const seekingRate = ref<number[]>([20]);
const enableSeekingRate = ref<boolean>(false);
const isLoading = ref<boolean>(true);

const contractType = reactive({
  apprenti: false,
  employee: false,
  cadre: false
})

const tabs = [
  { title: 'Find candidate', value: 'tab1' },
  { title: 'My candidates', value: 'tab2' }
]

onMounted(() => {
  isLoading.value = true;
  API.getCandidates()
  .then(response => {
    candidates.value = response.data
    isLoading.value = false;
  })
})

watchEffect(() => {
  isLoading.value = true;
  let queryParams: ICandidateFilterObj = {
    seeking_field: [],
    seeking_rate: [],
    seeking_contract_type: []
  };
  
  if(selectedJobTitle.value) {
    queryParams.seeking_field.push(selectedJobTitle.value)
    if(selectedJobTitle.value == 'all') {
      queryParams.seeking_field  = []
    }
  }

  if(seekingRate.value && enableSeekingRate.value) {
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

  API.getCandidates(queryParams)
    .then(response => {
      candidates.value = response.data
      isLoading.value = false;
    })
})

const candidatesWithCandidacy = [
  {
    id: 3,
    firstName: 'Jack',
    lastName: 'Black',
    Candidacy: [
      {
        id: 1,
        createdAt: '24 April 2024'
      }
    ]
  }
]
</script>
