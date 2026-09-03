import React from 'react';
import {useSiteMetadata} from "../hooks/use-site-metadata";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faCircle, faEnvelope, faRss} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../images/common/logo-footer.svg";
import {Link} from "gatsby";


const Footer: React.FC = () => {
    const {title, email, github_username, copyright} = useSiteMetadata()

    return (
        <footer className="bg-[var(--color-brand)] text-zinc-200 font-light">

            <div className="py-20 px-[12.5%] md:px-20 flex flex-col lg:flex-row items-center ali gap-4 lg:gap-8 lg:justify-between">

                <div className="text-center leading-0 hidden md:block lg:order-1">
                    <img src={logoImage} alt={title || ''} className="logo"/>
                </div>

                <div className="flex flex-row order-2 gap-2">
                    <a href="/rss.xml"
                       className="text-3xl leading-none text-inherit align-middle"
                       title="RSS 피드로 웹사이트 구독하기 📮"
                    >
                        <FontAwesomeIcon icon={faRss} transform={'shrink-6 right-0.7 up-0.5'} mask={faCircle}/>
                        <span className="sr-only">RSS 피드로 웹사이트 구독하기 📮</span>
                    </a>

                    <a href={"https://github.com/" + github_username}
                       className="text-3xl leading-none text-inherit align-middle"
                       title="GitHub 방문하기(새창)"
                       target="_blank"
                    >
                        <FontAwesomeIcon icon={faGithub}/>
                        <span className="sr-only">GitHub 방문하기</span>
                    </a>

                    <a href={"mailto:" + email}
                       className="text-3xl leading-none text-inherit align-middle"
                       title="이메일 보내기(새창)"
                       target="_blank"
                    >
                        <FontAwesomeIcon icon={faEnvelope} transform={'shrink-6'} mask={faCircle}/>
                        <span className="sr-only">이메일 보내기</span>
                    </a>
                </div>

                <div className="text-inherit text-xs">{copyright}</div>

            </div>

        </footer>

    )
};

export default Footer;
