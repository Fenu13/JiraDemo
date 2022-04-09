import axios from 'axios';
import {Platform} from 'react-native';
const baseURL =
  Platform.OS == 'ios'
    ? 'http://127.0.0.1:3000/'
    : 'http://192.168.200.78:3000/';

//const baseUrl = 'http://192.168.43.49:3000/';

export const jira = axios.create({baseURL});
