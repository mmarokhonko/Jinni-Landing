import Cookies from "js-cookie";

const setBTagCookie = bTag => {
    let bTagCookie = Cookies.get("bTag");
    if(bTagCookie) {
        console.log("bTag already exists");
        return
    }

    if(bTag.length > 1) {
        console.log(`bTag ${bTag} is saved`);
        return Cookies.set("bTag", bTag);
    }
    return console.log("bTag is not set");
}

module.exports = {
    setBTagCookie
}