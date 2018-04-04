import React, { Component } from "react";
import axios from "axios";
import { func } from "prop-types";
import Media from "react-media";

import InputWithIcon from "./generalComponents/InputWithIcon";
import SelectTitle from "./SelectTitle";
import { SelectDayOfBirth, SelectMonthOfBirth, SelectYearOfBirth } from "./dateOfBirthComponents";
import { SelectCountry, SelectPhoneCode } from "./countryComponents";
import { isFieldError } from "./tools/validationFunctions";

import { restrictedCountries } from "./data/restrictedCountries.json";

import jinniImg from "../../assets/RegisterForm/img/jinni.png";

class RegisterForm extends Component {
  state = {
      fields: {
          title: {},
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          country: {},
          city: "",
          code: "",
          street: "",
          dayOfBirth: {},
          monthOfBirth: {},
          yearOfBirth: {},
          phoneCode: {},
          phoneNumber: "",
          termsAgreed: false
      },
      errorObjects: {
          firstNameError: {
              text:
          "First name must contain a minimum of 2 and a maximum of 24 characters. It must also not contain any numbers or special characters",
              active: false,
              justEmpty: false
          },
          lastNameError: {
              text:
          "Last name must contain a minimum of 2 and a maximum of 24 characters. It must also not contain any numbers or special characters",
              active: false,
              justEmpty: false
          },
          emailError: {
              text: "Hmmm, this doesn't look like a valid email. Please double check.",
              active: false,
              justEmpty: false
          },
          passwordError: {
              text: "For your security your password must have at least 8 characters",
              active: false,
              justEmpty: false
          },
          cityError: {
              text: "Sorry, this field is not valid",
              active: false,
              justEmpty: false
          },
          codeError: {
              text: "Sorry, this field is not valid",
              active: false,
              justEmpty: false
          },
          streetError: {
              text: "Sorry, this field is not valid",
              active: false,
              justEmpty: false
          },
          phoneNumberError: {
              text: "Sorry, this field is not valid",
              active: false,
              justEmpty: false
          },
          termsAgreedError: {
              text:
          "Sorry, we know you're in a hurry to play but you have to accept our terms and conditions to register",
              active: false,
              justEmpty: false
          },
          dateOfBirthError: {
              text:
          "Your date of birth does not match our \"over the age of 18\" requirement. This is one wish that Jinni the Genie can't grant you.",
              active: false,
              justEmpty: false
          }
      },
      firstStepInputs: ["firstName", "lastName", "email", "password"],
      secondStepInputs: ["city", "code", "street", "phoneNumber", "termsAgreed", "dateOfBirth"],
      userCountryCode: undefined,
      step2: false
  };

  fetchUserCountryCode = async () => {
      let ipAndCountryObject = await axios.get("https://api.jinnilotto.com/affiliate/getCountry/response.json");
      const ip = ipAndCountryObject.data.ip;
	  console.log(`USER IP: ${ip}`);
      const userCountryCode = ipAndCountryObject.data.countryCode;
      console.log(`COUNTRY CODE: ${userCountryCode}`);
      const countryCode =
      userCountryCode && restrictedCountries.indexOf(userCountryCode) === -1 && restrictedCountries !== "banned"
          ? userCountryCode
          : undefined;
      return { countryCode, ip };
  };

  async componentDidMount() {
      let userIpAndCountryCode = await this.fetchUserCountryCode();
      const userCountryCode = userIpAndCountryCode.countryCode;
      const userIp = userIpAndCountryCode.ip;

      this.setState({
          userCountryCode,
          userIp
      });
  }

  inputHandler = (name, e) => {
      const value = e.target.value;
      let newFields = this.state.fields;

      newFields[name] = value;

      this.setState({
          fields: newFields
      });
  };

  selectHandler = (name, option) => {
      let newFields = this.state.fields;
      newFields[name] = option;
      this.setState({
          fields: newFields
      });
  };

  checkboxHandle = () => {
      let newFields = this.state.fields;

      newFields.termsAgreed = !newFields.termsAgreed;

      this.setState({
          fields: newFields
      });
  };

  resetErrors = callback => {
      let errorObjects = this.state.errorObjects;
      Object.keys(errorObjects).forEach(fieldErrorObject => {
          errorObjects[fieldErrorObject].active = false;
          errorObjects[fieldErrorObject].justEmpty = false;
      });

      this.setState(
          {
              errorObjects
          },
          () => callback()
      );
  };

  validateFields = (inputsArray, callback) => {
      let { fields, errorObjects } = this.state;

      let errorFound = false;

      inputsArray.forEach(fieldName => {
          let isError = false;
		  
          if (fieldName === "dateOfBirth") {
			  console.log("Picked up date");
              const dayOfBirth = fields.dayOfBirth.value,
                  monthOfBirth = fields.monthOfBirth.value,
				  yearOfBirth = fields.yearOfBirth.value;

              const birthDate = `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`;
			
			  isError = isFieldError("dateOfBirth", birthDate);
		  }
		  else {
              isError = isFieldError(fieldName, fields[fieldName]);			
		  }

          if (isError) {
              errorObjects[`${fieldName}Error`].active = true;
              errorFound = true;
          }
          if (isError instanceof Object) {
              errorObjects[`${fieldName}Error`].justEmpty = true;
          }
      });

      if (errorFound) {
          this.setState({
              errorObjects
          });
      } else {
          callback();
      }
  };

  moveTo2ndStep = () => {
      this.resetErrors(() => {
          this.validateFields(this.state.firstStepInputs, () => {
              this.setState({
                  step2: true
              });
          });
      });
  };

  moveTo1stStep = () => {
      this.setState({
          step2: false
      });
  };

  submitHandler = e => {
      e.preventDefault();
      this.resetErrors(() => {
          this.validateFields(this.state.secondStepInputs, () => {
              const formData = this.formatAndSendDataUpwards();
              this.props.submitHandler(formData, this.errorNode);
          });
      });
  };

  formatAndSendDataUpwards = () => {
      const { fields, userIp } = this.state;
      const simpleSelects = ["title"];
      const fieldsWithSpecialHandling = ["termsAgreed", "code", "street", "phoneCode", "phoneNumber"];

      let formData = {};
      Object.keys(fields).forEach(fieldName => {
          const field = fields[fieldName];

          switch (true) {
          case fieldName === "title": {
              formData.gender = field.value;
              break;
          }
          case fieldName === "country": {
              formData.country = field.label;
              formData.countryCode = field.countryCode;
              break;
          }
          case fieldName.includes("OfBirth") || fieldsWithSpecialHandling.indexOf(fieldName) !== -1: {
              break;
          }
          case simpleSelects.indexOf(fieldName) !== -1: {
              formData[fieldName] = field.value;
              break;
          }
          default: {
              formData[fieldName] = field;
              break;
          }
          }
      });

      const dayOfBirth = fields.dayOfBirth.value,
          monthOfBirth = fields.monthOfBirth.value,
          yearOfBirth = fields.yearOfBirth.value;

      formData.birthDate = `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`;

      formData.address = `${fields.city}, ${fields.street}, ${fields.code}`;
      formData.phoneNumber = `${fields.phoneCode.value}-${fields.phoneNumber}`;

      formData.ip = userIp;

      return formData;
  };

  render() {
      const { step2, fields, errorObjects, userCountryCode } = this.state;

      if (!step2)
          return (
              <div className="frame form_frame-vert">
                  <h4 className="frame_title">
            Register to place <span>FREE</span> bet
                  </h4>
                  <form className="form" autoComplete="false">
                      <div className="form_row">
                          <h5 className="form_row_title">Title and Name</h5>
                          <div className="form_row_subwrap">
                              <SelectTitle value={fields.title} name="title" selectHandler={this.selectHandler} />
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="firstName"
                                  placeholder="Name"
                                  value={fields.firstName}
                                  error={errorObjects.firstNameError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Last Name</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  icon="profile"
                                  name="lastName"
                                  placeholder="Last Name"
                                  value={fields.lastName}
                                  error={errorObjects.lastNameError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Email</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="email"
                                  icon="email"
                                  name="email"
                                  placeholder="email"
                                  value={fields.email}
                                  error={errorObjects.emailError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Password</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="password"
                                  icon={window.innerWidth <= 768 ? "lockMob" : "lock"}
                                  name="password"
                                  placeholder="Password"
                                  value={fields.password}
                                  error={errorObjects.passwordError}
                              />
                          </div>
                      </div>
                      <div className="form_btn_wrap">
                          <button
                              type="button"
                              className="btn-general btn-green form_submit-btn form_confirm-btn"
                              onClick={this.moveTo2ndStep}
                          >
                Next
                          </button>
                      </div>
                  </form>
                  <div className="form_jinni">
                      <img src={jinniImg} alt="" />
                      <p>Good Luck!</p>
                  </div>
              </div>
          );
      else
          return (
              <div className="frame form_frame-vert">
                  <h4 className="frame_title">Register to place FREE bet</h4>
                  <form className="form" autoComplete="false" onSubmit={e => this.submitHandler(e)}>
                      <div className="form_row">
                          <h5 className="form_row_title">Country</h5>
                          <div className="form_row_subwrap">
                              <SelectCountry
                                  value={fields.country}
                                  name="country"
                                  selectHandler={this.selectHandler}
                                  userCountryCode={userCountryCode}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">City and Code</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="city"
                                  icon="geo"
                                  placeholder="City"
                                  value={fields.city}
                                  error={errorObjects.cityError}
                              />
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="code"
                                  icon="geo"
                                  placeholder="Code"
                                  value={fields.code}
                                  error={errorObjects.codeError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Street</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="street"
                                  icon="geo"
                                  placeholder="Address"
                                  value={fields.street}
                                  error={errorObjects.streetError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Date of Birth</h5>
                          <div className="form_row_subwrap">
                              <SelectDayOfBirth
                                  value={fields.dayOfBirth}
                                  name="dayOfBirth"
                                  selectHandler={this.selectHandler}
                              />
                              <SelectMonthOfBirth
                                  value={fields.monthOfBirth}
                                  name="monthOfBirth"
                                  selectHandler={this.selectHandler}
                              />
                              <SelectYearOfBirth
                                  value={fields.yearOfBirth}
                                  name="yearOfBirth"
                                  selectHandler={this.selectHandler}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Phone Number</h5>
                          <div className="form_row_subwrap">
                              <SelectPhoneCode
                                  value={fields.phoneCode}
                                  name="phoneCode"
                                  selectHandler={this.selectHandler}
                                  userCountryCode={userCountryCode}
                                  selectedCountryCode={fields.country.countryCode}
                              />
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="phoneNumber"
                                  icon="phone"
                                  placeholder="Phone"
                                  value={fields.phoneNumber}
                                  error={errorObjects.phoneNumberError}
                              />
                          </div>
                      </div>
                      <div className="form_step2_bottom">
                          <Media query="(min-width: 768px)">
                              {matches =>
                                  matches ? (
                                      <button type="button" className="form_back-btn" onClick={this.moveTo1stStep}>
                      back
                                      </button>
                                  ) : (
                                      <button
                                          onClick={this.moveTo1stStep}
                                          type="button"
                                          className="form_back-btn-mobile"
                                      />
                                  )
                              }
                          </Media>

                          <button type="submit" className="btn-general btn-green form_submit-btn">
                Claim free bet
                          </button>
						  {errorObjects.dateOfBirthError.active ? <p className="form_step2_bottom_error -shown">{errorObjects.dateOfBirthError.text}</p> : ""}						  
                          <p
                              className={`form_step2_bottom_error ${
                                  errorObjects.termsAgreedError.active ? "-shown" : ""
                              }`}
                              ref={text => (this.errorNode = text)}
                          >
                              {errorObjects.termsAgreedError.active ? errorObjects.termsAgreedError.text : ""}
                          </p>
                      </div>
                      <div className="form_terms">
                          <div className="form_terms_checkbox">
                              <input
                                  id="terms"
                                  checked={fields.termsAgreed}
                                  onChange={this.checkboxHandle}
                                  type="checkbox"
                              />
                              <label htmlFor="terms" />
                          </div>
                          <p>
                I certify that I am at least 18 years old, or the legal minimum age in my country of
                residence. I accept that the customer funds protection rating is ‘Medium’ as
                outlined in the{" "}
                              <a href="http://jinnilotto.com/terms-conditions/">Terms and Conditions</a> which I
                accept, along with the{" "}
                              <a href="https://jinnilotto.com/privacy-policy">Privacy Policy</a>. We believe in
                responsible gambling. You can set your deposit limit and preferences{" "}
                              <a href="https://jinnilotto.com/responsible-gaming-policy">here</a>.
                          </p>
                      </div>
                  </form>
              </div>
          );
  }
}

RegisterForm.propTypes = {
    submitHandler: func.isRequired
};

export default RegisterForm;
