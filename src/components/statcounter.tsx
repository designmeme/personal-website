import React from 'react';
import {Script} from "gatsby";

const Statcounter = () => {
    const statcounter = {
        project: `11398249`,
        security: `3b7ccf52`,
    }
    return (
        <>
            {/*note: const 사용시 에러*/}
            <Script>{`
                var sc_project = ${statcounter.project};
                var sc_invisible = 1;
                var sc_security = "${statcounter.security}";
            `}</Script>
            <Script src="https://www.statcounter.com/counter/counter.js"></Script>
            <noscript>
                <div className="statcounter">
                    <a title="Web Analytics" href="https://statcounter.com/" target="_blank">
                        <img
                            className="statcounter"
                            src={`https://c.statcounter.com/${statcounter.project}/0/${statcounter.security}/1/`}
                            alt="Web Analytics"
                            referrerPolicy="no-referrer-when-downgrade"/>
                    </a>
                </div>
            </noscript>
        </>
    );
};

export default Statcounter;
