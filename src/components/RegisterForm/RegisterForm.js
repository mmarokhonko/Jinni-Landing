import React, { Component } from "react";
import axios from "axios";
import { func, string } from "prop-types";
import Media from "react-media";

import InputWithIcon from "./generalComponents/InputWithIcon";
import SelectTitle from "./SelectTitle";
import { SelectDayOfBirth, SelectMonthOfBirth, SelectYearOfBirth } from "./dateOfBirthComponents";
import { SelectCountry, SelectPhoneCode } from "./countryComponents";
import { isFieldError } from "./tools/validationFunctions";
import {translate} from "react-i18next";

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
          this.props.t("errors.firstName"),
              active: false,
              justEmpty: false
          },
          lastNameError: {
              text:
			  this.props.t("errors.lastName"),
              active: false,
              justEmpty: false
          },
          emailError: {
              text: this.props.t("errors.emailError"),
              active: false,
              justEmpty: false
          },
          passwordError: {
              text: this.props.t("errors.passwordError"),
              active: false,
              justEmpty: false
          },
          cityError: {
              text: this.props.t("errors.generalError"),
              active: false,
              justEmpty: false
          },
          codeError: {
              text: this.props.t("errors.generalError"),
              active: false,
              justEmpty: false
          },
          streetError: {
              text: this.props.t("errors.generalError"),
              active: false,
              justEmpty: false
          },
          phoneNumberError: {
              text: this.props.t("errors.generalError"),
              active: false,
              justEmpty: false
          },
          termsAgreedError: {
              text: this.props.t("errors.termsAgreedError"),
              active: false,
              justEmpty: false
          },
          dateOfBirthError: {
              text: this.props.t("errors.dateOfBirthError"),
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
      let ipAndCountryObject = await axios.get(
          "https://api.jinnilotto.com/affiliate/getCountry/response.json"
      );
      const ip = ipAndCountryObject.data.ip;
      const userCountryCode = ipAndCountryObject.data.countryCode;
      const countryCode =
      userCountryCode &&
      restrictedCountries.indexOf(userCountryCode) === -1 &&
      restrictedCountries !== "banned"
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
              const dayOfBirth = fields.dayOfBirth.value,
                  monthOfBirth = fields.monthOfBirth.value,
                  yearOfBirth = fields.yearOfBirth.value;

              const birthDate = `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`;

              isError = isFieldError("dateOfBirth", birthDate);
          } else {
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
	  const formFrame = this.formFrame;
      this.resetErrors(() => {
          this.validateFields(this.state.firstStepInputs, () => {
              this.setState(
                  {
                      step2: true
                  },
                  () => {
                      formFrame.scrollIntoView();
                  }
              );
          });
      });
  };

  moveTo1stStep = () => {
      const formFrame = this.formFrame;	  
      this.setState(
          {
              step2: false
          },
          () => formFrame.scrollIntoView()
      );
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

	  formData.address = fields.street;
	  formData.postCode = fields.code;
      formData.phoneNumber = `${fields.phoneCode.value.replace(/\s/g, "")}-${fields.phoneNumber}`;

      formData.ip = userIp;

      return formData;
  };

  render() {
      const { step2, fields, errorObjects, userCountryCode } = this.state;
      const { offer, t } = this.props;

      if (!step2)
          return (
              <div ref={frame => (this.formFrame = frame)} className="frame form_frame-vert">
				  <h4 className="frame_title" dangerouslySetInnerHTML={{__html: offer.indexOf("freeticket") !== -1 ? t("titleFree") : t("titleNotFree")}}>
                  </h4>
                  <form className="form" autoComplete="false">
                      <div className="form_row">
                          <h5 className="form_row_title">{t("rowTitles.name")}</h5>
                          <div className="form_row_subwrap">
                              <SelectTitle value={fields.title} name="title" selectHandler={this.selectHandler} />
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="firstName"
                                  placeholder={t("placeholders.name")}
                                  value={fields.firstName}
                                  error={errorObjects.firstNameError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">{t("rowTitles.lastName")}</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  icon="profile"
                                  name="lastName"
                                  placeholder={t("placeholders.lastName")}
                                  value={fields.lastName}
                                  error={errorObjects.lastNameError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">{t("rowTitles.email")}</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="email"
                                  icon="email"
                                  name="email"
                                  placeholder={t("placeholders.email")}
                                  value={fields.email}
                                  error={errorObjects.emailError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">{t("rowTitles.password")}</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="password"
                                  icon={window.innerWidth <= 768 ? "lockMob" : "lock"}
                                  name="password"
                                  placeholder={t("placeholders.password")}
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
                              {t("buttons.next")}
                          </button>
                      </div>
                  </form>
                  <div className="form_jinni">
                      <img src={jinniImg} alt="" />
                      <p>{t("goodLuck")}</p>
                  </div>
              </div>
          );
      else
          return (
              <div  ref={frame => (this.formFrame = frame)} className="frame form_frame-vert">
                  <h4 className="frame_title" dangerouslySetInnerHTML={{__html: offer.indexOf("freeticket") !== -1 ? t("titleFree") : t("titleNotFree")}}>
                  </h4>
                  <form className="form" autoComplete="false" onSubmit={e => this.submitHandler(e)}>
                      <div className="form_row">
                          <h5 className="form_row_title">{t("rowTitles.country")}</h5>
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
                          <h5 className="form_row_title">{t("rowTitles.cityCode")}</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="city"
                                  icon="geo"
                                  placeholder={t("placeholders.city")}
                                  value={fields.city}
                                  error={errorObjects.cityError}
                              />
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="code"
                                  icon="geo"
                                  placeholder={t("placeholders.code")}
                                  value={fields.code}
                                  error={errorObjects.codeError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">{t("rowTitles.street")}</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="street"
                                  icon="geo"
                                  placeholder={t("placeholders.street")}
                                  value={fields.street}
                                  error={errorObjects.streetError}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">{t("rowTitles.dateOfBirth")}</h5>
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
                          <h5 className="form_row_title">{t("rowTitles.number")}</h5>
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
                                  type="tel"
                                  name="phoneNumber"
                                  icon="phone"
                                  placeholder={t("placeholders.number")}
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
                                          {t("buttons.back")}
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
                              {offer.indexOf("freeticket") !== -1 ? t("buttons.freeticketSubmit") : t("buttons.notfreeSubmit")}
                          </button>
                          {errorObjects.dateOfBirthError.active ? (
                              <p className="form_step2_bottom_error -shown">
                                  {errorObjects.dateOfBirthError.text}
                              </p>
                          ) : (
                              ""
                          )}
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
						  <div dangerouslySetInnerHTML={{__html:t("terms")}}>
						  </div>
                      </div>
                  </form>
              </div>
          );
  }
}

RegisterForm.propTypes = {
    submitHandler: func.isRequired,
    offer: string.isRequired,
    t: func.isRequired
};

export default translate("formText")(RegisterForm);
