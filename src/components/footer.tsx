import React from 'react';
import {useSiteMetadata} from "../hooks/use-site-metadata";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faSquareRss} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../images/common/logo-footer.svg";
import {Link} from "gatsby";


const Footer: React.FC = () => {
    const {title, email, github_username, copyright} = useSiteMetadata()

    return (
        <footer className="site-footer">

            <div className="wrapper">

                <div className="footer-title">
                    <img src={logoImage} alt={title || ''} className="logo"/>
                </div>

                <div className="site-contact">
                    <Link to={`/rss.xml`}
                          className="contact-link"
                          title="RSS 피드로 웹사이트 구독하기 📮"
                    ><FontAwesomeIcon icon={faSquareRss}/><span className="sr-only">RSS 피드로 웹사이트 구독하기 📮</span></Link>

                    <a href={"https://github.com/" + github_username}
                       className="contact-link"
                       title="GitHub 방문하기(새창)"
                       target="_blank"
                    ><FontAwesomeIcon icon={faGithub}/><span className="sr-only">GitHub 방문하기</span></a>

                    <a href={"mailto:" + email}
                       className="contact-link circle"
                       title="이메일 보내기(새창)"
                       target="_blank"
                    ><FontAwesomeIcon icon={faEnvelope}/><span className="sr-only">이메일 보내기</span></a>
                </div>

                <div className="site-copyright">{copyright}</div>

            </div>

        </footer>

    )
};

export default Footer;
