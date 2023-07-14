import axios from "axios";

const BaseURL = axios.create({
   baseURL: 'http://localhost:8080/',
    //baseURL: 'http://192.168.0.100:8080/',
});

export default BaseURL;