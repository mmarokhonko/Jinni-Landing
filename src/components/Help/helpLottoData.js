import React from "react";

const lottoData = {
    /* eslint-disable react/display-name */
    /* eslint-disable react/no-unescaped-entities*/
    "mega millions": {
        firstStep: pickerData => (
            <p className="help_step_text">
              Select {pickerData.numbersAmount} numbers from 1-{pickerData.maxNumber} <br className="hide-big" />
              + {pickerData.bonusAmount} {pickerData.bonusName}{pickerData.bonusAmount > 1 ? "s" : ""} from 
			  1-{pickerData.maxBonus}. <br className="hide-big" />
              Or we can randomly choose
			  for you when you click <br className="hide-big" /> “Quick Pick”
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text">
        Mega Millions draws are held twice a week. To find out if you’re a winner, check the results
        after the next draw in <span className="help_timer">{timeRemains}</span>.
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text">
        Wait for the upcoming draw that <br />
        will take place in: <br />
                <span className="help_timer">{timeRemains}</span> <br />
        to see how much you won.
            </p>
        )
    },
    euromillions: {
        firstStep: pickerData => (
            <p className="help_step_text">
              Select {pickerData.numbersAmount} numbers
			  + {pickerData.bonusAmount} {pickerData.bonusName}{pickerData.bonusAmount > 1 ? "s" : ""} or simply <br className="hide-sm" /> 
              click "Quick Pick" for a random selection
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text">
        There are two EuroMillions draws every week. Be sure to check the results Follow the results
        of the next Euromillions draw on <span className="help_timer">{timeRemains}</span> to find out if you’re a winner.
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text">
        There are two EuroMillions draws every week. Be sure to check the results Follow the results
        of the next Euromillions draw on <span className="help_timer">{timeRemains}</span> to find out if you’re a winner. 
            </p>
        )
    },
    eurojackpot: {
        firstStep: pickerData => (
            <p className="help_step_text">
			  Choose {pickerData.numbersAmount} numbers between 1 
			  and {pickerData.maxNumber} and {pickerData.bonusAmount} {pickerData.bonusName}{pickerData.bonusAmount > 1 ? "s" : ""} between 
			  1 and {pickerData.bonusAmount} or simply
			  click "Quick Pick" for a random selection
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text">
        Follow the results of the next EuroJackpot <br/>
        draw on <span className="help_timer">{timeRemains}</span> to find out if you’re <br/> 
		a winner.
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text">
        Follow the results of the next <br/>
        EuroJackpot draw on<br/> 
                <span className="help_timer">{timeRemains}</span><br/>
		 to find out if you’re a winner. 
            </p>
        )
    },
    powerball: {
        firstStep: pickerData => (
            <p className="help_step_text">
			  Choose {pickerData.numbersAmount} numbers between 1 
			  and {pickerData.maxNumber} and a Bonus or click
			  "Quick Pick" for a random selection
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text">
        	Wait for the next Powerball on <br/>
                <span className="help_timer">{timeRemains}</span> to see if you’re a winner.
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text">
        Wait for the upcoming draw that
		will take place in <br/> <span className="help_timer">{timeRemains}</span><br/>    
		 to see how much you won. 
            </p>
        )
    },
    ["6 aus 49"]: {
        firstStep: pickerData => (
            <p className="help_step_text">
			  Select {pickerData.numbersAmount} lucky numbers +
			  a {pickerData.bonusName} or 
			  click "Quick Pick" for a random selection
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text">
        	Don't miss the next of two weekly draws on <br/>
                <span className="help_timer">{timeRemains}</span> to see if you’re a winner.
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text">
        Wait for the upcoming draw that
		will take place in <br/> <span className="help_timer">{timeRemains}</span><br/>    
		 to see how much you won. 
            </p>
        )
    }
};

export default lottoData;
