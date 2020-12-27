import axios from "axios";
import { canUseDOM } from "exenv";

export default class CommonService {


    static getApiUrl(){
        const url = "http://localhost:5000/";
        return url;
    }

// GET ALL EVENTS
    static getEvents(){
        return axios.get(`${this.getApiUrl()}events/get-events`).then(res => {return res.data})
    }




}