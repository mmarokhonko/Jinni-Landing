import axios from "axios";
import currentDevice from "current-device";
import { detect } from "detect-browser";
import "formdata-polyfill";

import i18n from "./i18nextSetup";
import {apiHost, redirectHost} from "./envSettings";

const sendDataModule = {
    prepareDataToSend: function(data, errorNode) {
        errorNode.classList.remove("-shown");            

        let userData = this.getUserData();
        const orderData = this.parseOrder(data.ticketsData, data.lotteryId, data.packageId);
        delete data.picksData;
        const preparedData = Object.assign({}, data, userData, { orderData });
        const headersObject = this.parseDataToHeaders(preparedData);
        this.sendData(headersObject, errorNode);
    },

    parseDataToHeaders: function(data) {
        let headersObject = {};
        Object.keys(data).forEach(name => {
            if (name === "orderData") {
                return;
            }
            if (name === "incentiveCode") {
                headersObject.cookieValue = data[name];
                return;
            }
            headersObject[name] = data[name];
        });
		
        headersObject["orderData[0][packageId]"] = data.packageId;
        headersObject["orderData[0][lotteryId]"] = data.lotteryId;
        headersObject["orderData[0][drawCount]"] = 1;
        headersObject["orderData[0][isSubscription]"] = 0;
        headersObject["orderData[0][billingPeriod]"] = 0;
        headersObject["orderData[0][type]"] = data.orderData.length > 1 ? "Bundle" : "Single";

        if(data.orderData.length > 1 ) {
            data.orderData.forEach((item, index) => {
                headersObject[`orderData[0][picks][0][${index}][base]`] = `[${item.picks.base}]`;
                headersObject[`orderData[0][picks][0][${index}][extra]`] = `[${item.picks.extra}]`;
            });
        }
		
        else {
            const item = data.orderData[0];
            headersObject["orderData[0][picks][base][]"] = `[${item.picks.base}]`;
            headersObject["orderData[0][picks][extra][]"] = `[${item.picks.extra}]`;
        }

        let formData = new FormData();
        Object.keys(headersObject).forEach(key => {
            formData.append(key, headersObject[key]);
        })

        return formData;
    },

    sendData: function(data, errorNode) {
        const redirectDomain = redirectHost;
        const apiURL = apiHost;

        axios({
            url: `https://${apiURL}/affiliate/welcome/response.json`,
            method: "post",
            data,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(resp => {
                const redirectUrl = data.get("redirectUrl");          
                if (resp.data.ErrorID) {
                    return this.handleBackendError(resp.data.ErrorID, errorNode)
                }
                return window.location = `https://${redirectDomain}/?init=lp&redirectUrl=${redirectUrl}&memberId=${resp.data.MemberID}&sessionId=${resp.data.SessionID}`;
            })
            .catch(err => {
                console.log(err);
                alert("Error while sending! Check console");
            });
    },

    getUserData: function() {
        const device = `${currentDevice.type} ${currentDevice.os}`;
        const browserDetected = detect(),
            browser = `${browserDetected.name} ${browserDetected.version}`;
        const userData = { device, browser };

        return userData;
    },

    handleBackendError: function (errorId, errorNode) {
        errorNode.classList.add("-shown");
        switch (errorId) {
        case "073":
            errorNode.innerHTML = i18n.t("AppText:emailError");   
            break;
        
        default:
            errorNode.innerHTML = i18n.t("AppText:generalRegError");     
            break;
        }
    },

    //Temporary Implementation
    parseOrder: function(ticketsData) {
        let orderData = [];

        ticketsData.forEach(pick => {
            const picks = {
                base: pick.pickedNums.join(","),
                extra: pick.pickedBonus
            };
            orderData.push({
                picks
            });
        });

        return orderData;
    }
};

export default sendDataModule;
