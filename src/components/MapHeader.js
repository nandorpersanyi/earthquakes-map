import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import '../styles/MapHeader.css';

const MapHeader = (props) => {
    return(
        <div id="map-header">
            <div id="map-title">
                <h2>{props.mapTitle}</h2>
                <div id="select-timeframe">
                <Select onChange={props.changeTimeFrame} value={props.selectedTimeFrame}>
                    <MenuItem value="past-day">past Day</MenuItem>
                    <MenuItem value="past-hour">past Hour</MenuItem>
                    <MenuItem value="past-7days">past 7 Days</MenuItem>
                    <MenuItem value="past-30days">past 30 Days (M1.0+)</MenuItem>
                </Select>
                </div>
            </div>
            <TextField className="CountryFilter" placeholder="Filter on country, state or city..." onChange={props.addCountryFilter}/>
        </div>
    );
}

export default MapHeader;
