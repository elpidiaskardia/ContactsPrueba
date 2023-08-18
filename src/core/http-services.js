import axios from 'axios';

export const HTTP = axios.create({
    baseURL: "https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode",
    headers: {
        "Accept": "application/json",
        'Content-Type': 'text/plain',

        //"Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    //    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
    }
});

