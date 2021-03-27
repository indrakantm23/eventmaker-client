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

    // GET ALL BOOKINGS
    static getMyBookings(userId){
        return axios.get(`${this.getApiUrl()}users/get-bookings/${userId}`)
                    .then(res => {return res.data})
    }


//********************************************************* EVENT API CALLS *********************************************************** */

    // GET ALL EVENTS
    static getEvents(){
        return axios.get(`${this.getApiUrl()}events/get-events`)
                    .then(res => {return res.data})
    }

    // SEARCH EVENTS
    static searchEvents(key){
        return axios.get(`${this.getApiUrl()}events/search/${key}`)
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

static getCurrentCity(){
    return localStorage.getItem('currentCity');
}

static setCurrentCity(city){
    localStorage.setItem('currentCity', city);
}

// Show toast
static showToast(text, duration = 3000) {
    if(canUseDOM) {
        document.getElementById('global-toast-text').text = text;
        document.getElementById("global-toast-text").innerText = text;
        if(text.indexOf("\n") !== -1) {
            var lines = text.split("\n");
            var str = "";
            for(var i=0;i<lines.length;i++) {
                str += "<p>"+ lines[i] +"</p>"
            }
            document.getElementById("global-toast-text").innerHTML = "<div>"+ str +"</div>";
        }
        document.getElementById('global-toast').style.display = "block"
        setTimeout(() => {
            document.getElementById('global-toast').style.display = "none";
        }, 3000)
    }
}

// get date
static getDate = date => {
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var d = new Date(date);
    if(d.getDate() == new Date().getDate() && d.getMonth() == new Date().getMonth()){
        return 'Today';
    }
    else if(d.getDate() + 1 == new Date().getDate()+1 && d.getMonth()+1 == new Date().getMonth()+1){
        return 'Tomorrow';
    }
    else if(d.getDate() - 1 == new Date().getDate()-1 && d.getMonth()-1 == new Date().getMonth()-1){
        return 'Yesterday';
    }
    else{
        return d.getDate()+' '+MONTHS[d.getMonth()]+' '+d.getFullYear();
    }
}



}
