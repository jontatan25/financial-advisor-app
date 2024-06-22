<template>
  <div class="pt-8 w-full mb-11 h-full border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col">
    <div class="mb-7 px-8">
      <h3 class="mb-2 font-semibold text-2xl text-accent">My Investment Assets</h3>
      <p class="font-medium text-lg leading-7 text-ternary">
        Explore your investment details and keep up to date
      </p>
    </div>
    <div class="grow">
      <!-- Display table when assets are loaded and available -->
      <table v-if="!loading && assets.length" class="min-w-full table-auto">
        <thead>
          <tr>
            <th
              v-for="(column, index) in tableColumns"
              :key="index"
              :class="tableHeaderClass(index)"
            >
              <span v-if="index === 0">Name</span> <!-- Include 'Name' header specifically -->
              <span v-else>{{ column }}</span> <!-- Display other headers -->
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
                <div class="truncate">{{ renderTableCell(asset, column) }}</div>
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

// Define props for loading state and assets data
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

// Define table columns as computed property
const tableColumns = computed(() => [
  'Name',
  'Type',
  'Currency',
  'Entity',
  'Number of Shares',
  'Balance',
  'Change (%)',
  'Gain/Loss (€)'
])

// Computed property for table header classes
function tableHeaderClass(index: number) {
  return index === 0
    ? 'px-8 py-4 text-left font-semibold text-xl text-ridarktext bg-ritableheader border-t'
    : 'px-4 py-4 text-center font-semibold text-xl text-ridarktext bg-ritableheader border-t'
}

// Computed property for table cell classes
const tableCellClass = (index: number, asset: any, rowIndex: number) => {
  if (index === 4) {
    return 'border-t px-4 py-4 font-medium text-ripurple text-xl'
  } else if (index === 6) {
    const change = ((asset.balance - asset.cost) / asset.cost) * 100
    return !isFinite(change)
      ? 'border-t px-4 py-4 font-medium text-ridarktext text-xl'
      : change > 0
        ? 'border-t px-4 py-4 font-medium text-risuccess text-xl'
        : 'border-t px-4 py-4 font-medium text-ridanger text-xl'
  } else if (index === 7) {
    const gainLoss = asset.balance - asset.cost
    return gainLoss > 0
      ? 'border-t px-4 py-4 font-medium text-risuccess text-xl'
      : 'border-t px-4 py-4 font-medium text-ridanger text-xl'
  } else {
    return rowIndex === 0
      ? 'border-t px-4 py-4 font-medium text-ridarktext text-xl'
      : 'border-t px-4 py-4 font-medium text-ridarktext text-xl'
  }
}

// Helper function to render table cell content based on column key
const renderTableCell = (asset: any, column: string) => {
  switch (column) {
    case 'Name':
      return asset.name || 'N/A'
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

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(value)
}

// Format functions for displaying data
const formatChange = (balance: number, cost: number) => {
  if (cost === 0) return 'N/A'

  const change = ((balance - cost) / cost) * 100
  return isFinite(change) ? `${change > 0 ? '+' : ''}${change.toFixed(1)}%` : 'N/A'
}

const formatGainLoss = (balance: number, cost: number) => {
  const gainLoss = balance - cost
  return `${gainLoss > 0 ? '+' : ''}${formatCurrency(gainLoss)}`
}
</script>

<style scoped>
.truncate {
  max-width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
