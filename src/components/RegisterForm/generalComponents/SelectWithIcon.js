import React, { Component, Fragment } from "react";
import { string, array, func, object, bool, oneOfType } from "prop-types";
import Media from "react-media";
import ClickOutHandler from "react-onclickout";

class SelectWithIcon extends Component {
  state = {
      open: false,
      disabledChange: false,
      options: this.props.options || [],
	    filterString: "",
      allowFilter: this.props.options.length > 5
  };

  componentDidUpdate(prevProps) {
      if(Object.keys(prevProps.value).length === 0) {
          this.setState({
              disabledChange: this.props.value.disabledChange
          })
      }
  }

  openList = () => {
      this.setState({
          open: !this.state.disabledChange
      });
  };

  closeList = () => {
      this.setState({
          open: false
      });
  };

  selectHandler = option => {
      this.props.selectHandler(option);
      this.setState({
          open: false
      });
  };

  selectHandlerMobile = event => {
      const selectedValue = event.target.value;
      const selectedOption = this.state.options.find(option => option.value === selectedValue);
      this.props.selectHandler(selectedOption);
      this.setState({
          open: false
      });
  };

  changeFilterFromInput = event => {
      this.setState(
          {
              filterString: event.target.value
          },
          () => this.filterOptions()
      );
  };

  filterOptions = () => {
      let newOptions = this.props.options;
	  const { filterString } = this.state;
	  
      newOptions = newOptions.filter(option =>
          option.label.toLowerCase().includes(filterString.toLowerCase())
	  );
	  this.setState({
          options: newOptions
      });
  };

  generateValueClasses = () => {
      const { value, icon } = this.props;

      let classString = "selwi_value";

      if (!icon) {
          return classString;
      }

      if (icon === "flag" && value.countryCode) {
          const code = value.countryCode.toLowerCase();
          return classString.concat(` -flag-icon flag flag-${code}`);
      } else {
          return classString.concat(" -icon");
      }
  };

  render() {
      const { value, icon } = this.props;
	  const { open, options, filterString, allowFilter, disabledChange } = this.state;

      return (
          <ClickOutHandler onClickOut={this.closeList}>
              <div
                  ref = {selectWrap => this.selectWrap = selectWrap}
                  className={`selwi_wrap ${open ? "-open" : ""} ${disabledChange ? "-disabled" : ""}`}
                  onFocus={this.openList}
                  onClick={this.openList}                     
              >
                  <div
                      tabIndex="0"
                      onBlur={() => !allowFilter && this.closeList()}
                      className={this.generateValueClasses()}
                      style={icon === "flag" ? {} : { backgroundImage: `url(${icon})` }}
                  >
                      {value.label}
                  </div>
                  <Media query="(min-width: 768px)">
                      {matches => matches ? (
                          <Fragment>
                              {allowFilter && (
                                  <div className="selwi_filter-input">
                                      <input
                                          placeholder="Filter"
                                          type="text"
                                          value={filterString}
                                          onChange={e => this.changeFilterFromInput(e)}
                                          onBlur={this.closeList}
                                      />
                                  </div>
                              )}
                              <ul className="selwi_options">
                                  {options.map((option, i) => (
                                      <li
                                          className={
                                              option.countryCode
                                                  ? `-flag-icon flag flag-${option.countryCode.toLowerCase()}`
                                                  : ""
                                          }
                                          onMouseDown={() => this.selectHandler(option)}
                                          key={i}
                                      >
                                          {option.label}
                                      </li>
                                  ))}
                              </ul>
                          </Fragment>
                      ) : (
                          <select className="selwi_mob-select" onChange={this.selectHandlerMobile}>
                              {options.map((option, i) => (
                                  <option key={i} value={option.value}>{option.label}</option>
                              ))}
                          </select>
                      )}
                  </Media>
              </div>
          </ClickOutHandler>
      );
  }
}

SelectWithIcon.propTypes = {
    value: object,
    options: array.isRequired,
    icon: oneOfType([string, bool]),
    selectHandler: func.isRequired
};

export default SelectWithIcon;