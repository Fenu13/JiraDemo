import axios from "axios";
import { jira } from "../axios/axios"


export const api = async () => {
     axios.get('http://127.0.0.1:3000/').then(response => {
    console.log(response.data);
    }).catch(e => {
             console.log(e);
    });
    };