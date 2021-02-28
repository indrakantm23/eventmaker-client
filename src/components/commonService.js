import axios from "axios";
import { canUseDOM } from "exenv";

export default class CommonService {

    static getApiUrl(){
        var url = "";
        const hostname = canUseDOM ? window.location.hostname : 'localhost';
        if(hostname === 'localhost'){
            url = "http://localhost:5000/";
        }else{
            url = "https://event-maker-back.herokuapp.com/";
        }
        return url;
    }


//********************************************************* USER API CALLS *********************************************************** */

    // REGISTER
    static regiserUser(data){
        return axios.post(`${this.getApiUrl()}users/register`, data)
                    .then(res => {return res.data})
    }

    // LOGIN
    static loginUser(data){
        return axios.post(`${this.getApiUrl()}users/login`, data)
                    .then(res => {return res.data})
    }



//********************************************************* EVENT API CALLS *********************************************************** */

    // GET ALL EVENTS
    static getEvents(){
        return axios.get(`${this.getApiUrl()}events/get-events`)
                    .then(res => {return res.data})
    }

    // SAVE AN EVENT
    static saveEvent(data){
        return axios.post(`${this.getApiUrl()}events/post-an-event`, data)
                    .then(res => {return res.data})
    }

    // FIND AN EVENT
    static getAnEvent(id){
        return axios.get(`${this.getApiUrl()}events/get-an-event/${id}`)
                    .then(res => {return res.data})
    }

    // CONFIRM BOOKING / SEND BOOKING EMAIL
    static sendBookingEmail(data, user, eventData){
        let obj = {data, user, eventData};
        return axios.post(`${this.getApiUrl()}events/confirm-booking`, obj)
                    .then(res => {return res.data})
    }

    // FIND EVENTS BY CATEGORY
    static findEventsWithCategory(str){
        return axios.get(`${this.getApiUrl()}events/category/${str}`)
                    .then(res => {return res.data})
    }






//********************************************************* COMMON FUNCTIONS *********************************************************** */

static convertTime(time){
    if(time.split(':')[0] >= 12){
        return Number(time.split(':')[0])-12 + ':'+time.split(':')[1]+' PM';
    }
    else {
        return time + ' AM';
    }
}

static convertDate(d){
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const DAYS   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date(d);
    return DAYS[date.getDay()]+ ', '+ date.getDate()+' '+ MONTHS[date.getMonth()]
}

static trimString(str, range) {
    return str.length > range ? (`${str.substr(0, range)}...`) : str;
}

static numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

}