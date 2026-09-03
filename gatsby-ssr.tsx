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

    const systemIsDark = typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = preference === 'system' ? (systemIsDark ? 'dark' : 'light') : preference;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
})();
`

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setPreBodyComponents, setHtmlAttributes }) => {
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
    ])

    if (process.env.NODE_ENV === "production") {
        setHeadComponents([gtmScript])
        setPreBodyComponents([gtmNoscript])
    }
}
