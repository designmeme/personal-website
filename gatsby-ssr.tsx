import * as React from "react"
import {GatsbySSR} from "gatsby"
import {googleAdsenseScripts} from "./src/components/google-adsense-scripts";
import {oneLine} from "common-tags"


export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setPreBodyComponents }) => {
    // Google Tag Manager
    const gtm = <script
        key="gtm-js"
        dangerouslySetInnerHTML={{__html: oneLine`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.GTM}');
    `}}/>

    // Google Tag Manager - noscript
    const gtmNoscript = <noscript
        key="gtm-noscript"
        dangerouslySetInnerHTML={{__html: oneLine`
            <iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `}}/>

    setHeadComponents([gtm, ...googleAdsenseScripts])
    setPreBodyComponents([gtmNoscript])
}
