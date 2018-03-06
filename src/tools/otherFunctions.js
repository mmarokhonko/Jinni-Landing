import axios from "axios"

const getQueryStringValue = key => {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

const getFeedData = () => {
    return axios.get("https://feed.jinnilotto.com/feed.json");
}

module.exports = {
    getQueryStringValue,
    getFeedData
}