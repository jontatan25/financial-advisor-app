<template>
  <div
    class="pt-8 w-full mb-11 h-full border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col"
  >
    <div class="mb-7 px-8">
      <h3 class="mb-2 font-semibold text-2xl text-accent">My Investment Assets</h3>
      <p class="font-medium text-lg leading-7 text-ternary">
        Explore your investment details and keep up to date
      </p>
    </div>
    <div class="grow">
      <table v-if="!loading && assets.length" class="min-w-full table-auto">
        <thead>
          <tr>
            <th
              v-for="(column, index) in tableColumns"
              :key="index"
              :class="tableHeaderClass(index)"
            >
              {{ column === 'Name' ? 'Name' : '' }}
              <span v-if="column !== 'Name'">{{ column }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(asset, rowIndex) in assets" :key="asset.id">
            <td
              v-for="(column, index) in tableColumns"
              :key="index"
              :class="tableCellClass(index, asset, rowIndex)"
            >
              <div v-if="index === 0" class="h-full px-4 py-2">
                <div class="truncate">{{ asset.name }}</div>
              </div>
              <div v-else class="flex items-center justify-center h-full px-4 py-2">
                {{ renderTableCell(asset, column) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else-if="loading">Loading...</p>
      <p v-else>No data available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

defineProps<{
  loading: boolean
  assets: Array<{
    id: string
    name: string
    type: string
    currency: string
    entity: string
    number_of_shares: number
    balance: number
    cost: number
    rate_to_euro: number
  }>
}>()

// Helper functions to format the display values
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(value)
}

const formatChange = (balance: number, cost: number) => {
  if (cost === 0) return 'N/A'

  const change = ((balance - cost) / cost) * 100
  if (!isFinite(change)) return 'N/A' // Handle division by zero or invalid data

  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}

const formatGainLoss = (balance: number, cost: number) => {
  const gainLoss = balance - cost
  const sign = gainLoss > 0 ? '+' : ''
  return `${sign}${formatCurrency(gainLoss)}`
}

// Define table columns
const tableColumns = computed(() => {
  return [
    'Name',
    'Type',
    'Currency',
    'Entity',
    'Number of Shares',
    'Balance',
    'Change (%)',
    'Gain/Loss (€)'
  ]
})

// Computed property for table header classes
function tableHeaderClass(index: number) {
  if (index === 0) {
    return 'px-8 py-4 text-left font-semibold text-xl text-ridarktext bg-ritableheader border-t '
  } else {
    return 'px-4 py-4 text-center font-semibold text-xl text-ridarktext bg-ritableheader border-t '
  }
}

// Computed property for table cell classes
const tableCellClass = (index: number, asset: any, rowIndex: number) => {
  if (index === 4) {
    return 'border-t px-4 py-4 font-medium text-ripurple text-xl'
  } else if (index === 6) {
    const change = ((asset.balance - asset.cost) / asset.cost) * 100
    if (!isFinite(change)) return 'border-t px-4 py-4 font-medium text-ridarktext text-xl'
    return change > 0
      ? 'border-t px-4 py-4 font-medium text-risuccess text-xl'
      : 'border-t px-4 py-4 font-medium text-ridanger text-xl'
  } else if (index === 7) {
    const gainLoss = asset.balance - asset.cost
    return gainLoss > 0
      ? 'border-t px-4 py-4 font-medium text-risuccess text-xl'
      : 'border-t px-4 py-4 font-medium text-ridanger text-xl'
  } else if (rowIndex === 0) {
    return 'border-t px-4 py-4 font-medium text-ridarktext text-xl'
  } else {
    return 'border-t px-4 py-4 font-medium text-ridarktext text-xl'
  }
}

// Helper function to render table cell content based on column key
const renderTableCell = (asset: any, column: string) => {
  switch (column) {
    case 'Name':
      return asset.name
    case 'Type':
      return asset.type
    case 'Currency':
      return asset.currency
    case 'Entity':
      return asset.entity
    case 'Number of Shares':
      return asset.number_of_shares
    case 'Balance':
      return formatCurrency(asset.balance)
    case 'Change (%)':
      return formatChange(asset.balance, asset.cost)
    case 'Gain/Loss (€)':
      return formatGainLoss(asset.balance, asset.cost)
    default:
      return ''
  }
}
</script>

<style scoped>
.truncate {
  max-width: 350px; /* Adjust max-width as needed */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
