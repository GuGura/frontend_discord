import axios from "axios";

const BaseURL = axios.create({
    baseURL: 'http://localhost:8080/',
});

export default BaseURL;