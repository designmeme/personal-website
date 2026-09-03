import React from 'react';

const RssFeedInfo: React.FC = () => {
    return (
        <div className="mt-10">
            {/* GA event 속성용 클래스 추가*/}
            <a
                href="/rss.xml"
                title={`RSS 피드로 웹사이트 구독하기 📮`}
            >
                <img src="https://img.shields.io/badge/rss-F88900?style=for-the-badge&logo=rss&logoColor=white"
                     className="h-[24px]"
                     alt="RSS"/>
            </a>
        </div>
    );
};

export default RssFeedInfo;
