import React from 'react';
import {Link} from "gatsby";
import {useSiteMetadata} from "../hooks/use-site-metadata";
import logoImage from '../images/common/logo.svg'


const Header: React.FC = () => {
    const {title} = useSiteMetadata()

    return (
        <header className="site-header">

            <div className="wrapper">
                <Link to="/" className="site-title">
                    <img src={logoImage} alt={title} className="logo"/>
                </Link>

                <nav className="site-nav">
                    <div className="trigger">
                        <Link to="/about" className="page-link" activeClassName="active">About</Link>
                        <Link to="/blog" className="page-link" activeClassName="active" partiallyActive={true}>Blog</Link>
                    </div>
                </nav>

            </div>

        </header>
    )
};

export default Header;
