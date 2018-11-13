import React from 'react';

import '../styles/Counter.css';

const Counter = (props) => {
    return (
        <div className="Counter">
            <span>No. of Earthquakes: {props.noOfQuakes}</span>
        </div>
    );
}

export default Counter;
