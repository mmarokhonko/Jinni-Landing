import React, { Component } from "react";
import { string, func, object } from "prop-types";

import SelectWithIcon from "./generalComponents/SelectWithIcon";
import i18n from "../../tools/i18nextSetup";

import birthdayIcon from "../../assets/RegisterForm/icons/birthday.png";

const addLeadingZero = number => number >=10 ? number.toString() : `0${number.toString()}`;

const generateDayOfBirthOptions = () => {
    let options = [];

    for (let x = 1; x <= 31; x++) {
        const label = x.toString();
        const number = addLeadingZero(x.toString());

        options.push({
            label: label,
            value: number
        });
    }

    return options;
};

const generateMonthOfBirthOptions = () => {
    const months = i18n.t("formText:dateOfBirth.months", {returnObjects: true});

    const options = months.map((value, index) => {
        let monthNumber = addLeadingZero(index+1);
        return {label: value, value: monthNumber}
    });

    return options;
};

const generateYearOfBirthOptions = () => {
    const currYear = new Date().getFullYear();
    let options = [];

    for (let x = currYear - 18; x >= currYear - 150; x--) {
        const value = x.toString();

        options.push({ label: value, value });
    }

    return options;
};

const allOptions = {
    days: generateDayOfBirthOptions(),
    months: generateMonthOfBirthOptions(),
    years: generateYearOfBirthOptions()
}

class SelectDayOfBirth extends Component {
  state = {
      options: allOptions.days
  };

  componentDidMount() {
      if (Object.keys(this.props.value).length === 0) {
          this.selectHandler(this.state.options[0]);
      }
  }

  selectHandler = option => {
      this.props.selectHandler(this.props.name, option);
  };

  render() {
      const { value } = this.props;
	  const { options } = this.state;
	  
      return (
          <SelectWithIcon
              value={value}
              icon={birthdayIcon}
              options={options}
              selectHandler={this.selectHandler}
          />
      );
  }
}

SelectDayOfBirth.propTypes = {
    value: object,
    selectHandler: func.isRequired,
    name: string.isRequired
};

class SelectMonthOfBirth extends Component {
  state = {
      options: allOptions.months
  };

  componentDidMount() {
      if (Object.keys(this.props.value).length === 0) {
          this.selectHandler(this.state.options[0]);
      }
  }

  selectHandler = option => {
      this.props.selectHandler(this.props.name, option);
  };

  render() {
      const { value } = this.props;
      const { options } = this.state;

      return <SelectWithIcon value={value} options={options} selectHandler={this.selectHandler} />;
  }
}

SelectMonthOfBirth.propTypes = {
    value: object,
    selectHandler: func.isRequired,
    name: string.isRequired
};

class SelectYearOfBirth extends Component {
  state = {
      options: allOptions.years
  };

  componentDidMount() {
      if (Object.keys(this.props.value).length === 0) {
          this.selectHandler(this.state.options[0]);
      }
  }

  selectHandler = option => {
      this.props.selectHandler(this.props.name, option);
  };

  render() {
      const { value } = this.props;
      const { options } = this.state;

      return <SelectWithIcon value={value} options={options} selectHandler={this.selectHandler} />;
  }
}

SelectYearOfBirth.propTypes = {
    value: object,
    selectHandler: func.isRequired,
    name: string.isRequired
};

class DateOfBirthMobile extends Component {
  state = {
      maxDate: `${allOptions.years[0].value}-12-31`,
      minDate: `${allOptions.years[allOptions.years.length - 1].value}-01-01`,
      datePickerWidth: "0",
      placeholderText: "Date of birth"
  }

  componentDidMount(){
      this.setDatePickerWidth();
      window.addEventListener("resize", this.setDatePickerWidth);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.setDatePickerWidth);
  }

  //to handle Safari quirk about not making the datepicker 100% width
  setDatePickerWidth = () => {
      if(!this.wrap) {
          return
      }

      const wrapWidth = this.wrap.offsetWidth;
      this.setState({
          datePickerWidth: wrapWidth
      })
  }

  handleChange = event => {
      const value = event.target.value;
      const date = new Date(value);
      const day = addLeadingZero(date.getDate()) || {};
      const month = addLeadingZero(date.getMonth() + 1) || {};
      const year = date.getFullYear() || {};

      const yearOption = allOptions.years.find(option => option.value == year);

      if(!yearOption) {
        return this.setState({
          placeholderText: "At least 18 year old"
        })
      }
      
      this.props.selectHandler("dayOfBirth", allOptions.days.find(option => option.value == day));
      this.props.selectHandler("monthOfBirth", allOptions.months.find(option => option.value == month));
      this.props.selectHandler("yearOfBirth", allOptions.years.find(option => option.value == year));
  }

  valueIsSet = value => value ? Object.keys(value).length > 0 : false;

  render(){
      const {year, month, day, error} = this.props;
      const {maxDate, minDate, datePickerWidth, placeholderText} = this.state;

      const value = !this.valueIsSet(year)|| !this.valueIsSet(month) || !this.valueIsSet(day) ? undefined : `${year.value}-${month.value}-${day.value}`;

      const valueClasses = `birthday-mob_value${!value ? " -placeholder" : ""}`
      return(
          <div ref={wrap => this.wrap = wrap} className={`birthday-mob${error.active ? " -error" : ""}`}>
              <div className={valueClasses}>{value ? value : placeholderText}</div>
              <input max={maxDate} min={minDate} style={{width: datePickerWidth}} className="birthday-mob_input" type="date" onChange={this.handleChange}/>
          </div>
      )
  }
}

DateOfBirthMobile.propTypes = {
    year: object,
    month: object,
    day: object,
    error: object.isRequired,
    selectHandler: func.isRequired
}

module.exports = {
    SelectDayOfBirth,
    SelectMonthOfBirth,
    SelectYearOfBirth,
    DateOfBirthMobile
};
