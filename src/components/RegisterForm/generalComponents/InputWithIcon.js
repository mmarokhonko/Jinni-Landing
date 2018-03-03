import React, { Component } from "react";
import { string, number, func, oneOfType } from "prop-types";

import geoIcon from "../../../assets/RegisterForm/icons/geo.png";
import mailIcon from "../../../assets/RegisterForm/icons/mail.png";
import lockIcon from "../../../assets/RegisterForm/icons/lock.png";
import profileIcon from "../../../assets/RegisterForm/icons/profile.png";
import phoneIcon from "../../../assets/RegisterForm/icons/phone.png";

class InputWithIcon extends Component {
  state = {
      icons: {
          geo: geoIcon,
          email: mailIcon,
          lock: lockIcon,
          profile: profileIcon,
          phone: phoneIcon
      }
  };

  render() {
      const { type, icon, value, name, inputHandler } = this.props;
      const { icons } = this.state;

      return (
          <div className="inpwi_wrap">
              <input
                  auto-complete={`${name}-new`}
                  onChange={e => inputHandler(name, e)}
                  value={value}
                  name={name}
                  className={`inpwi ${!icon ? "-no-icon" : ""}`}
                  type={type}
                  style={{ backgroundImage: `url(${icons[icon]})` }}
              />
          </div>
      );
  }
}

InputWithIcon.propTypes = {
    type: string.isRequired,
    icon: string,
    name: string.isRequired,
    value: oneOfType([string, number]).isRequired,
    inputHandler: func.isRequired
};

export default InputWithIcon;
