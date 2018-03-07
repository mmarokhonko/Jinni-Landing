import axios from "axios";
import currentDevice from "current-device";
import { detect } from "detect-browser";

const sendDataModule = {
    prepareDataToSend: async function(data) {
        let userData = await this.getUserData();
        const orderData = this.parseOrder(data.picksData, data.lotteryId);
        delete data.picksData;
        delete data.lotteryId;
        const preparedData = Object.assign({}, data, userData, { orderData });
        // this.sendData(preparedData);
        console.log(preparedData);
        const headersObject = this.parseDataToHeaders(preparedData);
        this.sendData(headersObject);
    },

    parseDataToHeaders: function(data) {
        let headersObject = {};
        Object.keys(data).forEach(name => {
            if (name === "orderData") {
                return;
            }
            headersObject[name] = data[name];
        });

        data.orderData.forEach((item, index) => {
            headersObject[`orderData[${index}][packageId]`] = `[${item.packageId}]`;
            headersObject[`orderData[${index}][lotteryId]`] = `[${item.lotteryId}]`;
            headersObject[`orderData[${index}][drawCount]`] = `[${item.drawCount}]`;
            headersObject[`orderData[${index}][isSubscription]`] = `[${item.isSubscription}]`;
            headersObject[`orderData[${index}][billingPeriod]`] = `[${item.billingPeriod}]`;
            headersObject[`orderData[${index}][picks][base][]`] = `[${item.picks.base}]`;
            headersObject[`orderData[${index}][picks][extra][]`] = `[${item.picks.extra}]`;
        });

        let formData = new FormData();
        Object.keys(headersObject).forEach(key => {
            formData.append(key, data[key]);
        })

        return formData;
    },

    sendData: function(data) {
        // axios.post("https://api.jinnilotto.com/affiliate/welcome/response.json", JSON.stringify(data))
        axios({
            url: "https://api.jinnilotto.com/affiliate/welcome/response.json",
            method: "post",
            data,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(resp => {
                console.log(resp);
                alert("Succesfully sent! Check console");
            })
            .catch(err => {
                console.log(err);
                alert("Error while sending! Check console");
            });
    },

    getUserData: async function() {
        const device = `${currentDevice.type} ${currentDevice.os}`;

        const ipObject = await axios.get("https://api.ipify.org/?format=json"),
            ip = ipObject.data.ip;

        const browserDetected = detect(),
            browser = `${browserDetected.name} ${browserDetected.version}`;

        const userData = { language, device, ip, browser };

        return userData;
    },

    //Temporary Implementation
    parseOrder: function(picksData, lottoId) {
        const packageId = "256",
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
