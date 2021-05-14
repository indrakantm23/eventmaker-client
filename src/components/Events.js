import React, { Component } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommonService from './commonService';
import EventCard from './pages/EventCard';
import './Dashboard.scss';
import './Events.scss';

class Events extends Component {
    constructor(props){
        super(props);
        this.state = {
            loader: true,
            searchParam: '',

        }
    }

    componentDidMount(){
        let search = this.props?.match?.params?.target?.split('-')[1];
        this.setState({ searchParam: search})
        CommonService.findEventsWithCategory(search).then((res) => {
            this.setState({ data: res.events })
        })
        this.setState({ loader: false })
    }

    render() {
        return (
            <div className="events-div">
                    {/* DISPLAY EVENTS HAPPENING */}
                    <h1 className="event-heading">{this.state.searchParam}</h1>
                    <div className="event-grid-div">
                        {this.state.data && 
                            this.state.data.map(data => {
                                return(
                                    <EventCard data={data} onclick={()=> this.openEvent(data._id)} key={data._id} />
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

export default Events;