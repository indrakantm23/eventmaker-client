import axios from "axios";
import { canUseDOM } from "exenv";

export default class CommonService {

    static getApiUrl(){
        var url = "";
        const hostname = canUseDOM ? window.location.hostname : 'localhost';
        if(hostname == 'localhost'){
            url = "http://localhost:5000/";
        }else{
            url = "https://event-maker-back.herokuapp.com/";
        }
        return url;
    }

// GET ALL EVENTS
    static getEvents(){
        return axios.get(`${this.getApiUrl()}events/get-events`).then(res => {return res.data})
    }




}