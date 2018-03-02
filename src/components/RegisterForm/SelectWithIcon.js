import React, {Component} from "react";
import {string, array, func} from "prop-types";
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

    render() {
        const {value, options, icon} = this.props;
        const {open} = this.state;
        return(
            <ClickOutHandler onClickOut={this.ClickOutClose}> 
                <div className={`selwi_wrap ${open ? "-open" : ""}`}>
                    <div className="selwi_value" onClick={this.toggleOpen} style={{backgroundImage: `url(${icon})`}}>{value}</div>
                    <ul className="selwi_options">
                        {options.map((option, i) => <li onClick={() => this.selectHandler(option)} key={i}>{option.label}</li>)}
                    </ul>
                </div>
            </ClickOutHandler>
        )
    } 
}

SelectWithIcon.propTypes = {
    value: string.isRequired,
    options: array.isRequired,
    icon: string,
    selectHandler: func.isRequired
}

export default SelectWithIcon;