import React, {Component} from "react";
import {string, func, object} from "prop-types";
import i18n from "../../tools/i18nextSetup";

import SelectWithIcon from "./generalComponents/SelectWithIcon";

import profileIcon from "../../assets/RegisterForm/icons/profile.png";

const TitleOptions = i18n.language === "de" ? 
    [{label: i18n.t("formText:selectTitle.Mr"), value:"Mr."},{label: i18n.t("formText:selectTitle.Mrs"), value:"Mrs."}] :
    [{label: i18n.t("formText:selectTitle.Mr"), value:"Mr."},{label: i18n.t("formText:selectTitle.Mrs"), value:"Mrs."},{label: i18n.t("formText:selectTitle.Ms"), value:"Ms."}]

class SelectTitle extends Component {
    state = {
        options: TitleOptions
    }
		
    componentDidMount() {
        this.selectHandler(this.state.options[0])
    }

    selectHandler = option => {
        this.props.selectHandler(this.props.name, option);
    }

    render() {
        const {value} = this.props;
        const {options} = this.state;

        return(
            <div className="select-title">
                <SelectWithIcon value={value} icon={profileIcon} options={options} selectHandler={this.selectHandler} />
            </div>
        )
    }
}

SelectTitle.propTypes = {
    value: object,
    selectHandler: func.isRequired,
    name: string.isRequired
}

export default SelectTitle