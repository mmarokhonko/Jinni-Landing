import React, { Component } from "react";
import { string, func, object } from "prop-types";

import SelectWithIcon from "./generalComponents/SelectWithIcon";
import allCountries from "./data/countries.json";
import { restrictedCountries } from "./data/restrictedCountries.json";

const filteredCountries = allCountries
    .filter(
        country => country.status === "assigned" && restrictedCountries.indexOf(country.alpha2) === -1
    );

const generateCountryOptions = () => {
    const options = filteredCountries.map(country => ({
        label: country.name,
        value: country.alpha2,
        countryCode: country.alpha2
    }));
    return options;
};

class SelectCountry extends Component {
  state = {
      options: generateCountryOptions()
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
              icon="flag"
              options={options}
              selectHandler={this.selectHandler}
          />
      );
  }
}

SelectCountry.propTypes = {
    value: object,
    selectHandler: func.isRequired,
    name: string.isRequired
};

const generatePhoneCodeOptions = () => {
    let options = [];

    filteredCountries.forEach(country => {
        country.countryCallingCodes.forEach(code => {
            options.push({ value: code, label: code, countryCode: country.alpha2 });
        });
    });

    return options;
};

class SelectPhoneCode extends Component {
  state = {
      options: generatePhoneCodeOptions()
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
          <div className="select-phone-code">
              <SelectWithIcon
                  value={value}
                  icon="flag"
                  options={options}
                  selectHandler={this.selectHandler}
              />
          </div>
      );
  }
}

SelectPhoneCode.propTypes = {
    value: object,
    selectHandler: func.isRequired,
    name: string.isRequired
};

module.exports = {
    SelectCountry,
    SelectPhoneCode
};
