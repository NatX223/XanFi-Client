import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement,PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { subDays, format } from 'date-fns';

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
            position: 'left' as const,
            labels: {
              boxWidth: 50,
            },
          },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '700px', height: '300px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export const PerformanceChart = () => {
    const [chartData, setChartData] = useState<{ labels: string[], datasets: any[] } | null>(null);

    useEffect(() => {
        const fetchAndCalculatePerformance = async () => {
            const dates = Array.from({ length: 7 }, (_, i) => 
                format(subDays(new Date(), i), 'MM/dd')
            ).reverse();
    
            // Generate random performance data for each of the past 7 days
            const performanceData = Array.from({ length: 7 }, () => 
                Math.floor(Math.random() * 20) + 1 // Random number between 1 and 20
            );
    
            const data = {
                labels: dates,
                datasets: [
                    {
                        label: 'Performance',
                        data: performanceData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                    },
                ],
            };
    
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
                position: 'top' as const, // Use 'as const' to ensure it's interpreted as a literal type
            },
            title: {
                display: true,
                text: '7-Day Performance',
            },
        },
    };

    return chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>;
};
