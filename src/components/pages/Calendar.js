import React from 'react';
import './../common.scss';

 function Calendar(props){

    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const DAYS   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // const DAYS   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const getEventDates = (start, end)=>{
        if(new Date(start).getDay() === new Date(end).getDay()) {
            return `${DAYS[new Date(start).getDay()]}, ${new Date(start).getDate()} ${MONTHS[new Date(start).getMonth()]}`
        }
        else {
            return `${DAYS[new Date(start).getDay()]}, ${new Date(start).getDate()} ${MONTHS[new Date(start).getMonth()]} onwards`
        }
    }

    return(
        // <div className="calendar-div">
        //     <p className="calendar-date">
        //         {new Date(props.date).getDate()}
        //         <h5 className="calendar-month">{MONTHS[new Date(props.date).getMonth()]}</h5>
        //     </p>
            
        // </div>
        <span className="date-time">{getEventDates(props.startDate, props.endDate)}</span>
    )
}

export default Calendar;