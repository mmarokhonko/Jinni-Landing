import React, { Component } from "react";
import { string, func, object } from "prop-types";

import SelectWithIcon from "./generalComponents/SelectWithIcon";

import bithdayIcon from "../../assets/RegisterForm/icons/birthday.png";

const generateDayOfBirthOptions = () => {
    let options = [];

    for (let x = 1; x <= 31; x++) {
        const value = x.toString();

        options.push({
            label: value,
            value
        });
    }

    return options;
};

class SelectDayOfBirth extends Component {
  state = {
      options: generateDayOfBirthOptions()
  };

  componentDidMount() {
      this.selectHandler(this.state.options[0]);
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
              icon={bithdayIcon}
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

const generateMonthOfBirthOptions = () => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const options = months.map(value => ({ label: value, value }));

    return options;
};

class SelectMonthOfBirth extends Component {
  state = {
      options: generateMonthOfBirthOptions()
  };

  componentDidMount() {
      this.selectHandler(this.state.options[0]);
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

const generateYearOfBirthOptions = () => {
    const currYear = new Date().getFullYear();
    let options = [];

    for (let x = currYear - 18; x >= currYear - 100; x--) {
        const value = x.toString();

        options.push({ label: value, value });
    }

    return options;
};

class SelectYearOfBirth extends Component {
  state = {
      options: generateYearOfBirthOptions()
  };

  componentDidMount() {
      this.selectHandler(this.state.options[0]);
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

module.exports = {
    SelectDayOfBirth,
    SelectMonthOfBirth,
    SelectYearOfBirth
};
