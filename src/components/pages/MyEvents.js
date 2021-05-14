import React, { Component } from 'react';
import CommonService from './../commonService';
import AuthService from '../../auth/AuthService';
import EventCard from './../pages/EventCard';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import './../Dashboard.scss';

class MyEvents extends Component{
    constructor(props){
        super(props);
        this.state={
            startDate: null,
            currentLocation: null,
            eventData: null,
            loader: true,
            isLoggedIn: false,
            userData: null
        }
    }
    
    componentDidMount(){
        if(!AuthService.isLoggedIn()){
            this.props.history.push({ 
              pathname: "/login", 
              state: { url: this.props.location.pathname }
            })
          }
        let address = localStorage.getItem('currentLocation');
        if(address){
            this.setState({ currentLocation: address })
        }
        this.setState({ isLoggedIn: AuthService.getUserDetails() ? true : false, userData: AuthService.getUserDetails() }, ()=> {
            this.state.userData.id && (this.getEvents());
        })
    }

    getEvents = () => {
        CommonService.getMyEvents(this.state.userData.id).then((res) => {
            this.setState({ eventData: res.data, loader: false })
        })
    }

    openEvent = (id) => {
        // str.toLowerCase().split(' ').join('-')
        this.props.history.push('/event/'+id);
    }


    render(){
        return(
            <div>
                <h1 className="common-heading" style={{marginTop: 90}}>My Events</h1>
                <div className="event-grid-div">
                    {this.state.eventData && 
                        this.state.eventData.map(data => {
                            return(
                                <EventCard edit={true} data={data} onclick={()=> this.openEvent(data._id)} key={data._id} />
                            )
                        })
                    }
                </div>
                    <Backdrop open={this.state.loader}>
                        <CircularProgress color="inherit" style={{'color': '#fff'}}/>
                    </Backdrop>
            </div>
        )
    }
}

export default  MyEvents;