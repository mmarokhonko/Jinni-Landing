import axios from "axios";
import currentDevice from "current-device";
import { detect } from "detect-browser";

const sendDataModule = {
    prepareDataToSend: function(data, errorNode) {
        errorNode.classList.remove("-shown");            

        let userData = this.getUserData();
        const orderData = this.parseOrder(data.ticketsData, data.lotteryId, data.packageId);
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
		
        headersObject["orderData[0][packageId]"] = data.orderData[0].packageId;
        headersObject["orderData[0][lotteryId]"] = data.orderData[0].lotteryId;
        headersObject["orderData[0][drawCount]"] = data.orderData[0].drawCount;
        headersObject["orderData[0][isSubscription]"] = data.orderData[0].isSubscription;
        headersObject["orderData[0][billingPeriod]"] = data.orderData[0].billingPeriod;
        headersObject["orderData[0][type]"] = data.orderData.length > 1 ? "Bundle" : "Single";

        data.orderData.forEach((item, index) => {
            headersObject[`orderData[0][picks][0][${index}][base]`] = `[${item.picks.base}]`;
            headersObject[`orderData[0][picks][0][${index}][extra]`] = `[${item.picks.extra}]`;
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
                const redirectUrl = data.get("redirectUrl");
                console.log(`Redirect url ${redirectUrl}`);            
                if (resp.data.ErrorID) {
                    return this.handleBackendError(resp.data.ErrorID, errorNode)
                }
                return window.location = `https://stage.jinnilotto.com/?init=lp&redirectUrl=${redirectUrl}&memberId=${resp.data.MemberID}&sessionId=${resp.data.SessionID}`;
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
    parseOrder: function(ticketsData, lottoId, packageID) {
        const packageId = packageID,
            lotteryId = lottoId,
            drawCount = 1,
            isSubscription = 0,
            billingPeriod = 0;
        let orderData = [];

        ticketsData.forEach(pick => {
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
