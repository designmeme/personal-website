import * as React from "react"
import {GatsbySSR} from "gatsby"
import {googleAdsenseScripts} from "./src/components/google-adsense-scripts";
import {gtmNoscript, gtmScript} from "./src/components/gtm-setup";


export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setPreBodyComponents }) => {
    setHeadComponents([gtmScript, ...googleAdsenseScripts])
    setPreBodyComponents([gtmNoscript])
}
