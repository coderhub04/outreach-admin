import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
            border: {
                display: false,
            },
        },
    },
};


export default function UserBarGraph(chartData:any) {
    console.log('Chart Data user bar graph', chartData)
    const labels = chartData.chartData.posts.map((post:any) => post[0]);
    console.log("Labels", labels)
    
     const data = {
        labels,
        datasets: [
            {
                label: 'Users',
                data: chartData.chartData.users.map((post:any) => post[1]),
                backgroundColor: 'rgba(54, 162, 235, 0.8)', // Bar color
                borderColor: 'rgba(54, 162, 235, 0.8)', 
                borderWidth: 1,
            },
            {
                label: 'Posts',
                data: chartData.chartData.posts.map((post:any) => post[1]),
                backgroundColor: '#FFA0B4', // Bar color
                borderColor: '#FFA0B4',
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <div className="rounded-4 bg-white p-3 shadow-sm">
                <Bar options={options} data={data} />
            </div>
        </>
    );
}
