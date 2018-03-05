import React, { Component } from "react";
import { string } from "prop-types";
import moment from "moment";

class Timer extends Component {
  state = {
      drawDate: moment(this.props.drawDate, "YYYY-MM-DD HH:mm:ss ZZ").local(),
      currDate: moment(),
      timeRemains: "HH:MM:SS"
  };

  componentDidMount() {
      this.tick();
      this.interal = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
      clearInterval(this.interal);
  }

  tick = () => {
      const { drawDate, currDate } = this.state;
      let diff = drawDate.diff(currDate);
      diff = moment.duration(diff);
      const timeRemains = `
      ${diff.days() != 0 ? diff.days() + "d" : ""} 
      ${diff.hours() != 0 ? diff.hours() + "h" : ""}
      ${diff.minutes() != 0 ? diff.minutes() + "m" : ""}
      ${diff.seconds() != 0 ? diff.seconds() + "s" : ""}`;
      this.setState({
          timeRemains,
          currDate:moment()
      })
  };

  render() {
      const {timeRemains} = this.state;  

      return (
          <p className="help_step_text">
        Mega Millions draws are held twice a week. To find out if you’re a winner, check the results
        after the next draw in <span className="help_timer">{timeRemains}</span>.
          </p>
      );
  }
}

Timer.propTypes = {
    drawDate: string.isRequired
};

export default Timer;
