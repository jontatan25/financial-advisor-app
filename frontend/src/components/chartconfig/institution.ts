// chartconfig/investment.js
export const data = {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Mutual Funds'],
    datasets: [
      {
        label: 'Bank A',
        backgroundColor: '#f87979',
        borderRadius: 8,
        data: [220, 280, 450, 330]
      },
      {
        label: 'Bank B',
        backgroundColor: '#22CAAD',
        borderRadius: 8,
        data: [180, 230, 400, 300]
      },
      {
        label: 'Bank C',
        backgroundColor: '#3872FF',
        borderRadius: 8,
        data: [240, 260, 420, 350]
      }
    ]
  };
  
  export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Show the legend to differentiate between datasets
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#98A2B3', // Set font color
          font: {
            size: 14, // Set font size
          },
        },
        grid: {
          display: false, // Remove grid lines
        },
      },
      y: {
        ticks: {
          color: '#98A2B3', // Set font color
          font: {
            size: 14, // Set font size
          },
        },
        grid: {
          display: false, // Remove grid lines
        },
      },
    },
  };
  