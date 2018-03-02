import React, {Component} from "react";
import {string, func} from "prop-types";

import SelectWithIcon from "./SelectWithIcon";

import profileIcon from "../../assets/RegisterForm/icons/profile.png";

class SelectTitle extends Component {
    state = {
        options: [
            {
                label: "Mr.", value:"Mr."
            },
            {
                label: "Ms.", value:"Ms."
            }
        ]
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
    value: string.isRequired,
    selectHandler: func.isRequired,
    name: string.isRequired
}

export default SelectTitle