import React from 'react';
import moment from 'moment';

import { Line } from 'react-chartjs-2';

export default function LineGraph(props) {
    console.log(props.hourlyData);
    return (
        <Line
            options={{
                responsive: true,
                maintainAspectRatio: false,
            }}
            data={{
                labels: props.hourlyData.map((e) =>
                    moment(e.dt * 1000).format('hh:mm (DD/MM)')
                ),
                datasets: [
                    {
                        label: 'Hourly Temp in C°',
                        data: props.hourlyData.map((e) =>
                            (e.temp - 273).toFixed(1)
                        ),
                        fill: false,
                        backgroundColor: 'rgb(255, 0, 40)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                    {
                        label: 'Hourly Feels Like Temp in C°',
                        data: props.hourlyData.map((e) =>
                            (e.feels_like - 273).toFixed(1)
                        ),
                        fill: false,
                        backgroundColor: 'rgb(55, 110, 140)',
                        borderColor: 'rgba(55, 199, 132, 0.2)',
                    },
                ],
            }}
        />
    );
}
