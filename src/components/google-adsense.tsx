import React from 'react';
import {useSiteMetadata} from "../hooks/use-site-metadata";

interface GoogleAdsenseProps {
    layoutKey: string
    slot: string
}

// 구글 애드센스에서 지정한 URL이 아니면 사용할 수 없기 때문에 운영/개발 환경에 따라 알맞게 처리함.
const GoogleAdsense = (props: GoogleAdsenseProps) => {
    const { googleAdsense } = useSiteMetadata()

    React.useEffect(() => {
        if (process.env.NODE_ENV !== "development") {
            if (window) {
                try {
                    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                } catch (error) {
                    console.log(error, "AdSense error");
                }
            }
        }
    }, []);

    if (process.env.NODE_ENV === "development") {
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

    return (
        <ins style={{ display: "block" }}
             data-ad-format="fluid"
             data-ad-layout-key={props.layoutKey}
             data-ad-client={googleAdsense}
             data-ad-slot={props.slot}></ins>
    );
};

export default GoogleAdsense;
