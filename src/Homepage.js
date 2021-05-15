import React from 'react';

export default function Homepage(props) {
    const { data, location } = props;
    const hourlyData = data?.hourly || [];
    const hourlyTemp = hourlyData.map((e) => (
        <li>{`${(e.temp - 273).toFixed(1)} C°`}</li>
    ));
    return (
        <div>
            <h1>
                {data?.current?.temp &&
                    `The temperature in ${location.name}, ${
                        location.country
                    } is ${(data.current.temp - 273).toFixed(1)} C°`}
            </h1>
            <ul>{hourlyTemp}</ul>
        </div>
    );
}
