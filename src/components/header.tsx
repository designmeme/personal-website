import React from 'react';
import {Link} from "gatsby";
import {useSiteMetadata} from "../hooks/use-site-metadata";
import logoImage from '../images/common/logo.svg'
import {gaEvent} from "../hooks/analytics";


const Header: React.FC = () => {
    const {title} = useSiteMetadata()

    return (
        <header className="site-header">

            <div className="wrapper">
                <Link
                    to="/"
                    className="site-title"
                    onClick={() => gaEvent('navigation', 'click_home', 'site_header')}
                >
                    <img src={logoImage} alt={title || ''} className="logo"/>
                </Link>

                <nav className="site-nav">
                    <div className="trigger">
                        <Link
                            to="/about"
                            className="page-link"
                            activeClassName="active"
                            onClick={() => gaEvent('navigation', 'click_about', 'site_header')}
                        >About</Link>
                        <Link
                            to="/blog"
                            className="page-link"
                            activeClassName="active"
                            partiallyActive={true}
                            onClick={() => gaEvent('navigation', 'click_blog', 'site_header')}
                        >Blog</Link>
                    </div>
                </nav>

            </div>

        </header>
    )
};

export default Header;
