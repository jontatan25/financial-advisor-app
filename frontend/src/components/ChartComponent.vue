<template>
  <div>
    <h3>{{ title }}</h3>
    <Bar v-if="isChartDataValid" :chart-data="chartData" :options="chartOptions"></Bar>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  props: ['title', 'chartData'],
  components: {
    Bar
  },
  computed: {
    isChartDataValid() {
      console.log(this.chartData.labels)
      return this.chartData && this.chartData.labels && this.chartData.datasets
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
