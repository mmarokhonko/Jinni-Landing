import "./styles.scss";


import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";

import PickerState from "./tools/PickerState";

const pickerStore = new PickerState();

import App from "./App";

render(
    <Provider pickerStore={pickerStore}>
        <App />
    </Provider>,
    document.getElementById("app")
);
