<template>
  <div
    class="p-8 w-custom-400 h-custom-460 border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col"
  >
    <div class="mb-7">
      <h3 class="mb-2 font-semibold text-2xl text-accent">By Currency</h3>
      <p class="font-medium text-lg leading-7 text-ternary">Assets grouped by currency</p>
    </div>
    <div class="grow">
      <Doughnut :data="data" :options="options" />
    </div>
  </div>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Doughnut } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default {
  name: 'App',
  components: {
    Doughnut
  },
  data() {
    return chartConfig
  }
}
</script>
