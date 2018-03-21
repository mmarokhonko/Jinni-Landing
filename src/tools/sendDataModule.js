import axios from "axios";
import currentDevice from "current-device";
import { detect } from "detect-browser";

import lottoParamsData from "./lottoParamsData";

const sendDataModule = {
    prepareDataToSend: function(data, errorNode) {
        errorNode.classList.remove("-shown");            

        let userData = this.getUserData();
        const orderData = this.parseOrder(data.picksData, data.lotteryId, data.lotteryOrientation);
        delete data.picksData;
        delete data.lotteryId;
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

        data.orderData.forEach((item, index) => {
            headersObject[`orderData[${index}][packageId]`] = item.packageId;
            headersObject[`orderData[${index}][lotteryId]`] = item.lotteryId;
            headersObject[`orderData[${index}][drawCount]`] = item.drawCount;
            headersObject[`orderData[${index}][isSubscription]`] = item.isSubscription;
            headersObject[`orderData[${index}][billingPeriod]`] = item.billingPeriod;
            headersObject[`orderData[${index}][picks][base][]`] = `[${item.picks.base}]`;
            headersObject[`orderData[${index}][picks][extra][]`] = `[${item.picks.extra}]`;
        });

        let formData = new FormData();
        Object.keys(headersObject).forEach(key => {
            formData.append(key, headersObject[key]);
        })

        return formData;
    },

    sendData: function(data, errorNode) {
        for (let pair of data.entries()) {
            console.log(pair[0]+ ", " + pair[1]); 
        }
        axios({
            url: "https://api.jinnilotto.com/affiliate/welcome/response.json",
            method: "post",
            data,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(resp => {
                console.log(resp.data);              
                if (resp.data.ErrorID) {
                    return this.handleBackendError(resp.data.ErrorID, errorNode)
                }
                return window.location = `https://stage.jinnilotto.com/?init=lp&redirectUrl=%2Fcart&memberId=${resp.data.MemberID}&sessionId=${resp.data.SessionID}`;
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
            errorNode.innerHTML = `The email address you have chosen is already in use. 
            Try logging in with it. If you can't remember your password, just request a reset.`    
            break;
        
        default:
            errorNode.innerHTML = `Whoops, an error occurred during registration. 
            Please try again so we can start making your wishes come true.`    
            break;
        }
    },

    //Temporary Implementation
    parseOrder: function(picksData, lottoId, lottoName) {
        const packageId = lottoParamsData[lottoName].packageId,
            lotteryId = lottoId,
            drawCount = 1,
            isSubscription = 0,
            billingPeriod = 0;
        let orderData = [];

        picksData.forEach(pick => {
            const picks = {
                base: pick.pickedNums.join(","),
                extra: pick.pickedBonus
            };
            orderData.push({
                packageId,
                lotteryId,
                drawCount,
                isSubscription,
                billingPeriod,
                picks
            });
        });

        return orderData;
    }
};

export default sendDataModule;
