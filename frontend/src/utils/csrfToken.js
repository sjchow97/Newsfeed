var axios = require("axios");

module.exports.getCSRFToken = function (callback) {
  axios
    .get("http://127.0.0.1:8000/auth/csrf/")
    .then(function (response) {
      callback(null, response.data.csrfToken);
    })
    .catch(function (error) {
      console.error("Error fetching CSRF token:", error);
      callback(error);
    });
};
