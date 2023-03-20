import React from 'react';
import {useSiteMetadata} from "../hooks/use-site-metadata";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../images/common/logo-footer.svg";


const Footer: React.FC = () => {
    const {title, email, github_username, copyright} = useSiteMetadata()

    return (
        <footer className="site-footer">

            <div className="wrapper">

                <div className="footer-title">
                    <img src={logoImage} alt={title} className="logo"/>
                </div>

                <div className="site-contact">
                    <a href={"https://github.com/" + github_username}
                       className="contact-link"
                       aria-label="Visit github"
                       target="_blank"
                    ><FontAwesomeIcon icon={faGithub} /><span className="sr-only">Visit github</span></a>

                    <a href={"mailto:" + email}
                       className="contact-link circle"
                       aria-label="Send email"
                       target="_blank"
                    ><FontAwesomeIcon icon={faEnvelope} /><span className="sr-only">Send email</span></a>
                </div>

                <div className="site-copyright">{copyright}</div>

            </div>

        </footer>

    )
};

export default Footer;
