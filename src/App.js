import React, {Component, Fragment} from "react";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";

class App extends Component {
    render() {
        return(
            <Fragment>
                <DynamicHeader lotto="megamillions" jackpot="90000000" />
                <Help />
                <Fact />
            </Fragment>
        )
    }
}

export default App;