import React, { Component } from "react";
import { string, func, object } from "prop-types";

import SelectWithIcon from "./generalComponents/SelectWithIcon";
import allCountries from "./data/countries.json";
import { restrictedCountries } from "./data/restrictedCountries.json";

const filteredCountries = allCountries.filter(
    country => country.status === "assigned" && restrictedCountries.indexOf(country.alpha2) === -1
);

const generateCountryOptions = () => {
    const options = filteredCountries.map(country => ({
        label: country.name,
        value: country.alpha2,
        countryCode: country.alpha2
    }));

    const sortedOptions = options.sort((a, b) => {
        return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
    });

    return sortedOptions;
};

class SelectCountry extends Component {
  state = {
      options: generateCountryOptions(),
      userCountryCode: undefined
  };

  async componentDidMount() {
      const { userCountryCode, value } = this.props;
	  const { options } = this.state;
	  const firstOption = options[0];	  

	  if (Object.keys(value).length === 0) {
          if (firstOption && !userCountryCode) {
              return this.selectHandler(firstOption);
          } else {
              this.selectUserCountry(userCountryCode);
          }
	  }      
  }

  componentDidUpdate(prevProps) {
      const { userCountryCode } = this.props;

      if (userCountryCode && prevProps.userCountryCode !== userCountryCode) {
          this.selectUserCountry(userCountryCode);
      }
  }

  selectUserCountry = code => {
      const allOptions = this.state.options;
      const country = allOptions.filter(option => option.countryCode === code)[0];
      console.log(country);
      if (country) {
          this.selectHandler(country);
      } else {
          this.selectHandler(allOptions[0]);
      }
  };

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
    name: string.isRequired,
    userCountryCode: string
};

const generatePhoneCodeOptions = () => {
    let options = [];

    filteredCountries.forEach(country => {
        country.countryCallingCodes.forEach(code => {
            options.push({
                value: code,
                label: code,
                country: country.name,
                countryCode: country.alpha2
            });
        });
    });

    const sortedOptions = options.sort((a, b) => {
        return a.country.toLowerCase().localeCompare(b.country.toLowerCase());
    });

    return sortedOptions;
};

class SelectPhoneCode extends Component {
  state = {
      options: generatePhoneCodeOptions()
  };

  async componentDidMount() {
      const { userCountryCode, value } = this.props;
	  const { options } = this.state;

	  const firstOption = options[0];
	  
	  if (Object.keys(value).length === 0) {
          if (firstOption && !userCountryCode) {
              return this.selectHandler(firstOption);
          } else {
              this.selectUserCountry(userCountryCode);
          }
	  }
  }

  componentDidUpdate(prevProps) {
      const { userCountryCode } = this.props;

      if (userCountryCode && prevProps.userCountryCode !== userCountryCode) {
          this.selectUserCountry(userCountryCode);
      }
  }

  selectUserCountry = code => {
      const allOptions = this.state.options;
      const country = allOptions.filter(option => option.countryCode === code)[0];
      if (country) {
          this.selectHandler(country);
      } else {
          this.selectHandler(allOptions[0]);
      }
  };

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
    name: string.isRequired,
    userCountryCode: string
};

module.exports = {
    SelectCountry,
    SelectPhoneCode
};
