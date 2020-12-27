import React from 'react';
import './../common.scss';

 function Calendar(props){

    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const DAYS   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return(
        <div className="calendar-div">
            <h5 className="calendar-month">{MONTHS[new Date(props.date).getMonth()]}</h5>
            <p className="calendar-date">{new Date(props.date).getDate()}</p>
        </div>
    )
}

export default Calendar;