// chartConfig.js


export const data = {
    labels: ['EUR(€)', 'USD($)', 'GBP'],
    datasets: [
        {
            backgroundColor: ['#0D192C', '#22CAAD', '#3872FF'],
            data: [40, 20, 80],
        },
    ],
};

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
        },
        datalabels: {
            color: '#fff',
            formatter: (value, context) => {
                const dataset = context.chart.data.datasets[0];
                const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
            },
        },
    },
};
