<template>
  <div
    class="p-8 w-custom-400 h-custom-460 border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col"
  >
    <div class="mb-7">
      <h3 class="mb-2 font-semibold text-2xl text-accent">By Currency</h3>
      <p class="font-medium text-lg leading-7 text-ternary">Assets grouped by currency</p>
    </div>
    <div class="grow">
      <Doughnut v-if="loaded" :data="chartData" :options="chartOptions" />
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Doughnut } from 'vue-chartjs'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const loaded = ref(false)
const chartData = ref({
  labels: ['EUR(€)', 'USD($)', 'GBP'],
  datasets: [
    {
      backgroundColor: ['#0D192C', '#22CAAD', '#3872FF'],
      data: []
    }
  ]
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    },
    datalabels: {
      color: '#fff',
      formatter: (value, context) => {
        const dataset = context.chart.data.datasets[0]
        const total = dataset.data.reduce((acc, curr) => acc + curr, 0)
        const percentage = ((value / total) * 100).toFixed(1)
        return `${percentage}%`
      }
    }
  }
}

const fetchData = async () => {
  loaded.value = false

  try {
    const response = await axios.get('http://localhost:3000/api/data')
    const data = response.data

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
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
