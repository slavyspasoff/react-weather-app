import React from 'react';

export default function Homepage(props) {
    const { data } = props;
    return (
        <div>
            <h1>{data?.timezone}</h1>
        </div>
    );
}
