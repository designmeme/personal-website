import React from 'react';
import {useSiteMetadata} from "../hooks/use-site-metadata";

interface GoogleAdsenseProps {
    slot: string
    style?: object
    format?: 'fluid' | 'auto' // 인피드광고는 fluid, 디스플레이광고는 auto
    layoutKey?: string  // 인피드광고만 필수
    responsive?: boolean // 디스플레이광고는 true
}

// 구글 애드센스에서 지정한 URL이 아니면 사용할 수 없기 때문에 운영/개발 환경에 따라 알맞게 처리함.
// 참고: https://github.com/IsAmrish/gatsby-plugin-google-adsense
const GoogleAdsense = ({
                           slot,
                           style = {display: 'block'},
                           format = 'fluid',
                           layoutKey,
                           responsive
                       }: GoogleAdsenseProps) => {
    const {googleAdsense} = useSiteMetadata()

    if (typeof window === "undefined" || !googleAdsense) {
        return <></>
    }

    if (process.env.NODE_ENV !== "production") {
        return (
            <div style={{
                background: "lightgray",
                textAlign: "center",
                padding: "2rem 1rem"
            }}>
                Google Ads
            </div>
        );
    }

    React.useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error) {
            console.log(error, "AdSense error");
        }
    }, []);

    return (
        <ins className="adsbygoogle"
             data-ad-client={googleAdsense}
             style={style}
             data-ad-format={format}
             data-ad-layout-key={layoutKey}
             data-ad-slot={slot}
             data-full-width-responsive={responsive}
        ></ins>
    );
};

export default GoogleAdsense;
