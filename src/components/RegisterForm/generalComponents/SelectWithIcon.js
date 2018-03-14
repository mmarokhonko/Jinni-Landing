import React, {Component} from "react";
import {string, array, func, object} from "prop-types";
import ClickOutHandler from "react-onclickout";

class SelectWithIcon extends Component {
    state = {
        open: false,
        options: this.props.options || [],
        filterString: ""
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

    changeFilterFromInput = event => {
        this.setState({
            filterString: event.target.value
        }, () => this.filterOptions())
    }

    filterOptions = () => {
        let newOptions = this.props.options;
        const {filterString} = this.state;
        newOptions = newOptions.filter(option => option.label.toLowerCase().includes(filterString.toLowerCase()));
        this.setState({
            options:newOptions
        })
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
        const {value, icon} = this.props;
        const {open, options, filterString} = this.state;

        return(
            <ClickOutHandler onClickOut={this.ClickOutClose}> 
                <div className={`selwi_wrap ${open ? "-open" : ""}`}>
                    <div className={this.generateValueClasses()} onClick={this.toggleOpen} 
                        style={icon === "flag" ? {} : {backgroundImage: `url(${icon})`}}>{value.label}</div>
                    <div className="selwi_filter-input">
                        <input placeholder="Filter" type="text" value={filterString} onChange={e => this.changeFilterFromInput(e)}/>
                    </div>    
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