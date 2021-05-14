import React, { Component } from 'react';
import CommonService from './commonService';
import EventCard from './pages/EventCard';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Dashboard.scss';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            startDate: null,
            currentLocation: null,
            eventData: null,
            loader: true
        }
    }
    
    componentDidMount(){
        let address = localStorage.getItem('currentLocation');
        if(address){
            this.setState({ currentLocation: address })
        }
        CommonService.getEvents().then((res) => {
            this.setState({ eventData: res.events, loader: false })
        })
    }


    getHypelink = (id, str) => {
        // return `/${str.toLowerCase().split(' ').join('-')}/${id}`;
        return `/${id}`;
    }

    openEventByCategory = (target) => {
        this.props.history.push('looking-for-'+target);
    }


    render(){
        return(
            <div>
                <div className="container">
                    <div className="overlay"></div>
                    <div className="heading-container">
                        {this.state.currentLocation &&<h1 className="events-heading">Events happening in {CommonService.getCurrentCity()} </h1>}
                        <div className="button-group-container">
                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                <Button onClick={()=> this.openEventByCategory('events')}>Events</Button>
                                <Button onClick={()=> this.openEventByCategory('parties')}>Parties</Button>
                                <Button onClick={()=> this.openEventByCategory('exhibitions')}>Exhibitions</Button>
                                <Button onClick={()=> this.openEventByCategory('seminars')}>Seminars</Button>
                            </ButtonGroup>
                        </div>
                    </div>

                   

                </div>
               


            {/* DISPLAY EVENTS HAPPENING */}
            <h1 className="common-heading">Discover most popular Events</h1>
            <div className="event-grid-div">
                {this.state.eventData && 
                    this.state.eventData.map(data => {
                        return(
                            <EventCard data={data} key={data._id} {...this.props} />
                        )
                    })
                }
            </div>

            {/* DISPLAY EVENTS IN MY CITY */}
            <h1 className="common-heading">Event in your City - {localStorage.getItem('currentCity')}</h1>
            <div className="event-grid-div">
                {this.state.eventData && 
                    this.state.eventData.map(data => {
                        return(
                            <EventCard data={data} key={data._id} {...this.props} />
                        )
                    })
                }
            </div>

            {/* CHOOSE BY CHOICE */}
            <h1 className="common-heading">Select by category</h1>
            <div className="event-grid-div">

            </div>
            
                <Backdrop open={this.state.loader}>
                    <CircularProgress color="inherit" style={{'color': '#fff'}}/>
                </Backdrop>
                {/* {this.state.loader && <div className="loader"></div>} */}
            </div>
        )
    }
}

export default  Dashboard;