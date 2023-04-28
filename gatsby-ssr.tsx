import * as React from "react"
import {GatsbySSR} from "gatsby"
import {googleAdsenseScripts} from "./src/components/google-adsense-scripts";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
    setHeadComponents(googleAdsenseScripts)
}
