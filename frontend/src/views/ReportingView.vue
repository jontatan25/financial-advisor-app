<template>
  <div class="mx-28 min-w-custom-1663">
    <div class="h-20 flex justify-between items-center mt-16 mb-12">
      <div>
        <p class="font-medium text-custom-40 leading-custom-48">Welcome, {{ user.firstName }}</p>
        <p class="font-medium text-custom-24 text-ternary">
          Here’s an update of your assets today - {{ currentDate }}
        </p>
      </div>

      <button
        class="btn-state flex items-center bg-primary px-8 rounded-lg h-16"
        aria-label="Download Report"
        @click="downloadCSV"
      >
        <span class="mr-3 text-white" aria-hidden="true"><DownloadIcon /></span>
        <span class="text-white text-xl font-semibold">Download Report</span>
      </button>
    </div>
    <OverviewComponent :loading="loading" :assets="assets" />

    <div class="mb-8 flex justify-between">
      <CurrencyChart :loading="loading" :assets="assets" />
      <InvestmentChart :loading="loading" :assets="assets" />
      <InstitutionChart :loading="loading" :assets="assets" />
    </div>
    <TableComponent
      :loading="loading"
      :assets="assets"
      :total="total"
      :page="page"
      :limit="limit"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import CurrencyChart from '@/components/CurrencyChart.vue'
import OverviewComponent from '@/components/OverviewComponent.vue'
import InvestmentChart from '@/components/InvestmentChart.vue'
import InstitutionChart from '@/components/InstitutionChart.vue'
import TableComponent from '@/components/TableComponent.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import type { User, Asset } from '@/types/types'
import { useRiStore } from '@/store/ristore'

const { user } = useRiStore() as { user: User }

const router = useRouter()
const assets = ref<Asset[]>([])
const loading = ref<boolean>(false)
const total = ref<number>(0)
const page = ref<number>(1)
const limit = ref<number>(20)

const fetchData = async (page: number, limit: number) => {
  loading.value = true

  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + `/data?page=${page}&limit=${limit}`
    )

    const dataArray = JSON.parse(response.data.data)
    assets.value = dataArray
    total.value = response.data.total
  } catch (error) {
    router.push({ name: 'NetworkError' } as RouteLocationNormalized)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData(page.value, limit.value)
})

const currentDate = computed(() => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
})

const downloadCSV = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/download/csv', {
      responseType: 'blob' // Important: responseType should be 'blob' for file download
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'positionDataset.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Error downloading CSV:', error)
    router.push({ name: 'NetworkError' } as RouteLocationNormalized)
  }
}

const handlePageChange = (newPage: number) => {
  page.value = newPage
  fetchData(page.value, limit.value)
}
</script>
