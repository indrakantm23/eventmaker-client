import React, { Component } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommonService from './commonService';

class Events extends Component {
    constructor(props){
        super(props);
        this.state = {
            loader: true
        }
    }

    componentDidMount(){
        let search = this.props?.match?.params?.category;
        CommonService.findEventsWithCategory(search).then((res) => {
            console.log(res);
        })
        this.setState({ loader: false })
    }

    render() {
        return (
            <div>
                <h1>{this.props.match.params.category}</h1>
                
                <Backdrop open={this.state.loader}>
                    <CircularProgress color="inherit" style={{'color': '#fff'}}/>
                </Backdrop>
            </div>
        )
    }
}

export default Events;