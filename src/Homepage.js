import React from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
export default function Homepage(props) {
    const { data, location } = props;
    const hourlyData = data?.hourly || [];
    return (
        <div>
            <h1>
                {data?.current?.temp &&
                    `The temperature in ${location.name}, ${
                        location.country
                    } is ${(data.current.temp - 273).toFixed(1)} C°`}
            </h1>
            <div style={{ width: '1200px' }}>
                {hourlyData.length > 0 && (
                    <Line
                        options={{
                            maintainAspectRation: true,
                        }}
                        data={{
                            labels: hourlyData.map((e) =>
                                moment(e.dt * 1000).format('DD/MM hh:mm')
                            ),
                            datasets: [
                                {
                                    label: 'Hourly Temp in C°',
                                    data: hourlyData.map((e) =>
                                        (e.temp - 273).toFixed(1)
                                    ),
                                    fill: false,
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgba(255, 99, 132, 0.2)',
                                },
                            ],
                        }}
                    />
                )}
            </div>
        </div>
    );
}
