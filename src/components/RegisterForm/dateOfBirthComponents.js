import React, { Component } from "react";
import { string, func, object } from "prop-types";

import SelectWithIcon from "./generalComponents/SelectWithIcon";
import i18n from "../../tools/i18nextSetup";

import bithdayIcon from "../../assets/RegisterForm/icons/birthday.png";

const generateDayOfBirthOptions = () => {
    let options = [];

    for (let x = 1; x <= 31; x++) {
        const label = x.toString();
        const number = x >=10 ? x.toString() : `0${x.toString()}`;

        options.push({
            label: label,
            value: number
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
              icon={window.innerWidth >= 768 && bithdayIcon}
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
    const months = i18n.t("formText:dateOfBirth.months", {returnObjects: true});

    const options = months.map((value, index) => {
        let mothnNumber = index+1 >=10 ? (index+1).toString() : `0${(index+1).toString()}`;
        return {label: value, value: mothnNumber}
    });

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
