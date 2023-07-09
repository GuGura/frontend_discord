import axios from "axios";

const BaseURL = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {contentType: "application/json; UTF-8"},
});

export default BaseURL;