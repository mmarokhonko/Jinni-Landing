import React, {Component, Fragment} from "react";

import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";

class App extends Component {
    render() {
        return(
            <Fragment>
                <Help />
                <Fact />
            </Fragment>
        )
    }
}

export default App;