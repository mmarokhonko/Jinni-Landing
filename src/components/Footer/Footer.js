import React from "react";
import {string} from "prop-types";

const Footer = ({offer}) => {
    return (
        <footer className="footer">
            <section className="footer_affiliates">
                <div className="cont-zone">
                    <div className="footer_affiliates_sub-wrap">
                        <div>
                            <img src="./assets/logo/logo_18+.png" alt="18+" />
                        </div>
                        <div>
                            <img src="./assets/logo/logo_problem.png" alt="Gamcare: Problem Gaming Support" />
                        </div>
                        <div>
                            <img src="./assets/logo/logo_Isle-of-Man.png" alt="Isle of Man" />
                        </div>
                        <div className="hide-big">
                            <img src="./assets/logo/logo_secure-mob.svg" alt="Secure SSL encryption" />
                        </div>
                        <div target="_blank">
                            <img src="./assets/logo/logo_IBAS.png" alt="I.B.A.S." />
                        </div>
                        <div className="hide-sm">
                            <img src="./assets/logo/logo_secure.png" alt="Secure SSL encryption" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="footer_copyright">
                <div className="cont-zone">
                    <a className="footer_terms-link" href={!offer.includes("freeticket") ? "https://jinnilotto.com/four-for-one" :"https://jinnilotto.com/1-ticket-free"} target="_blank"><h6>Terms & Conditions</h6></a>
                    <p>Jinni Lotto is operated by Jinni Tech Limited, a company registered in the Isle of Man with 
					registered number 014940V and registered address <br className="hide-sm" /> at P.O Box 227 Clinch's House Lord Street Douglas Isle of Man IM99 1RZ.</p>
                    <p>Jinni Tech Ltd is licensed and regulated by the Isle of Man Gambling Supervision Commission 
					under a licence issued under the Online Gambling Regulation Act 2001
                    <br className="hide-sm" /> on [date and year]. jinnilotto.com domain and copyrights are owned by Jinni Tech Limited.
                    </p>
                    <p>Please note, this license is not applicable to players residing in the UK. Jinni Tech Ltd does not operate a lottery. Members place bets on the outcome of national lotteries. 
					Official lottery tickets and insurance are purchased based on the bets placed so that all winnings are equal to the cash option of national lottery winnings.</p>
                    <p>
					Copyright © 2017, Jinni Tech Ltd. All rights reserved. 
					The National Lottery and Lotto are trademarks of the National Lottery Commission. 
					EuroMillions is the trademark of Services aux Loteries en Europe. 
					Jinni Tech Limited is not connected to or affiliated with any body or organisation related to the National Lottery or any other lottery.
                    </p>
                </div>
            </section>
        </footer>
    )
}

Footer.propTypes = {
    offer: string
}

export default Footer