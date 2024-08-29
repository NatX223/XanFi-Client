import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement,PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import React, { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

// Define the shape of the rates returned by the API for each day
interface DailyRates {
    [symbol: string]: number; // e.g., { BTC: 6903.113849, ETH: 383.02749 }
  }
  
  // Define the shape of the response from the API
interface RatesResponse {
  [date: string]: DailyRates; // e.g., { "2018-04-01": { BTC: 6903.113849, ETH: 383.02749 } }
}
  
  // Define the shape of the performance data calculated for each day
interface PerformanceData {
  date: string;
  performance: number;
}

const fetchDataForDate = async (date: string): Promise<DailyRates> => {
    const apiKey = '24dafec7769a2f630a3a6cacaa4633c1';
    const url = `https://api.coinlayer.com/${date}?access_key=${apiKey}&symbols=BTC,ETH`;

    const response = await fetch(url);
    const data = await response.json();
    return data.rates as DailyRates;
};

const fetchLast7DaysData = async (): Promise<RatesResponse> => {
    const ratesResponse: RatesResponse = {};

    for (let i = 0; i < 7; i++) {
        const date = new Date(new Date().setDate(new Date().getDate() - i))
            .toISOString()
            .split('T')[0];
        
        const dailyRates = await fetchDataForDate(date);
        ratesResponse[date] = dailyRates;
    }

    return ratesResponse;
};

const calculatePerformance = (rates: RatesResponse, symbols: string[], ratios: number[]): PerformanceData[] => {
    const performanceData: PerformanceData[] = [];

    for (const date in rates) {
        const dailyRates: DailyRates = rates[date];
        let performance = 0;

        symbols.forEach((symbol: string, index: number) => {
            const ratio = ratios[index] / 100;
            performance += dailyRates[symbol] * ratio;
        });

        performanceData.push({ date, performance });
    }

    return performanceData;
};

const formatChartData = (performanceData: PerformanceData[]) => {
    return {
        labels: performanceData.map((data) => data.date),
        datasets: [
            {
                label: 'Performance',
                data: performanceData.map((data) => data.performance),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
};

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

export const PerformanceChart = ({ ratios, symbols }: { ratios: number[], symbols: string[] }) => {
    const [chartData, setChartData] = useState<{ labels: string[], datasets: any[] } | null>(null);

    useEffect(() => {
        const fetchAndCalculatePerformance = async () => {
            const rates = await fetchLast7DaysData();
            const performanceData = calculatePerformance(rates, symbols, ratios);
            const data = formatChartData(performanceData);
            setChartData(data);
        };

        fetchAndCalculatePerformance();
    }, []);

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
                text: '7-Day Performance',
            },
        },
    };

    return chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>;
};
