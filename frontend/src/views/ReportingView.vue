<template>
  <div class="mx-28">
    <div class="h-20 flex justify-between items-center mt-16 mb-12">
      <div>
        <p class="font-medium text-custom-40 leading-custom-48">Welcome, Jonathan</p>
        <p class="font-medium text-custom-24 text-ternary">
          Here’s an update of your assets today - {{ currentDate }}
        </p>
      </div>

      <button class="btn-state flex items-center bg-primary px-8 rounded-lg h-16">
        <p class="mr-3 text-white"><DownloadIcon /></p>
        <p class="text-white text-xl font-semibold">Download Report</p>
      </button>
    </div>
    <OverviewComponent :loading="loading" :assets="assets" />

    <div class="mb-8 flex justify-between">
      <CurrencyChart :loading="loading" :assets="assets" />
      <InvestmentChart :loading="loading" :assets="assets" />
      <InstitutionChart :loading="loading" :assets="assets" />
    </div>
    <TableComponent :loading="loading" :assets="assets" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import CurrencyChart from '@/components/CurrencyChart.vue'
import OverviewComponent from '@/components/OverviewComponent.vue'
import InvestmentChart from '@/components/InvestmentChart.vue'
import InstitutionChart from '@/components/InstitutionChart.vue'
import TableComponent from '@/components/TableComponent.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'

const router = useRouter()

const assets = ref([])
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL)
    assets.value = response.data
  } catch (error) {
    router.push({ name: 'NetworkError' })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const currentDate = computed(() => {
  const date = new Date()
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
})
</script>
