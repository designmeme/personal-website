import * as React from 'react'
import Header from './header'
import Footer from './footer'
import Statcounter from "./statcounter";

import moment from 'moment'
import 'moment/locale/ko'
moment.locale('ko')

interface layoutProps {
    children: React.ReactNode
}

const Layout: React.FC<layoutProps> = ({children}) => {

    return (
        <>
            <Header/>
            <main className="site-main" aria-label="Content">
                <div className="wrapper">
                    <div className="inner-wrapper">
                        {children}
                    </div>
                </div>
            </main>
            <Footer/>

            {process.env.NODE_ENV === 'production' && <Statcounter/>}
        </>
    )
}


export default Layout
