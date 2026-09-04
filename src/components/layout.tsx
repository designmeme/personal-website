import * as React from 'react'
import Header from './header'
import Footer from './footer'

import moment from 'moment'
import 'moment/locale/ko'

moment.locale('ko')

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {

    return (
        <>
            <Header/>
            <main className="mt-10 mb-30 px-8">
                {children}
            </main>
            <Footer/>
        </>
    )
}


export default Layout
