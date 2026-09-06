import React, {useEffect, useState} from 'react';
import {Link} from "gatsby";
import Symbol from "./symbol";


const Header: React.FC = () => {
    const [isCompact, setIsCompact] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsCompact(window.scrollY > 0)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navs = [
        {text: "About", path: "/about" },
        {text: "Blog", path: "/blog", partiallyActive: true },
    ]

    return (
        <header className={`print:hidden sticky top-0 z-40 bg-stone-100/60 dark:bg-stone-900/60 backdrop-blur-sm ${isCompact ? 'border-b' : ''} border-brand`}>

            <div className={`${isCompact ? 'py-2' : 'py-10'} transition-[padding] duration-200 ease-in-out motion-reduce:transition-none md:mx-20 flex items-center justify-center gap-2`}>
                <Link
                    to="/about"
                    className="shrink-0 mr-6 md:mr-16 lg:mr-20"
                >
                    <Symbol className={`text-2xl lg:text-3xl origin-right transition-transform duration-200 ease-in-out motion-reduce:transition-none ${isCompact ? 'scale-75 lg:scale-60' : 'scale-100'}`}/>
                </Link>

                <nav className={`mb-[-1px] flex gap-4 origin-left transition-transform duration-200 ease-in-out motion-reduce:transition-none ${isCompact ? 'scale-[0.875]' : 'scale-100'}`}>
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

            </div>

        </header>
    )
};

export default Header;
