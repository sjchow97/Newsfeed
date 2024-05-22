var axios = require("axios");

var api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

module.exports = api;
