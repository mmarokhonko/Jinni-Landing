import React, {Component, Fragment} from "react";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";
import NumberPicker from "./components/NumberPicker/NumberPicker";
import RegisterForm from "./components/RegisterForm/RegisterForm";

import {setBTagCookie} from "./tools/cookiesFunctions";

class App extends Component {
    componentDidMount() {
        const bTag = this.getQueryStringValue("bTag");
        setBTagCookie(bTag);
    }

    getQueryStringValue = key => {  
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }

    render() {
        return(
            <Fragment>
                <DynamicHeader lotto="megamillions" jackpot="603414" />
                <main className="main">
                    <div className="cont-zone">
                        <h1 className="main_title">Get your <u>FREE</u> bet line here:</h1>
                        <div className="main_subwrap">
                            <NumberPicker />
                            <RegisterForm />
                        </div>                        
                    </div>
                </main>
                <Help />
                <Fact />
            </Fragment>
        )
    }
}

export default App;