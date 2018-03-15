import React, { Component } from "react";
import { string } from "prop-types";
import moment from "moment";
import Media from "react-media";

class Timer extends Component {
  state = {
      drawDate: moment(this.props.drawDate, "YYYY-MM-DD HH:mm:ss ZZ").local(),
      currDate: moment(),
      timeRemains: "HH:MM:SS"
  };

  componentDidMount() {
      this.tick();
      this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  tick = () => {
      const { drawDate, currDate } = this.state;
      let diff = drawDate.diff(currDate);
      if (diff <= 0) {
          clearInterval(this.interval);
          return this.setState({
              timeRemains: "",
              currDate: moment()
          });
      }

      diff = moment.duration(diff);
      const timeRemains = `
			${diff.days() != 0 ? diff.days() + "d" : ""} 
			${diff.hours() != 0 ? diff.hours() + "h" : ""}
			${diff.minutes() != 0 ? diff.minutes() + "m" : ""}
			${diff.seconds() != 0 ? diff.seconds() + "s" : ""}`;
      this.setState({
          timeRemains: timeRemains,
          currDate: moment()
      });
  };

  render() {
      const { timeRemains } = this.state;

      return (
          <Media query="(min-width: 768px)">
              {matches =>
                  matches ? (
                      <p className="help_step_text">
              Mega Millions draws are held twice a week. To find out if you’re a winner, check the
              results after the next draw in <span className="help_timer">{timeRemains}</span>.
                      </p>
                  ) : (
                      <p className="help_step_text">
              Wait for the upcoming draw that <br/> 
			  will take place in: <br/>
			  <span className="help_timer">{timeRemains}</span> <br/>
			  to see how much you won.
                      </p>
                  )
              }
          </Media>
      );
  }
}

Timer.propTypes = {
    drawDate: string.isRequired
};

export default Timer;
