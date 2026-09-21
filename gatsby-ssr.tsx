import * as React from "react"
import {GatsbySSR} from "gatsby"
// import {googleAdsenseScripts} from "./src/components/google-adsense-scripts";
import {gtmNoscript} from "./src/components/gtm-setup";

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
    ])

    if (process.env.NODE_ENV === "production") {
        setPreBodyComponents([gtmNoscript])
    }
}
