import React, { useState } from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';

import { Line, Bar } from 'react-chartjs-2';

export default function LineGraph(props) {
    const { data, location } = props;
    const [type, toggleType] = useState('hourly');
    const [lineOrBar, toggleLineOrBar] = useState('Line');

    const useToggle = () => {
        type === 'daily' ? toggleType('hourly') : toggleType('daily');
    };
    const useLineOrBar = () => {
        lineOrBar === 'Line' ? toggleLineOrBar('Bar') : toggleLineOrBar('Line');
    };

    const hourlyTemp = {
        option: {
            scale: {
                y: {
                    title: {
                        display: true,
                        text: moment(data.current.dt * 1000).format(
                            'DD-MM-YYYY'
                        ),
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
                .map((e) => moment(e.dt * 1000).format('HH:mm'))
                .slice(0, 24),
            datasets: [
                {
                    label: 'C°',
                    data: data.hourly
                        .map((e) => (e.temp - 273).toFixed(1))
                        .slice(0, 24),
                    fill: false,
                    cubicInterpolationMode: 'default',
                    backgroundColor: 'rgba(75, 101, 132,0.9)',
                    borderColor: 'rgba(119, 140, 163,1.0)',
                    tension: '0.4',
                },
                // {
                //     label: '(Feels Like) C°',
                //     data: data.hourly
                //         .map((e) => (e.feels_like - 273).toFixed(1))
                //         .slice(0, 24),
                //     fill: false,
                //     backgroundColor: 'rgb(255, 255, 0,0.7)',
                //     borderColor: 'rgba(255, 100, 100, 0.4)',
                //     cubicInterpolationMode: 'default',
                //     tension: '0.4',
                // },
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
                    label: 'Daily Temp (C°)',
                    data: data.daily.map((e) => (e.temp.day - 273).toFixed(1)),
                    fill: false,
                    cubicInterpolationMode: 'default',
                    backgroundColor: 'rgba(247, 212, 188,0.9)',
                    borderColor: 'rgba(247, 212, 188,1.0)',
                    tension: '0.4',
                },
                {
                    label: 'Nightly Temp (C°)',
                    data: data.daily.map((e) =>
                        (e.temp.night - 273).toFixed(1)
                    ),
                    fill: false,
                    backgroundColor: 'rgba(40, 47, 68,0.9)',
                    borderColor: 'rgba(40, 47, 68,1.0)',
                    cubicInterpolationMode: 'default',
                    tension: '0.4',
                },
            ],
        },
    };

    return (
        <>
            {lineOrBar === 'Line' ? (
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
            ) : (
                <Bar
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
            )}
            <Button onClick={useToggle}>Toggle Daily/Hourly</Button>
            <Button onClick={useLineOrBar}>Toggle Line/Bar</Button>
        </>
    );
}
