import axios from 'axios';
const baseUrl = 'http://127.0.0.1:3000/';
//const baseUrl = 'http://192.168.43.49:3000/';


export const jira = axios.create({ baseURL:baseUrl });