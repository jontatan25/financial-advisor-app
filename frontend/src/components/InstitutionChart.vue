<template>
  <div
    class="p-8 w-custom-832 h-custom-460 border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col"
    role="region"
    aria-labelledby="financial-institution-heading"
  >
    <div class="mb-7">
      <h3 id="financial-institution-heading" class="mb-2 font-semibold text-2xl text-accent">
        By Financial Institution
      </h3>
      <p class="font-medium text-lg leading-7 text-ternary">
        Assets grouped by financial institution
      </p>
    </div>
    <div class="grow">
      <Bar
        v-if="!loading && loaded"
        :data="chartData"
        :options="chartOptions"
        aria-label="Financial institution distribution chart"
      />
      <p v-else-if="loading">Loading...</p>
      <p v-else>No data available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartOptions
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import type { Asset } from '@/types/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)



const props = defineProps<{
  loading: boolean
  assets: Asset[]
}>()

const loaded = ref(false)

const chartData = ref({
  labels: ['rothschildmartinmaurel', 'santander-e', 'caixabank'],
  datasets: [
    {
      label: 'ETF',
      backgroundColor: '#f87979',
      borderRadius: 8,
      data: [] as number[]
    },
    {
      label: 'Futures',
      backgroundColor: '#22CAAD',
      borderRadius: 8,
      data: [] as number[]
    },
    {
      label: 'Fixed Income',
      backgroundColor: '#3872FF',
      borderRadius: 8,
      data: [] as number[]
    },
    {
      label: 'Options',
      backgroundColor: '#FFD700',
      borderRadius: 8,
      data: [] as number[]
    },
    {
      label: 'Variable Income',
      backgroundColor: '#FF5733',
      borderRadius: 8,
      data: [] as number[]
    }
  ]
})

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true // Show the legend to differentiate between asset types
    },
    datalabels: {
      color: '#fff',
      formatter: (value: number) => {
        if (value >= 1e6) {
          return (value / 1e6).toFixed(2) + 'M'
        } else if (value >= 1e3) {
          return (value / 1e3).toFixed(2) + 'K'
        } else {
          return value.toFixed(0)
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#98A2B3', // Set font color
        font: {
          size: 14 // Set font size
        }
      },
      grid: {
        display: false // Remove grid lines
      }
    },
    y: {
      ticks: {
        color: '#98A2B3', // Set font color
        font: {
          size: 14 // Set font size
        },
        callback: function (value) {
          if (typeof value === 'number') {
            if (value >= 1e6) {
              return (value / 1e6).toFixed(2) + 'M'
            } else if (value >= 1e3) {
              return (value / 1e3).toFixed(2) + 'K'
            } else {
              return value.toFixed(0)
            }
          }
          return value
        }
      },
      grid: {
        display: false // Remove grid lines
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

  // Initialize totals for each entity and type
  const totals: Record<string, Record<string, number>> = {
    rothschildmartinmaurel: { ETF: 0, F: 0, FI: 0, O: 0, VI: 0 },
    'santander-e': { ETF: 0, F: 0, FI: 0, O: 0, VI: 0 },
    caixabank: { ETF: 0, F: 0, FI: 0, O: 0, VI: 0 }
  }

  // Calculate totals for each entity and type
  data.forEach((item) => {
    // Check if item.entity is a valid key in totals
    if (Object.prototype.hasOwnProperty.call(totals, item.entity)) {
      totals[item.entity][item.type] += item.balance
    }
  })

  // Update chart data with calculated totals
  chartData.value.datasets[0].data = [
    totals.rothschildmartinmaurel.ETF,
    totals['santander-e'].ETF,
    totals.caixabank.ETF
  ]

  chartData.value.datasets[1].data = [
    totals.rothschildmartinmaurel.F,
    totals['santander-e'].F,
    totals.caixabank.F
  ]

  chartData.value.datasets[2].data = [
    totals.rothschildmartinmaurel.FI,
    totals['santander-e'].FI,
    totals.caixabank.FI
  ]

  chartData.value.datasets[3].data = [
    totals.rothschildmartinmaurel.O,
    totals['santander-e'].O,
    totals.caixabank.O
  ]

  chartData.value.datasets[4].data = [
    totals.rothschildmartinmaurel.VI,
    totals['santander-e'].VI,
    totals.caixabank.VI
  ]

  loaded.value = true
}
</script>
