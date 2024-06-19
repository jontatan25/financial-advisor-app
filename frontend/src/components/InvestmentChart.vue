<template>
  <div
    class="p-8 w-custom-400 h-custom-460 border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col"
  >
    <div class="mb-7">
      <h3 class="mb-2 font-semibold text-2xl text-accent">By Type of Investment</h3>
      <p class="font-medium text-lg leading-7 text-ternary">Assets grouped by investment type</p>
    </div>
    <div class="grow">
      <Bar :data="data" :options="options" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as chartConfig from './chartconfig/investment.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Bar
  },
  data() {
    return chartConfig
  }
}
</script>
