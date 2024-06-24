<template>
  <div
    class="pt-8 w-full mb-11 h-full border-custom-1 border-custom-white rounded-3xl bg-white flex flex-col min-w-custom-1663"
  >
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
              <span v-if="index === 0">Name</span>
              <!-- Include 'Name' header specifically -->
              <span v-else>{{ column }}</span>
              <!-- Display other headers -->
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
      <p v-else-if="loading" class="p-8">Loading...</p>
      <p v-else>No data available</p>
    </div>
    <!-- Pagination Controls -->
    <div class="flex justify-center items-center pt-7 mb-7 border-t">
      <button
        class="px-4 py-2 mx-2 rounded text-lg"
        :class="{ 'text-ternary': page === 1 }"
        :disabled="page === 1"
        @click="goToFirstPage"
      >
        &lt;&lt;&lt;
      </button>
      <button
        class="px-4 py-2 mx-2 border rounded text-xl text-ridarktext border-ridarktext min-w-36"
        :class="{ 'text-ternary border-ternary': page === 1 }"
        :disabled="page === 1"
        @click="changePage(page - 1)"
      >
        Previous
      </button>
      <span class="px-2 font-medium">Page {{ page }}</span>
      <button
        class="px-4 py-2 mx-2 border rounded text-xl text-ridarktext border-ridarktext min-w-36"
        :class="{ 'text-ternary border-ternary': page >= totalPages }"
        :disabled="page >= totalPages"
        @click="changePage(page + 1)"
      >
        Next
      </button>
      <button
        class="px-4 py-2 mx-2 rounded text-lg"
        :class="{ 'text-ternary': page >= totalPages }"
        :disabled="page >= totalPages"
        @click="goToLastPage"
      >
        &gt;&gt;&gt;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import type { Asset } from '@/types/types'

const props = defineProps<{
  loading: boolean
  assets: Asset[]
  total: number
  page: number
  limit: number
}>()

const emits = defineEmits(['page-changed'])

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
function tableHeaderClass(index: number): string {
  return index === 0
    ? 'px-8 py-4 text-left font-semibold text-xl text-ridarktext bg-ritableheader border-t'
    : 'px-4 py-4 text-center font-semibold text-xl text-ridarktext bg-ritableheader border-t'
}

// Computed property for table cell classes
function tableCellClass(index: number, asset: Asset, rowIndex: number): string {
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
function renderTableCell(asset: Asset, column: string): string {
  switch (column) {
    case 'Name':
      return asset.name || 'N/A'
    case 'Type':
      return asset.type || 'N/A'
    case 'Currency':
      return asset.currency || 'N/A'
    case 'Entity':
      return asset.entity || 'N/A'
    case 'Number of Shares':
      return asset.number_of_shares !== undefined ? asset.number_of_shares.toString() : 'N/A'
    case 'Balance':
      return formatCurrency(asset.balance !== undefined ? asset.balance : 0)
    case 'Change (%)':
      return formatChange(asset.balance, asset.cost)
    case 'Gain/Loss (€)':
      return formatGainLoss(asset.balance, asset.cost)
    default:
      return ''
  }
}

// Helper function to format currency
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(value)
}

// Format functions for displaying data
function formatChange(balance: number, cost: number): string {
  if (cost === 0) return 'N/A'

  const change = ((balance - cost) / cost) * 100
  return isFinite(change) ? `${change > 0 ? '+' : ''}${change.toFixed(1)}%` : 'N/A'
}

function formatGainLoss(balance: number, cost: number): string {
  const gainLoss = balance - cost
  return `${gainLoss > 0 ? '+' : ''}${formatCurrency(gainLoss)}`
}

const totalPages = computed(() => Math.ceil(props.total / props.limit))

// Pagination Functions
const goToFirstPage = () => {
  emits('page-changed', 1)
}

const goToLastPage = () => {
  emits('page-changed', totalPages.value)
}

const changePage = (newPage: number) => {
  emits('page-changed', newPage)
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
