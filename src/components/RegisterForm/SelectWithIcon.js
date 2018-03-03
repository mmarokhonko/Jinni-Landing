import React, {Component} from "react";
import {string, array, func, object} from "prop-types";
import ClickOutHandler from "react-onclickout";

class SelectWithIcon extends Component {
    state = {
        open: false
    }

    toggleOpen = () => {
        const open = this.state.open;
        this.setState({
            open: !open
        })
    }

    ClickOutClose = () => {
        this.setState({
            open: false
        })
    }

    selectHandler = option => {
        this.props.selectHandler(option);
        this.setState({
            open: false
        });
    }

    generateValueClasses = () => {
        const {value, icon} = this.props;

        let classString = "selwi_value";

        if(!icon) {
            return classString;
        }

        if (icon === "flag" && value.countryCode) {
            const code = value.countryCode.toLowerCase();
            return classString.concat(` -flag-icon flag flag-${code}`);
        }
        else {
            return classString.concat(" -icon");
        }
    }

    render() {
        const {value, options, icon} = this.props;
        const {open} = this.state;

        return(
            <ClickOutHandler onClickOut={this.ClickOutClose}> 
                <div className={`selwi_wrap ${open ? "-open" : ""}`}>
                    <div className={this.generateValueClasses()} onClick={this.toggleOpen} 
                        style={icon === "flag" ? {} : {backgroundImage: `url(${icon})`}}>{value.label}</div>
                    <ul className="selwi_options">
                        {options.map((option, i) => <li
                            className={option.countryCode ? `-flag-icon flag flag-${option.countryCode.toLowerCase()}` : ""}
                            onClick={() => this.selectHandler(option)} key={i}>{option.label}</li>)}
                    </ul>
                </div>
            </ClickOutHandler>
        )
    } 
}

SelectWithIcon.propTypes = {
    value: object,
    options: array.isRequired,
    icon: string,
    selectHandler: func.isRequired
}

export default SelectWithIcon;