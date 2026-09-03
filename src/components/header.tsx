import React from 'react';
import {Link} from "gatsby";
import {useSiteMetadata} from "../hooks/use-site-metadata";
import logoImage from '../images/common/logo.svg'
import ThemeToggle from './theme-toggle'


const Header: React.FC = () => {
    const {title} = useSiteMetadata()
    const navs = [
        {text: "About", path: "/about" },
        {text: "Blog", path: "/blog", partiallyActive: true },
    ]

    return (
        <header>

            <div className="py-20 mx-[12.5%] md:mx-20 flex md:items-top gap-2">
                <Link
                    to="/about"
                    className="min-w-[80px] max-w-[240px] w-[30%] mr-6 md:mr-16 lg:mr-20"
                >
                    <img src={logoImage} alt={title || ''} className="logo"/>
                </Link>

                <nav className="flex flex-col gap-1 flex-1">
                    {navs.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="text-inherit hover:text-brand"
                            activeClassName="text-brand! font-medium"
                            partiallyActive={item.partiallyActive}
                        >{item.text}</Link>
                    ))}
                </nav>

                <div className="fixed top-10 right-10 z-50">
                    <ThemeToggle />
                </div>

            </div>

        </header>
    )
};

export default Header;
