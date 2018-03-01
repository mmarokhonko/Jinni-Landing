import React, {Component, Fragment} from "react";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";

class App extends Component {
    render() {
        return(
            <Fragment>
                <DynamicHeader lotto="megamillions" jackpot="1234567890" />
                <main className="main">
                    <div className="cont-zone">
                        <h1 className="main_title">Get your <u>FREE</u> bet line here:</h1>
                        <div className="main_subwrap">
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