import React, { Component } from 'react';
import CommonService from './commonService';
import EventCard from './pages/EventCard';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './Dashboard.scss';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            startDate: null,
            currentLocation: null,
            eventData: null
        }
    }
    
    componentDidMount(){
        let address = localStorage.getItem('currentLocation');
        if(address){
            this.setState({ currentLocation: address })
        }
        CommonService.getEvents().then((res) => {
            this.setState({ eventData: res.events })
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="overlay"></div>
                    <div className="heading-container">
                        {this.state.currentLocation &&<h1 className="events-heading">Events happening in {this.state.currentLocation.split(' ')[0]} </h1>}
                        <div className="button-group-container">
                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                <Button>Events</Button>
                                <Button>Parties</Button>
                                <Button>Exhibitions</Button>
                                <Button>Seminars</Button>
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
                            <EventCard data={data} />
                        )
                    })
                }
            </div>
            

            </div>
        )
    }
}

export default  Dashboard;