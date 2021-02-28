import React, { useState, useEffect } from 'react';
import './event.scss';
import CommonService from './commonService';
import Button from '@material-ui/core/Button';
import GoogleMapReact from 'google-map-react';
import DirectionsIcon from '@material-ui/icons/Directions';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import Placeholder from './../assets/images/Placeholder.jpg';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    WhatsappIcon,
    EmailIcon,
    TwitterIcon,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

const Marker = ({text}) => {
    return (
          <div><b>{text}</b></div>
    );
}


function Event(props) {

  const [open, setOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [loader, setLoader] = useState(true);
  const [event, setEvent] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




    useEffect(() => {
        const id = props?.match?.params?.eventid;
        // console.log(id)
        // setEventId(id);
        CommonService.getAnEvent(id).then((res) => {
            setEvent(res.event);
            setLoader(false);
        })
    }, []);

    const AddTicketToList = (data) => {
            data.ticket_count = 1;
            setSelectedTickets(prevArr => [...prevArr, data]);    
    }

    const IsAlreadyAdded = (id) => {
        return selectedTickets.find(a => a.id === id) && selectedTickets.find(a => a.id === id)?.ticket_count > 0;
    }
    const getCount = (id) => {
        return selectedTickets.find(a => a.id === id).ticket_count;
    }
    const removeFromList = (id)=> {
        let data = selectedTickets.find(a => a.id === id);
        data.ticket_count -= 1;
        setSelectedTickets(prevArr => [...prevArr, data]);    
        setSelectedTickets(selectedTickets.filter(item => item.ticket_count > 0));
    }
    const addToList = (id)=> {
        let data = selectedTickets.find(a => a.id === id);
        data.ticket_count += 1;
        let index = selectedTickets.findIndex(a => a.id === id);
        selectedTickets.splice(index, 1);
        setSelectedTickets(prevArr => [...prevArr, data]); 
        // console.log(selectedTickets)   
    }

    const getAmount = (arr) => {
        if (arr.length === 1) {
            return arr[0].amount;
        }
        else if(arr.length > 1) {
            return arr.sort((a, b) => a.amount - b.amount)[0].amount;
        }
        else {
            return 0;
        }
    }

    const GetTotalPrice = () => {
        if(selectedTickets.length>0) {
            let sum = 0, item;
            for(item in selectedTickets){
                sum += selectedTickets[item].amount * selectedTickets[item].ticket_count;
            }
            return sum;
        }else {
            return 0;
        }
    }

    let center = {
        lat: event?.evtLat || 37.3605, 
        lng: event?.evtLng || -122.0675
    }
    
    let myMarkers = [
        {
            name : 'Mountain View High School',
            lat : 37.3605,
            lng : -122.0675,
        }
    ];

    const selectionRange = {
        startDate: event ? new Date(event.startDate) : new Date(),
        endDate: event ? new Date(event.endDate) : new Date(),
        key: 'selection',
    }

    const sendBookingEmail = () => {
        let user = JSON.parse(localStorage.getItem('userData'))
        CommonService.sendBookingEmail(selectedTickets, user, event).then(res=> console.log(res))
    }


    return (
        <div>
            {event && (
                <div>
                    <div className="event-container">
                        <div className="left-card">
                            <img src={event.banner || Placeholder} className="event-banner" />
                            <div className="event-namecard">
                                <div style={{flex: 1}}>
                                    <h4 className="event-name">{event.eventName}</h4>
                                    <p className="event-location">{CommonService.trimString(event.full_address, 63)}</p>
                                </div>
                                <div style={{display: 'flex', gap: 20}}>
                                    <h3 style={{marginTop: 10}}>₹ { CommonService.numberWithCommas(getAmount(event.ticketCategory)) || 'Free'}</h3>
                                    <Button variant="contained" className="book-btn" onClick={handleClickOpen}>
                                        Book
                                    </Button>
                                </div>
                            </div>
                            <div className="about-div">
                                <h3 className="event-name">About </h3>
                                <p className="event-location">{event.description}</p>
                            </div>
                        </div>
                        <div className="right-card">
                            <div style={{borderBottom: '1px solid #eee', paddingBottom: 0}}>
                                <div style={{ height: 400}}>

                                    <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI'}}
                                    defaultCenter={center}
                                    defaultZoom={14} 
                                    >
                                    {
                                    myMarkers.map( (each) =>
                                        <Marker
                                            lat = {`${event?.evtLat}` || 37.3605}
                                            lng = {`${event?.evtLng}` || -122.0675}
                                            // text = {`${event?.city}`}
                                        />
                                    )
                                    }
                                    </GoogleMapReact>
                                </div>
                                <div>
                                    <button className="maps-btn">
                                        Get Direction
                                        <DirectionsIcon style={{float: 'right', marginLeft: 5}} />
                                    </button>
                                </div>
                            </div>
                            <div className="time-div border">
                                <h4 className="event-name event-time">Timings</h4>
                                <DateRange
                                    ranges={[selectionRange]}
                                    // onChange={this.handleSelect}
                                />
                                {/* <p className="event-location">
                                    <span className="at-label">Starts at: </span>
                                    {CommonService.convertDate(event.startDate)} {CommonService.convertTime(event.startTime)}</p>
                                <p className="event-location"><span className="at-label">Ends at: </span> 
                                {CommonService.convertDate(event.endDate)} {CommonService.convertTime(event.endTime)} </p> */}
                            </div>
                            <div className="border" style={{padding: 10}}>
                                <h4 className="event-name share-on">Share on</h4>
                                <div className="share-icons">
                                        <FacebookShareButton 
                                            url={'https://cookitabhi.web.app/dish/5f019b65a3bc3a265c875c3d'}
                                            quote={event?.eventName}
                                            hashtag="#camperstribe"
                                            >
                                            <FacebookIcon size={36} round={true}/>
                                        </FacebookShareButton>
                                        <WhatsappShareButton 
                                            url={'https://cookitabhi.web.app/dish/5f019b65a3bc3a265c875c3d'}
                                            quote={event?.eventName}
                                            hashtag="#camperstribe"
                                            >
                                            <WhatsappIcon size={36} round={true}/>
                                        </WhatsappShareButton>
                                        <TwitterShareButton 
                                            url={'https://cookitabhi.web.app/dish/5f019b65a3bc3a265c875c3d'}
                                            quote={event?.eventName}
                                            hashtag="#camperstribe"
                                            >
                                            <TwitterIcon size={36} round={true}/>
                                        </TwitterShareButton>
                                        <LinkedinShareButton 
                                            url={'https://cookitabhi.web.app/dish/5f019b65a3bc3a265c875c3d'}
                                            quote={event?.eventName}
                                            hashtag="#camperstribe"
                                            >
                                            <LinkedinIcon size={36} round={true}/>
                                        </LinkedinShareButton>
                                        <FacebookMessengerShareButton 
                                            url={'https://cookitabhi.web.app/dish/5f019b65a3bc3a265c875c3d'}
                                            quote={event?.eventName}
                                            hashtag="#camperstribe"
                                            >
                                            <FacebookMessengerIcon size={36} round={true}/>
                                        </FacebookMessengerShareButton>
                                        <EmailShareButton 
                                            url={'https://cookitabhi.web.app/dish/5f019b65a3bc3a265c875c3d'}
                                            quote={event?.eventName}
                                            hashtag="#camperstribe"
                                            >
                                            <EmailIcon size={36} round={true}/>
                                        </EmailShareButton>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>


            )}

            <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Select Category"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {event?.ticketCategory?.map((cat) => {
                            return (
                                <div className="cat-div">
                                    <p className="cat-name">{cat.category}</p>
                                    <span className="cat-price">₹ {cat.amount}</span><br/>
                                    {cat.description && <span className="cat-desc">{cat.description}</span>}
                                    {IsAlreadyAdded(cat.id) ? 
                                    <div className="count-icons">
                                        <RemoveIcon onClick={()=> removeFromList(cat.id)} style={{float: 'left'}} />
                                        <span>{getCount(cat.id)}</span>
                                        <AddIcon onClick={()=> addToList(cat.id)} style={{float: 'right'}}/>
                                    </div> 
                                    : 
                                    <button className="add-button" onClick={()=> AddTicketToList(cat)}>Add</button>}
                                </div>
                            )
                        })}
                    </DialogContentText>
                    
                    </DialogContent>
                    <DialogActions>
                    <h4 className="show-total">₹ {GetTotalPrice()}</h4>
                    <Button onClick={handleClose} color="primary" className="cancel">
                        Cancel
                    </Button>
                    <Button onClick={()=> sendBookingEmail()} color="primary" className="continue">
                        Proceed
                    </Button>
                    </DialogActions>
            </Dialog>

            <Backdrop open={loader}>
                    <CircularProgress color="inherit" style={{'color': '#fff'}}/>
            </Backdrop>


        </div>
    )
}

export default Event;