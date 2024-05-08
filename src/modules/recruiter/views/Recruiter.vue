<template>
  <div>
    <Tabs :tabs="tabs">
      <template #tab1>
        <div class="flex px-10">
          <div class="w-full max-w-60 space-y-3">
            <div class="mb-4 font-medium">Job Title</div>
            <Checkbox @update="jobTitle.web = !jobTitle.web" :checked="jobTitle.web" label="Web" />
            <Checkbox @update="jobTitle.mobile = !jobTitle.mobile" :checked="jobTitle.mobile" label="Mobile" />
            
            <div class="mb-4 pt-6 font-medium">Contract Type</div>
            <Checkbox @update="contractType.apprenti = !contractType.apprenti" :checked="contractType.apprenti" label="Apprenti" />
            <Checkbox @update="contractType.employee = !contractType.employee" :checked="contractType.employee" label="Employee" />
            <Checkbox @update="contractType.cadre = !contractType.cadre" :checked="contractType.cadre" label="Cadre" />
          </div>

          <div :hidden="candidates.length == 0" class="grid grid-cols-1 gap-4">
            <Candidate
              v-for="candidate in candidates"
              :key="candidate.id"
              :candidateId="candidate.id"
              :firstName="candidate.first_name"
              :lastName="candidate.last_name"
              :bio="candidate.bio"
            />
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
import API from '@/utils/api/api';
import type { ICandidateFilterObj } from '@/utils/common/types'

const candidates = ref<any[]>([])

const jobTitle = reactive({
  web: false,
  mobile: false
})

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
  API.getCandidates()
    .then(response => {
      candidates.value = response.data
    })
})

watchEffect(() => {
  let queryParams: ICandidateFilterObj = {
    seeking_field: [],
    seeking_rate: [],
    seeking_contract_type: []
  };
  if (jobTitle.web) {
    queryParams.seeking_field.push("web");
  }
  if (jobTitle.mobile) {
    queryParams.seeking_field.push("mobile");
  }
  if (contractType.apprenti) {
    queryParams.seeking_contract_type.push("apprenti")
  }
  if (contractType.employee) {
    queryParams.seeking_contract_type.push("employee")
  }
  if (contractType.cadre) {
    queryParams.seeking_contract_type.push("cadre")
  }

  API.getCandidates(queryParams)
    .then(response => {
      candidates.value = response.data
    })
})


// const candidates = [
//   {
//     id: 1,
//     firstName: 'John',
//     lastName: 'Doe'
//   },
//   {
//     id: 2,
//     firstName: 'Jane',
//     lastName: 'Doe'
//   }
// ]


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
