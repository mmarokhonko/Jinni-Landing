import axios from "axios";
import Cookies from "js-cookie";

const getQueryStringValue = key => {
    const value = decodeURIComponent(
        window.location.search.replace(
            new RegExp(
                "^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$",
                "i"
            ),
            "$1"
        )
    );
    return value;
};

const setBTagCookie = bTag => {
    let bTagCookie = Cookies.get("bTag");
    if (bTagCookie) {
        console.log("bTag already exists");
        return bTagCookie;
    }

    if (bTag.length) {
        console.log(`bTag ${bTag} is saved`);
        Cookies.set("bTag", bTag);
        return bTag;
    }

    return console.log("bTag is not set");
};

const getFeedData = () => {
    return axios.get("https://feed.jinnilotto.com/feed.json");
};

module.exports = {
    getQueryStringValue,
    setBTagCookie,
    getFeedData
};
