import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement,PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

function getColors(x: number): string[] {
    const colors: string[] = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 71, 0.2)',
        'rgba(144, 238, 144, 0.2)',
        'rgba(135, 206, 250, 0.2)',
        'rgba(255, 182, 193, 0.2)',
    ];

    return colors.slice(0, x);
}

export const AssetsChart = ({ ratio, assets }: { ratio: number[], assets: string[] }) => {
    const data = {
        labels: assets,
        datasets: [
            {
                label: 'Index Assets',
                data: ratio,
                backgroundColor: getColors(assets.length),
                borderColor: getColors(assets.length),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'left', // Position the legend to the left
                labels: {
                    boxWidth: 50, // Adjust the size of the legend boxes
                },
            },
        },
        maintainAspectRatio: false, // Allow custom size
    };

    return (
        <div style={{ width: '700px', height: '300px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export const PerformanceChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales 2024 (M)',
                data: [3, 2, 2, 1, 5, 4],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales',
            },
        },
    };

    return <Line data={data} options={options} />;
};
