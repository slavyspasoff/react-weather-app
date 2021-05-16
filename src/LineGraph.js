import React from 'react';
import moment from 'moment';

import { Line } from 'react-chartjs-2';

export default function LineGraph(props) {
    return (
        <Line
            options={{
                maintainAspectRation: true,
            }}
            data={{
                labels: props.hourlyData.map((e) =>
                    moment(e.dt * 1000).format('DD/MM hh:mm')
                ),
                datasets: [
                    {
                        label: 'Hourly Temp in C°',
                        data: props.hourlyData.map((e) =>
                            (e.temp - 273).toFixed(1)
                        ),
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            }}
        />
    );
}
