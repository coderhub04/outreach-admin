import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    DoughnutController,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title, DoughnutController);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        }
    },
};

interface DoughnutReportedType{
    labels:string[],
    data:number[]
}
export default function DoughnutReported({labels,data}:DoughnutReportedType) {
    return (
        <div className="rounded bg-white p-3 d-flex justify-content-center">
            <Doughnut
                options={options} 
             className='doughnut-chart'
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Reported Data',
                            data:data,
                            backgroundColor: ['#EFF6FC', '#EFFCEF', '#ffdcf3'],
                        },
                    ],
                }} 
            />
        </div>
    );
}


