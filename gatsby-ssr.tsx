import * as React from "react"
import {GatsbySSR} from "gatsby"
// import {googleAdsenseScripts} from "./src/components/google-adsense-scripts";
import {gtmNoscript, gtmScript} from "./src/components/gtm-setup";

const themeInitializationScript = `
(() => {
    const key = 'personal-site-theme';
    let preference = 'system';
    try {
        const stored = window.localStorage.getItem(key);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            preference = stored;
        }
    } catch (_) {}

    if (preference !== 'system') {
        document.documentElement.dataset.theme = preference;
    }
})();
`

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setPreBodyComponents }) => {
    setHeadComponents([
        <script
            key="theme-initialization"
            dangerouslySetInnerHTML={{__html: themeInitializationScript}}
        />,
        <link
            href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
            key="spoqa-han-sans"
            rel="stylesheet"
        />,
        gtmScript,
    ])
    // setHeadComponents([gtmScript, ...googleAdsenseScripts])
    setPreBodyComponents([gtmNoscript])
}
