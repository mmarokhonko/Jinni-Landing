import React, { Component } from "react";

import InputWithIcon from "./InputWithIcon";
import SelectTitle from "./SelectTitle";
import { SelectDayOfBirth, SelectMonthOfBirth, SelectYearOfBirth } from "./dateOfBirthComponents";

import jinniImg from "../../assets/RegisterForm/img/jinni.png";

class RegisterFrom extends Component {
  state = {
      fields: {
          title: {},
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          country: "United Kingdom",
          city: "",
          code: "",
          street: "",
          dayOfBirth: {},
          monthOfBirth: {},
          yearOfBirth: {},
          phoneCode: "",
          phoneNumber: "",
          termsAgreed: false
      },
      step2: false
  };

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
  changeStep = () => {
      this.setState({
          step2: true
      });
  };

  render() {
      const { step2, fields } = this.state;

      if (!step2)
          return (
              <div className="frame form_frame-vert">
                  <h4 className="frame_title">Register to place FREE bet</h4>
                  <form className="form" autoComplete="false">
                      <div className="form_row">
                          <h5 className="form_row_title">Title and Name</h5>
                          <div className="form_row_subwrap">
                              <SelectTitle
                                  value={fields.title.label}
                                  name="title"
                                  selectHandler={this.selectHandler}
                              />
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="firstName"
                                  value={fields.firstName}
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
                                  value={fields.lastName}
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
                                  value={fields.email}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Password</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="password"
                                  icon="lock"
                                  name="password"
                                  value={fields.password}
                              />
                          </div>
                      </div>
                      <button type="button" className="btn-green form_confirm-btn" onClick={this.changeStep}>
              Next
                      </button>
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
                  <form className="form" autoComplete="false">
                      <div className="form_row">
                          <h5 className="form_row_title">Country</h5>
                          <div className="form_row_subwrap" />
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">City and Code</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="city"
                                  icon="geo"
                                  value={fields.city}
                              />
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="code"
                                  icon="geo"
                                  value={fields.code}
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
                                  value={fields.street}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Date of Birth</h5>
                          <div className="form_row_subwrap">
                              <SelectDayOfBirth
                                  value={fields.dayOfBirth.label}
                                  name="dayOfBirth"
                                  selectHandler={this.selectHandler}
                              />
                              <SelectMonthOfBirth
                                  value={fields.monthOfBirth.label}
                                  name="monthOfBirth"
                                  selectHandler={this.selectHandler}
                              />
                              <SelectYearOfBirth
                                  value={fields.yearOfBirth.label}
                                  name="yearOfBirth"
                                  selectHandler={this.selectHandler}
                              />
                          </div>
                      </div>
                      <div className="form_row">
                          <h5 className="form_row_title">Phone Number</h5>
                          <div className="form_row_subwrap">
                              <InputWithIcon
                                  inputHandler={this.inputHandler}
                                  type="text"
                                  name="phone"
                                  icon="phone"
                                  value={fields.phoneNumber}
                              />
                          </div>
                      </div>

                      <button type="submit" className="btn-green form_confirm-btn">
              Claim Free Bet
                      </button>

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
                outlined in the <a>Terms and Conditions</a> which I accept, along with the{" "}
                              <a>Privacy Policy</a>. We believe in responsible gambling. You can set your deposit
                limit and preferences
                              <a>here</a>.
                          </p>
                      </div>
                  </form>
              </div>
          );
  }
}

export default RegisterFrom;
