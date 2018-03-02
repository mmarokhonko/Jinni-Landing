import React, {Component} from "react";

class NumberPicker extends Component {
    state = {
        maxNumber: 70,
        maxBonus: 25,
        pickedNums: [],
        pickedBonus: null,
        quickPickDelay: 150
    }

    toogleNum = num => {
        let pickedNums = this.state.pickedNums;
        if(pickedNums.indexOf(num) !== -1) {
            pickedNums = pickedNums.filter(item => item !== num);
            this.setState({
                pickedNums
            })
            return;
        }

        if(pickedNums.length === 5) {
            return;
        }

        pickedNums.push(num);
        this.setState({
            pickedNums
        })
    }

    toogleBonus = bonus => {
        let pickedBonus = this.state.pickedBonus;
        if(pickedBonus === bonus) {
            pickedBonus = null;
            this.setState({
                pickedBonus
            })
            return;
        }

        pickedBonus = bonus;
        this.setState({
            pickedBonus
        })
    }

    clearNums = () => {
        this.setState({
            pickedNums: [],
            pickedBonus: null
        })
    }

    genRandomNumber = () => {
        let {maxNumber, pickedNums, quickPickDelay} = this.state;

        if(pickedNums.length !== 5) {
            let ranNumber = Math.floor(Math.random() * maxNumber) + 1;
            if(pickedNums.indexOf(ranNumber) !== -1) {
                return this.genRandomNumber();
            }
            else {
                pickedNums.push(ranNumber)
                this.setState({
                    pickedNums
                }, () => {
                    setTimeout(() => {
                        this.state.pickedNums.length === 5 ? this.genRandomBonus() : this.genRandomNumber();
                    }, quickPickDelay);
                })
            }
        }
    }

    genRandomBonus = () => {
        let {maxBonus, pickedBonus} = this.state;
        if(!pickedBonus) {
            let ranBonus = Math.floor(Math.random() * maxBonus) + 1;
            if(pickedBonus === ranBonus) {
                return this.genRandomBonus();
            }
            else {
                pickedBonus = ranBonus;
                this.setState({
                    pickedBonus
                })
            }
        }
    }
    
    quickPick = () => {
        this.setState({
            pickedNums: [],
            pickedBonus: null
        }, () => {
            this.genRandomNumber();
        })
    }

    generateNumbers = maxNumber => {
        let nums = [];
        const pickedNums = this.state.pickedNums;
        for (let num = 1; num <= maxNumber; num++) {
            const picked = pickedNums.indexOf(num) !== -1;            
            const numHtml = <div key={num} className={`picker_nums_num ${picked ? "-picked" : ""}`} onClick={() => this.toogleNum(num)}>{num}</div>
            nums.push(numHtml)
        }
        return nums;
    }

    generateBonusNums = maxBonus => {
        let bonuses = [];
        const pickedBonus = this.state.pickedBonus;
        for (let bonus = 1; bonus <= maxBonus; bonus++) {
            const picked = pickedBonus === bonus; 
            const numHtml = <div key={bonus} className={`picker_bonus_num ${picked ? "-picked" : ""}`} onClick={() => this.toogleBonus(bonus)}>{bonus}</div>
            bonuses.push(numHtml)
        }
        return bonuses;
    }

    render(){
        const {maxNumber, maxBonus} = this.state;

        return(
            <div className="frame picker_frame-vert">
                <h4 className="frame_title">Pick 5 numbers <br/>& 1 bonus number</h4>
                <div className="picker">
                    <div className="picker_head">
                        <button className="btn-green picker_quick-btn" onClick={this.quickPick}>Quick Pick</button>
                        <button className="picker_clear-btn" onClick={this.clearNums}/>
                    </div>
                    <div className="picker_nums">
                        <h5 className="picker_nums_title">Select 5 numbers</h5>
                        <div className="picker_nums_subwrap">
                            {this.generateNumbers(maxNumber)}
                        </div>
                    </div>
                    <div className="picker_bonus">
                        <h5 className="picker_nums_title">Select 1 number</h5>
                        <div className="picker_bonus_subwrap">
                            {this.generateBonusNums(maxBonus)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NumberPicker;