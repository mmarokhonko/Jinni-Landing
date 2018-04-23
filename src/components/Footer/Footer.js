import React from "react";
import {string} from "prop-types";
import {translate} from "react-i18next";

const Footer = ({offer, t}) => {
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
                    <a className="footer_terms-link" href={!offer.includes("freeticket") ? "https://jinnilotto.com/four-for-one" :"https://jinnilotto.com/1-ticket-free"} target="_blank"><h6>{t("title")}</h6></a>
                    <div dangerouslySetInnerHTML={{__html:t("textHtml", {returnObjects: true}).join("")}}></div>
                </div>
            </section>
        </footer>
    )
}

Footer.propTypes = {
    offer: string
}

export default translate("footerText")(Footer);