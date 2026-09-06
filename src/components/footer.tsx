import React from 'react';
import {useSiteMetadata} from "../hooks/use-site-metadata";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faCircle, faEnvelope, faRss} from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./theme-toggle";
import Symbol from "./symbol";


const Footer: React.FC = () => {
    const {email, github_username, copyright} = useSiteMetadata()

    return (
        <footer className="print:hidden border-t-10 border-brand font-light">

            <div className="py-10 lg:pb-40 md:px-20 flex flex-col lg:flex-row items-center gap-6 lg:gap-6 lg:justify-between text-secondary">

                <Symbol className="text-base"/>

                <div className="flex flex-row gap-2 text-3xl">
                    <a href="/rss.xml"
                       className="leading-none text-inherit align-middle"
                       title="RSS 피드로 웹사이트 구독하기 📮"
                    >
                        <FontAwesomeIcon icon={faRss} transform={'shrink-6 right-0.7 up-0.5'} mask={faCircle}/>
                        <span className="sr-only">RSS 피드로 웹사이트 구독하기 📮</span>
                    </a>

                    <a href={"https://github.com/" + github_username}
                       className="leading-none text-inherit align-middle"
                       title="GitHub 방문하기(새창)"
                       target="_blank"
                    >
                        <FontAwesomeIcon icon={faGithub}/>
                        <span className="sr-only">GitHub 방문하기</span>
                    </a>

                    <a href={"mailto:" + email}
                       className="leading-none text-inherit align-middle"
                       title="이메일 보내기(새창)"
                       target="_blank"
                    >
                        <FontAwesomeIcon icon={faEnvelope} transform={'shrink-6'} mask={faCircle}/>
                        <span className="sr-only">이메일 보내기</span>
                    </a>
                </div>

                <div className="text-xs lg:flex-1">{copyright}</div>

                <ThemeToggle />

            </div>

        </footer>

    )
};

export default Footer;
