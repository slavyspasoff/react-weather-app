import React from 'react';
import moment from 'moment';

import { Line } from 'react-chartjs-2';

export default function LineGraph(props) {
    const { data, location } = props;
    return (
        <Line
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `${location.name} Current Temp: ${(
                            data.current.temp - 273
                        ).toFixed(1)} C° `,
                    },
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'temp in C',
                        },
                        // max: 30,
                        // min: 0,
                        ticks: {
                            stepSize: 1,
                        },
                    },
                },
            }}
            data={{
                labels: data.hourly
                    .map((e) => moment(e.dt * 1000).format('hh:mm (DD/MM)'))
                    .slice(0, 24),
                datasets: [
                    {
                        label: 'C°',
                        data: data.hourly
                            .map((e) => (e.temp - 273).toFixed(1))
                            .slice(0, 24),
                        fill: false,
                        cubicInterpolationMode: 'default',
                        backgroundColor: 'rgb(0, 255,0, 0.7)',
                        borderColor: 'rgba(0, 255, 255, 0.4)',
                        tension: '0.4',
                    },
                    {
                        label: '(Feels Like) C°',
                        data: data.hourly
                            .map((e) => (e.feels_like - 273).toFixed(1))
                            .slice(0, 24),
                        fill: false,
                        backgroundColor: 'rgb(255, 255, 0,0.7)',
                        borderColor: 'rgba(255, 100, 100, 0.4)',
                        cubicInterpolationMode: 'default',
                        tension: '0.4',
                    },
                ],
            }}
        />
    );
}
