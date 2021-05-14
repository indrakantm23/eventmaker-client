import React from 'react';
import './../common.scss';
import Calendar from './Calendar';
import DefaultImage from './../../assets/images/banner-two.jpg';
import CommonService from './../commonService';
import { PinDropSharp } from '@material-ui/icons';

 function EventCard(props){
    // console.log(props)
    const editEvent = (e) => {
        console.log(e)
    }
    const trimText = str => {
        return str.length > 40 ? str.substr(0, 40)+'...' : str;
    }
    const getOnlineName = url => {
        if(url) {
            if(url.includes('google')){
                return 'Google Meets';
            }
            else if(url.includes('teams')){
                return 'Microsoft Teams';
            }
            else if(url.includes('zooom')){
                return 'Zoom';
            }else{
                return 'Online Event';
            }
        }
        return 'Online Event';
    }

    const openEvent = (data) => {
        let str = data?.eventName?.toLowerCase()?.split(' ')?.join('-');
        props.history.push({
            pathname: `/event/${str}`,
            state: { eventId: data._id },
        });
    }

    return(
        // <a href={props.hyperlink}>
            <div className="event-card" key={props.data._id}>
                <img src={props.data.banner ? props.data.banner : DefaultImage} className="event-banner" alt={props.data.eventName} onClick={()=> openEvent(props.data)} />
                <Calendar startDate={props.data.startDate} endDate={props.data.endDate} />
                <h1 className="event-name">{props.data.eventName}</h1>
                {props?.data?.eventMode === 'Online' ? 
                <span className="event-full-address">{getOnlineName(props.data.onlineURL)}</span> :
                <span className="event-full-address">{props.data.city}{props.data.state && ', '+props.data.state}{props.data.country && ', '+props.data.country}</span> 
                }
                {props.edit ? <button className="edit-btn" onClick={(e)=> editEvent(e)}>
                     Edit</button> :
                <h3 style={{marginTop: -25, display: 'inline-block',float: 'right'}}>{props.data.entryMode === 'free' ? 'Free' : '₹'+ CommonService.numberWithCommas(CommonService.getAmount(props.data.ticketCategory))}</h3>}
            </div>
        // </a>
    )
}

export default EventCard;