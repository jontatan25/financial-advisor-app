<template>
  <div
    class="p-8 w-custom-400 h-custom-460 border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col"
    role="region"
    aria-labelledby="investment-type-heading"
  >
    <div class="mb-7">
      <h3 id="investment-type-heading" class="mb-2 font-semibold text-2xl text-accent">
        By Type of Investment
      </h3>
      <p class="font-medium text-lg leading-7 text-ternary">Assets grouped by investment type</p>
    </div>
    <div class="grow">
      <Bar
        v-if="!loading && loaded"
        :data="chartData"
        :options="chartOptions"
        aria-label="Investment type distribution chart"
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
  ArcElement,
  type ChartOptions
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import type { Asset } from '@/types/types'

// Register required Chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  loading: boolean
  assets: Asset[]
}>()

const loaded = ref(false)
const chartData = ref({
  labels: ['ETF', 'F', 'FI', 'O', 'VI'],
  datasets: [
    {
      backgroundColor: ['#f87979', '#22CAAD', '#3872FF', '#F5BC00', '#8A2BE2'],
      borderRadius: 8,
      data: [0, 0, 0, 0, 0] // Initial data array with zeroes
    }
  ]
})

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Hide the legend
    },
    datalabels: {
      color: '#fff',
      formatter: (value: number) => {
        if (value >= 1e6) {
          return (value / 1e6).toFixed(2) + 'M'
        } else {
          return value.toFixed(0)
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#98A2B3',
        font: {
          size: 14
        }
      },
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        color: '#98A2B3',
        font: {
          size: 14
        },
        callback: function (value: string | number) {
          // Adjusted to match the expected signature
          if (typeof value === 'number') {
            if (value >= 1e6) {
              return (value / 1e6).toFixed(2) + 'M'
            } else {
              return value.toFixed(0)
            }
          }
          return value // Return the value as-is if it's not a number
        }
      },
      grid: {
        display: false
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

  let totalETF = 0
  let totalF = 0
  let totalFI = 0
  let totalO = 0
  let totalVI = 0

  data.forEach((item) => {
    switch (item.type) {
      case 'ETF':
        totalETF += item.balance
        break
      case 'F':
        totalF += item.balance
        break
      case 'FI':
        totalFI += item.balance
        break
      case 'O':
        totalO += item.balance
        break
      case 'VI':
        totalVI += item.balance
        break
      default:
        break
    }
  })

  chartData.value.datasets[0].data = [totalETF, totalF, totalFI, totalO, totalVI]

  loaded.value = true
}
</script>
