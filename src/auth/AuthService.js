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
        return localStorage.getItem('loggedIn');
    }
    static getUserDetails(){
        return JSON.parse(localStorage.getItem('user'));
    }
    static setLoggedIn(val){
        this.setState({ loggedIn: val });
    }
    static setUserDetails(data){
        this.setState({userDetails: {...data}})
    }

    


} 