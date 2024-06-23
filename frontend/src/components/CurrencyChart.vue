<template>
  <div
    class="p-8 w-custom-400 h-custom-460 border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col"
    role="region"
    aria-labelledby="by-currency-heading"
  >
    <div class="mb-7">
      <h3 id="by-currency-heading" class="mb-2 font-semibold text-2xl text-accent">By Currency</h3>
      <p class="font-medium text-lg leading-7 text-ternary">Assets grouped by currency</p>
    </div>
    <div class="grow">
      <Doughnut
        v-if="!loading && loaded"
        :data="chartData"
        :options="chartOptions"
        aria-label="Currency distribution chart"
      />
      <p v-else-if="loading">Loading...</p>
      <p v-else>No data available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { Chart, ArcElement, Tooltip, Legend, type ChartOptions } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Doughnut } from 'vue-chartjs'
import type { Asset } from '@/types/types'

// Register required Chart.js components and plugins
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const props = defineProps<{
  loading: boolean
  assets: Asset[]
}>()

const loaded = ref(false)
const chartData = ref({
  labels: ['EUR(€)', 'USD($)', 'GBP(£)'],
  datasets: [
    {
      backgroundColor: ['#0D192C', '#22CAAD', '#3872FF'],
      data: [0, 0, 0] // Initial data array with zeroes
    }
  ]
})

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    },
    datalabels: {
      color: '#fff',
      formatter: (value: number, context) => {
        // Ensure context.dataset is defined and has data property
        if (!context.dataset || !context.dataset.data) {
          return ''
        }

        const datasetData = context.dataset.data as number[]
        const total = datasetData.reduce((acc, curr) => acc + curr, 0)
        const percentage = ((value / total) * 100).toFixed(1)
        return `${percentage}%`
      }
    }
  }
}

// Watch for changes in assets prop and update chartData
watch(
  () => props.assets,
  (newVal) => {
    updateChartData(newVal)
  }
)

const updateChartData = (data: Asset[]) => {
  loaded.value = false

  // Initialize totals for each currency
  let totalEUR = 0
  let totalUSD = 0
  let totalGBP = 0

  // Calculate totals for each currency
  data.forEach((item) => {
    switch (item.currency) {
      case 'EUR':
        totalEUR += item.balance
        break
      case 'USD':
        totalUSD += item.balance
        break
      case 'GBP':
        totalGBP += item.balance
        break
      default:
        break
    }
  })

  // Update chart data with calculated totals
  chartData.value.datasets[0].data = [totalEUR, totalUSD, totalGBP]

  loaded.value = true
}
</script>
