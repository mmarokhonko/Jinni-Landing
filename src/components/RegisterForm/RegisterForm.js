import React, { Component } from "react";

import InputWithIcon from "./InputWithIcon";
import SelectTitle from "./SelectTitle";

import jinniImg from "../../assets/RegisterForm/img/jinni.png";

class RegisterFrom extends Component {
  state = {
      title: "Mr.",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contry: "United Kingdom",
      city: "",
      code: "",
      street: "",
      dayOfBirth: 1,
      monthOfBirth: "Jan",
      yearOfBirth: 1993,
      phoneCode: null,
      phoneNumber: null
  };

  inputHandler = (name, e) => {
      const value = e.target.value;

      this.setState({
          [name]: value
      });
  };

  selectHandler = (name, option) => {
      this.setState({
          [name]: option.value
      });
  };

  render() {
      return (
          <div className="frame form_frame-vert">
              <h4 className="frame_title">Register to place FREE bet</h4>
              <form className="form" autoComplete="false">
                  <div className="form_row">
                      <h5 className="form_row_title">Title and Name</h5>
                      <div className="form_row_subwrap">
                          <SelectTitle value={this.state.title} name="title" selectHandler={this.selectHandler}/>
                          <InputWithIcon
                              inputHandler={this.inputHandler}
                              type="text"
                              name="firstName"
                              value={this.state.firstName}
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
                              value={this.state.lastName}
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
                              value={this.state.email}
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
                              value={this.state.password}
                          />
                      </div>
                  </div>
                  <button className="btn-green form_confirm-btn">Next</button>
              </form>
              <div className="form_jinni">
                  <img src={jinniImg} alt="" />
                  <p>Good Luck!</p>
              </div>
          </div>
      );
  }
}

export default RegisterFrom;
