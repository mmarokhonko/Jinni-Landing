import React, {Component} from "react";
import {string} from "prop-types";
import moment from "moment";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawDate: moment(props.drawDate, "YYYY-MM-DD HH:mm:ss ZZ").local()
        }
    }

    componentDidMount() {

    }

    render() {
        const {drawDate} = this.state;
        const date = drawDate.format("DD MMMM YYYY")

        return(
            <p className="help_step_text">
              Mega Millions draws are held twice a week. To find out if you’re a winner, check the
              results after the next draw on <span className="help_timer">{date}</span>.</p>       
        )
    }
}

Timer.propTypes = {
    drawDate: string.isRequired
}

export default Timer;