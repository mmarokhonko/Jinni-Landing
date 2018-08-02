import Cookies from "js-cookie";
import { inject, observer } from "mobx-react";

const mobXConnect = storeName => component => inject([storeName])(observer(component));

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

const getParamFromURL = key => {
    let urlValue = getQueryStringValue(key);
    if(urlValue.length === 0) {
        return urlValue;
    }
    return urlValue;
}
const getParamFromCookieOrUrl = key => {
    let cookieValue = Cookies.get(key);
    if(cookieValue) {
        return cookieValue;
    }
    let urlValue = getQueryStringValue(key);
    if(urlValue.length === 0) {
        return urlValue;
    }
    Cookies.set(key, urlValue);
    return urlValue;
}

module.exports = {
    getParamFromCookieOrUrl,
    getParamFromURL,
    mobXConnect
};
