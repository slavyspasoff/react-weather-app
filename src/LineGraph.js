import React, { useState } from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';

import { Line, Bar } from 'react-chartjs-2';

export default function LineGraph(props) {
    const { data, location } = props;
    const [type, toggleType] = useState('hourly');
    const useToggle = () => {
        type === 'daily' ? toggleType('hourly') : toggleType('daily');
    };

    const hourlyTemp = {
        option: {
            scale: {
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
        },
        data: {
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
        },
    };

    const dailyTemp = {
        option: {
            scale: {
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
        },
        data: {
            labels: data.daily.map((e) => moment(e.dt * 1000).format('DD/MM')),
            datasets: [
                {
                    label: 'Day Temp C°',
                    data: data.daily.map((e) => (e.temp.day - 273).toFixed(1)),
                    fill: false,
                    cubicInterpolationMode: 'default',
                    backgroundColor: 'rgb(0, 255,0, 0.7)',
                    borderColor: 'rgba(0, 255, 255, 0.4)',
                    tension: '0.4',
                },
                {
                    label: 'Night Temp C°',
                    data: data.daily.map((e) =>
                        (e.temp.night - 273).toFixed(1)
                    ),
                    fill: false,
                    backgroundColor: 'rgb(255, 255, 0,0.7)',
                    borderColor: 'rgba(255, 100, 100, 0.4)',
                    cubicInterpolationMode: 'default',
                    tension: '0.4',
                },
            ],
        },
    };

    return (
        <>
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
                    scales:
                        type === 'daily'
                            ? dailyTemp.option.scale
                            : hourlyTemp.option.scale,
                }}
                data={type === 'daily' ? dailyTemp.data : hourlyTemp.data}
            />
            <Button onClick={useToggle}>Toggle Daily/Hourly</Button>
        </>
    );
}
