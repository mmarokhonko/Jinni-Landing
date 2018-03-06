import axios from "axios";
import currentDevice from "current-device";
import {detect} from "detect-browser";
import shortid from "shortid";


const sendDataModule = {
    prepareDataToSend: async function (data) {
        let userData = await this.getUserData();
        const orderData = this.parseOrder(data.picksData, data.lotteryId);
        delete data.picksData;
        delete data.lotteryId;
        const preparedData = Object.assign({}, data, userData, {orderData});
        this.sendData(preparedData);
    },

    sendData: function(data) {
        console.log(JSON.stringify(data));
        axios.post("https://api.jinnilotto.com/affiliate", data)
            .then(resp => {
                console.log(resp);
                alert("Succesfully sent! Check console");
            })
            .catch(err => {
                console.log(err);
                alert("Error while sending! Check console");
            });
    },

    getUserData: async function () {
        const language = "EN",
            device = `${currentDevice.type} ${currentDevice.os}`;
          
        const ipObject = await axios.get("https://api.ipify.org/?format=json"),
            ip = ipObject.data.ip;
          
        const browserDetected = detect(),
            browser = `${browserDetected.name} ${browserDetected.version}`;
        
        const userData = {language, device, ip, browser};    

        return userData;
    },

    //Temporary Implementation
    parseOrder: function (picksData, lottoId) {
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
            }
            orderData.push({
                packageId,
                lotteryId,
                drawCount,
                isSubscription,
                billingPeriod,
                picks
            })
        });
        
        return orderData;
    }
};

export default sendDataModule