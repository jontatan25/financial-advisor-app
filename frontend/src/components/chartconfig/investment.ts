export const data = {
  labels: ['Stocks', 'Bonds', 'Real Estate', 'Mutual Funds'],
  datasets: [
    {
      backgroundColor: ['#f87979', '#22CAAD', '#3872FF', '#FFD700'],
      borderRadius: 8,
      data: [220, 280, 450, 330]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Hide the legend
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
        }
      },
      grid: {
        display: false // Remove grid lines
      }
    }
  }
}
