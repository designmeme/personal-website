import React from "react"
import {useSiteMetadata} from "../hooks/use-site-metadata"
import {Script} from "gatsby";
import type {WithContext} from 'schema-dts';

type Props = {
    title?: string | null
    useSiteTitle?: boolean | null
    description?: string | null
    image?: string | null
    pathname?: string | null
    noindex?: boolean
    schema?: WithContext<any> | Array<WithContext<any>>
    children?: React.ReactNode
}

const SeoHead: React.FC<Props> = (
    {
        title,
        useSiteTitle = true,
        description,
        image,
        pathname,
        noindex = false,
        schema = [],
        children,
    }) => {
    const {
        title: siteTitle,
        description: siteDescription,
        image: siteImage,
        siteUrl,
        author,
        lang,
        locale,
        twitter,
        facebook,
        webmaster_verifications,
        googleAdsense,
    } = useSiteMetadata()

    const seo = {
        title: (title == siteTitle || !useSiteTitle) ? title! : `${title} | ${siteTitle}`,
        description: description || siteDescription,
        image: siteUrl! + (image || siteImage),
        url: siteUrl + (pathname || ''),
    }

    if (!Array.isArray(schema)) {
        schema = [schema]
    }
    // 이미지 url 이 상대경로인 경우 사이트 URL을 앞에 붙여준다.
    schema = schema.map((s: WithContext<any>) => {
        if (s?.image) {
            s.image = s.image.map((img: string) => img?.startsWith('http') ? img : siteUrl + img)
        }
        return s;
    })

    const articleSchema = schema.find((s: WithContext<any>) => s["@type"] === "BlogPosting")

    return (
        <>
            <html lang={lang || undefined}/>

            {/*검색엔진에서 페이지를 수집하지 않도록 설정: https://developers.google.com/search/docs/advanced/robots/robots_meta_tag?hl=ko#robotsmeta*/}
            {noindex && <meta name="robots" content="noindex, nofollow"/>}

            <title>{seo.title}</title>
            <meta property="og:title" content={seo.title}/>
            <meta name="twitter:title" content={seo.title}/>

            <meta property="og:site_name" content={siteTitle!}/>

            {!articleSchema ? (
                <meta property="og:type" content="website"/>
            ) : (
                <>
                    <meta property="og:type" content="article"/>
                    <meta property="article:published_time" content={articleSchema.datePublished}/>
                    <meta property="article:modified_time" content={articleSchema.dateModified}/>
                    {articleSchema.author && articleSchema.author.length && <meta property="article:author" content={articleSchema.author[0].name}/>}
                </>
            )}

            {seo.description && (
                <>
                    <meta name="description" content={seo.description} />
                    <meta property="og:description" content={seo.description} />
                    <meta name="twitter:description" content={seo.description} />
                </>
            )}
            {seo.image ? (
                <>
                    <meta name="image" content={seo.image} />
                    <meta property="og:image" content={seo.image} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content={seo.image} />
                </>
            ) : (
                <meta name="twitter:card" content="summary" />
            )}
            {author && (
                <meta name="author" content={author} />
            )}
            {locale && (
                <meta property="og:locale" content={locale} />
            )}
            {seo.url && (
                <>
                    <link rel="canonical" href={seo.url} />
                    <meta property="og:url" content={seo.url} />
                    <meta name="twitter:url" content={seo.url} />
                </>
            )}
            {twitter?.username && (
                <meta name="twitter:creator" content={twitter?.username} />
            )}
            {facebook?.app_id && (
                <meta property="fb:app_id" content={facebook.app_id} />
            )}

            {webmaster_verifications?.google && (
                <meta name="google-site-verification" content={webmaster_verifications.google} />
            )}

            {/*https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/#rich-snippets */}
            {/*https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=ko*/}
            {schema.length && <Script type="application/ld+json" key={`ld-json`}>{JSON.stringify(schema)}</Script>}

            {/*구글 애드센스에서 지정한 URL이 아니면 사용할 수 없기 때문에 운영 환경에서만 포함한다. */}
            {(process.env.NODE_ENV === 'production' && googleAdsense) && (
                <>
                    <Script
                        key={`google-adsense`}
                        data-ad-client={`${googleAdsense}`}
                        src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"}
                        async
                    />
                    {/*광고 차단 회복용-사이트에 광고 차단 태그를 배포하여 광고 차단 회복 메시지를 사용*/}
                    <Script
                        key={`google-adsense-allow-ads`}
                        src="https://fundingchoicesmessages.google.com/i/pub-3088246349891349?ers=1"
                        nonce="Q7HdKeR1a3ZW-wWmFpiNzg"
                        async
                    />
                    <Script
                        key={`google-adsense-allow-ads2`}
                        nonce="Q7HdKeR1a3ZW-wWmFpiNzg">{`
                        (function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();
                    `}</Script>

                    {/*광고 차단 회복 > 오류 방지 메세지*/}
                    <Script
                        key={`google-adsense-allow-ads3`}>{`(function(){
                        /*
                         Copyright The Closure Library Authors.
                         SPDX-License-Identifier: Apache-2.0
                        */
                        'use strict';var aa=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}},ba="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},k;if("function"==typeof Object.setPrototypeOf)k=Object.setPrototypeOf;else{var m;a:{var ca={a:!0},n={};try{n.__proto__=ca;m=n.a;break a}catch(a){}m=!1}k=m?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}
                        var p=k,q=function(a,b){a.prototype=ba(b.prototype);a.prototype.constructor=a;if(p)p(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.v=b.prototype},r=this||self,da=function(){},t=function(a){return a};var u;var w=function(a,b){this.g=b===v?a:""};w.prototype.toString=function(){return this.g+""};var v={},x=function(a){if(void 0===u){var b=null;var c=r.trustedTypes;if(c&&c.createPolicy){try{b=c.createPolicy("goog#html",{createHTML:t,createScript:t,createScriptURL:t})}catch(d){r.console&&r.console.error(d.message)}u=b}else u=b}a=(b=u)?b.createScriptURL(a):a;return new w(a,v)};var A=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)};var B={},C=null;var D="function"===typeof Uint8Array;function E(a,b,c){return"object"===typeof a?D&&!Array.isArray(a)&&a instanceof Uint8Array?c(a):F(a,b,c):b(a)}function F(a,b,c){if(Array.isArray(a)){for(var d=Array(a.length),e=0;e<a.length;e++){var f=a[e];null!=f&&(d[e]=E(f,b,c))}Array.isArray(a)&&a.s&&G(d);return d}d={};for(e in a)Object.prototype.hasOwnProperty.call(a,e)&&(f=a[e],null!=f&&(d[e]=E(f,b,c)));return d}
                        function ea(a){return F(a,function(b){return"number"===typeof b?isFinite(b)?b:String(b):b},function(b){var c;void 0===c&&(c=0);if(!C){C={};for(var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var h=d.concat(e[f].split(""));B[f]=h;for(var g=0;g<h.length;g++){var l=h[g];void 0===C[l]&&(C[l]=g)}}}c=B[c];d=Array(Math.floor(b.length/3));e=c[64]||"";for(f=h=0;h<b.length-2;h+=3){var y=b[h],z=b[h+1];l=b[h+2];g=c[y>>2];y=c[(y&3)<<
                        4|z>>4];z=c[(z&15)<<2|l>>6];l=c[l&63];d[f++]=""+g+y+z+l}g=0;l=e;switch(b.length-h){case 2:g=b[h+1],l=c[(g&15)<<2]||e;case 1:b=b[h],d[f]=""+c[b>>2]+c[(b&3)<<4|g>>4]+l+e}return d.join("")})}var fa={s:{value:!0,configurable:!0}},G=function(a){Array.isArray(a)&&!Object.isFrozen(a)&&Object.defineProperties(a,fa);return a};var H;var J=function(a,b,c){var d=H;H=null;a||(a=d);d=this.constructor.u;a||(a=d?[d]:[]);this.j=d?0:-1;this.h=null;this.g=a;a:{d=this.g.length;a=d-1;if(d&&(d=this.g[a],!(null===d||"object"!=typeof d||Array.isArray(d)||D&&d instanceof Uint8Array))){this.l=a-this.j;this.i=d;break a}void 0!==b&&-1<b?(this.l=Math.max(b,a+1-this.j),this.i=null):this.l=Number.MAX_VALUE}if(c)for(b=0;b<c.length;b++)a=c[b],a<this.l?(a+=this.j,(d=this.g[a])?G(d):this.g[a]=I):(d=this.l+this.j,this.g[d]||(this.i=this.g[d]={}),(d=this.i[a])?
                        G(d):this.i[a]=I)},I=Object.freeze(G([])),K=function(a,b){if(-1===b)return null;if(b<a.l){b+=a.j;var c=a.g[b];return c!==I?c:a.g[b]=G([])}if(a.i)return c=a.i[b],c!==I?c:a.i[b]=G([])},M=function(a,b){var c=L;if(-1===b)return null;a.h||(a.h={});if(!a.h[b]){var d=K(a,b);d&&(a.h[b]=new c(d))}return a.h[b]};J.prototype.toJSON=function(){var a=N(this,!1);return ea(a)};
                        var N=function(a,b){if(a.h)for(var c in a.h)if(Object.prototype.hasOwnProperty.call(a.h,c)){var d=a.h[c];if(Array.isArray(d))for(var e=0;e<d.length;e++)d[e]&&N(d[e],b);else d&&N(d,b)}return a.g},O=function(a,b){H=b=b?JSON.parse(b):null;a=new a(b);H=null;return a};J.prototype.toString=function(){return N(this,!1).toString()};var P=function(a){J.call(this,a)};q(P,J);function ha(a){var b,c=(a.ownerDocument&&a.ownerDocument.defaultView||window).document,d=null===(b=c.querySelector)||void 0===b?void 0:b.call(c,"script[nonce]");(b=d?d.nonce||d.getAttribute("nonce")||"":"")&&a.setAttribute("nonce",b)};var Q=function(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)},R=function(a){this.g=a||r.document||document};R.prototype.appendChild=function(a,b){a.appendChild(b)};var S=function(a,b,c,d,e,f){try{var h=a.g,g=Q(a.g,"SCRIPT");g.async=!0;g.src=b instanceof w&&b.constructor===w?b.g:"type_error:TrustedResourceUrl";ha(g);h.head.appendChild(g);g.addEventListener("load",function(){e();d&&h.head.removeChild(g)});g.addEventListener("error",function(){0<c?S(a,b,c-1,d,e,f):(d&&h.head.removeChild(g),f())})}catch(l){f()}};var ia=r.atob("aHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vaW1hZ2VzL2ljb25zL21hdGVyaWFsL3N5c3RlbS8xeC93YXJuaW5nX2FtYmVyXzI0ZHAucG5n"),ja=r.atob("WW91IGFyZSBzZWVpbmcgdGhpcyBtZXNzYWdlIGJlY2F1c2UgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlIGlzIGludGVyZmVyaW5nIHdpdGggdGhpcyBwYWdlLg=="),ka=r.atob("RGlzYWJsZSBhbnkgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlLCB0aGVuIHJlbG9hZCB0aGlzIHBhZ2Uu"),la=function(a,b,c){this.h=a;this.j=new R(this.h);this.g=null;this.i=[];this.l=!1;this.o=b;this.m=c},V=function(a){if(a.h.body&&!a.l){var b=
                        function(){T(a);r.setTimeout(function(){return U(a,3)},50)};S(a.j,a.o,2,!0,function(){r[a.m]||b()},b);a.l=!0}},T=function(a){for(var b=W(1,5),c=0;c<b;c++){var d=X(a);a.h.body.appendChild(d);a.i.push(d)}b=X(a);b.style.bottom="0";b.style.left="0";b.style.position="fixed";b.style.width=W(100,110).toString()+"%";b.style.zIndex=W(2147483544,2147483644).toString();b.style["background-color"]=ma(249,259,242,252,219,229);b.style["box-shadow"]="0 0 12px #888";b.style.color=ma(0,10,0,10,0,10);b.style.display=
                        "flex";b.style["justify-content"]="center";b.style["font-family"]="Roboto, Arial";c=X(a);c.style.width=W(80,85).toString()+"%";c.style.maxWidth=W(750,775).toString()+"px";c.style.margin="24px";c.style.display="flex";c.style["align-items"]="flex-start";c.style["justify-content"]="center";d=Q(a.j.g,"IMG");d.className=A();d.src=ia;d.style.height="24px";d.style.width="24px";d.style["padding-right"]="16px";var e=X(a),f=X(a);f.style["font-weight"]="bold";f.textContent=ja;var h=X(a);h.textContent=ka;Y(a,
                        e,f);Y(a,e,h);Y(a,c,d);Y(a,c,e);Y(a,b,c);a.g=b;a.h.body.appendChild(a.g);b=W(1,5);for(c=0;c<b;c++)d=X(a),a.h.body.appendChild(d),a.i.push(d)},Y=function(a,b,c){for(var d=W(1,5),e=0;e<d;e++){var f=X(a);b.appendChild(f)}b.appendChild(c);c=W(1,5);for(d=0;d<c;d++)e=X(a),b.appendChild(e)},W=function(a,b){return Math.floor(a+Math.random()*(b-a))},ma=function(a,b,c,d,e,f){return"rgb("+W(Math.max(a,0),Math.min(b,255)).toString()+","+W(Math.max(c,0),Math.min(d,255)).toString()+","+W(Math.max(e,0),Math.min(f,
                        255)).toString()+")"},X=function(a){a=Q(a.j.g,"DIV");a.className=A();return a},U=function(a,b){0>=b||null!=a.g&&0!=a.g.offsetHeight&&0!=a.g.offsetWidth||(na(a),T(a),r.setTimeout(function(){return U(a,b-1)},50))},na=function(a){var b=a.i;var c="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];b=c?c.call(b):{next:aa(b)};for(c=b.next();!c.done;c=b.next())(c=c.value)&&c.parentNode&&c.parentNode.removeChild(c);a.i=[];(b=a.g)&&b.parentNode&&b.parentNode.removeChild(b);a.g=null};var pa=function(a,b,c,d,e){var f=oa(c),h=function(l){l.appendChild(f);r.setTimeout(function(){f?(0!==f.offsetHeight&&0!==f.offsetWidth?b():a(),f.parentNode&&f.parentNode.removeChild(f)):a()},d)},g=function(l){document.body?h(document.body):0<l?r.setTimeout(function(){g(l-1)},e):b()};g(3)},oa=function(a){var b=document.createElement("div");b.className=a;b.style.width="1px";b.style.height="1px";b.style.position="absolute";b.style.left="-10000px";b.style.top="-10000px";b.style.zIndex="-10000";return b};var L=function(a){J.call(this,a)};q(L,J);var qa=function(a){J.call(this,a)};q(qa,J);var ra=function(a,b){this.l=a;this.m=new R(a.document);this.g=b;this.i=K(this.g,1);b=M(this.g,2);this.o=x(K(b,4)||"");this.h=!1;b=M(this.g,13);b=x(K(b,4)||"");this.j=new la(a.document,b,K(this.g,12))};ra.prototype.start=function(){sa(this)};
                        var sa=function(a){ta(a);S(a.m,a.o,3,!1,function(){a:{var b=a.i;var c=r.btoa(b);if(c=r[c]){try{var d=O(P,r.atob(c))}catch(e){b=!1;break a}b=b===K(d,1)}else b=!1}b?Z(a,K(a.g,14)):(Z(a,K(a.g,8)),V(a.j))},function(){pa(function(){Z(a,K(a.g,7));V(a.j)},function(){return Z(a,K(a.g,6))},K(a.g,9),K(a.g,10),K(a.g,11))})},Z=function(a,b){a.h||(a.h=!0,a=new a.l.XMLHttpRequest,a.open("GET",b,!0),a.send())},ta=function(a){var b=r.btoa(a.i);a.l[b]&&Z(a,K(a.g,5))};(function(a,b){r[a]=function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];r[a]=da;b.apply(null,d)}})("__h82AlnkH6D91__",function(a){"function"===typeof window.atob&&(new ra(window,O(qa,window.atob(a)))).start()});}).call(this);

                        window.__h82AlnkH6D91__("WyJwdWItMzA4ODI0NjM0OTg5MTM0OSIsW251bGwsbnVsbCxudWxsLCJodHRwczovL2Z1bmRpbmdjaG9pY2VzbWVzc2FnZXMuZ29vZ2xlLmNvbS9iL3B1Yi0zMDg4MjQ2MzQ5ODkxMzQ5Il0sbnVsbCxudWxsLCJodHRwczovL2Z1bmRpbmdjaG9pY2VzbWVzc2FnZXMuZ29vZ2xlLmNvbS9lbC9BR1NLV3hXMTRkT3NtQUNQTUo4RndrR21RWmhqOFVRSVYyS0ItcmRfNW9KVzJLWV9OTFpWeG14aERTa1RHS3piSGRrd0p3Rk0wNHV2UkoydDAzV0NOTEdaX0lsM1FBXHUwMDNkXHUwMDNkP3RlXHUwMDNkVE9LRU5fRVhQT1NFRCIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFZFR2NHU3NjbGZiZGswb0FJdDVLRUhxRWtmT3M4a3F3UlI3c0VqOExrU2J3V3Y0R2RKQjE4alJxYmd6eWpWeTlxLVFYbWVZVXR6TzQySml3YU5ENkg3TVFcdTAwM2RcdTAwM2Q/YWJcdTAwM2QxXHUwMDI2c2JmXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFYyWkx1bGlsX2xyRUpQcW52bmVSeXBGdUFjM0FfeDZrMjVEQlpObzF6MmVZZlIwcXRGNzBWTkNoS1VHdzdGX0hNSXJJNkRmczBRaFJIeDRUUU1pSG9oZXdcdTAwM2RcdTAwM2Q/YWJcdTAwM2QyXHUwMDI2c2JmXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFhVaU9Hd0RNUUFvOHRMVU9zZWZ0SGg4ZkFnV1gxdmRDcjMtUVZQR2pwRVktSTJmV21yWFdTalBiZW51UlZEQU5qSzBpd0c0YzNwOXJtdXZMMWJwMGJadWdcdTAwM2RcdTAwM2Q/c2JmXHUwMDNkMiIsImRpdi1ncHQtYWQiLDIwLDEwMCwiY0hWaUxUTXdPRGd5TkRZek5EazRPVEV6TkRrXHUwMDNkIixbbnVsbCxudWxsLG51bGwsImh0dHBzOi8vd3d3LmdzdGF0aWMuY29tLzBlbW4vZi9wL3B1Yi0zMDg4MjQ2MzQ5ODkxMzQ5LmpzP3VzcXBcdTAwM2RDQTQiXSwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vZWwvQUdTS1d4V3MxZkl6TlBqMURNeXJpMnUxdzRvUzVvOGVOc1ZGdEdFbWJRSW1aUzlNTmNiT2ZHSnVTano1MUNhWUdqWlR5M084aGhhMzFjSWpBLUVfbmc0ZlZJd25kd1x1MDAzZFx1MDAzZCJd");
                    `}</Script>
                </>
            )}

            {/*todo etc*/}
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FC4A1A"/>
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black"/>

            <link rel="alternate" type="application/rss+xml" title="나를 구독하지 말아요 👻" href="/rss-ghost.xml"/>

            {children}
        </>
    )
}

export default SeoHead
