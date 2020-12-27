import React, { Component } from 'react';
import './common.scss';

class CreateEvent extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="create-event-div">
                <h1>Create an Event</h1>
            </div>
        )
    }
}

export default CreateEvent;