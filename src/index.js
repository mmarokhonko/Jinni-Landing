import "./styles.scss";

import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { I18nextProvider } from "react-i18next";
import i18n from "./tools/i18nextSetup";

import PickerState from "./tools/PickerState";

const pickerStore = new PickerState();

import App from "./App";

render(
    <Provider pickerStore={pickerStore}>
        <I18nextProvider i18n={ i18n }>
            <App />
        </I18nextProvider>
    </Provider>,
    document.getElementById("app")
);
