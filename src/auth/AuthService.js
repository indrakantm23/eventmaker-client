import React, { Component } from 'react';

export default class AuthService extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            userDetails:{
                firstName: '',
                lastName: '',
                email: '',
                avatar: ''
            }
        }
        let that = this;
    }
    
    static isLoggedIn(){
        console.log(this.that)
        // return this.state;
    }
    static getUserDetails(){
        return this.state.userDetails;
    }
    static setLoggedIn(val){
        this.setState({ loggedIn: val });
    }
    static setUserDetails(data){
        this.setState({userDetails: {...data}})
    }
} 