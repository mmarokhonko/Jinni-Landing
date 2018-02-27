import React, {Component} from "react";

import iconQuestion from "../../assets/Fact/icon/icon_question.svg"

class Fact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "The largest Mega Millions jackpot was a life-changing $656 million."
        };
    }

    render() {
        const {text} = this.state;

        return (
            <section className="fact">
                <div className="cont-zone">
                    <img src={iconQuestion} alt="" className="fact_icon"/>
                    <h4 className="fact_title">Did you know?</h4>
                    <p className="fact_text">T{text}</p>
                </div>
            </section>
        )
    }
}

export default Fact;