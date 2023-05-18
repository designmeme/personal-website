import React from 'react';

const RssFeedInfo: React.FC = () => {
    return (
        <div className={`rss-feed-info`}>
            {/* GA event 속성용 클래스 추가*/}
            <a
                className="rss-feed-link"
                href="/rss.xml"
                title={`RSS 피드로 웹사이트 구독하기 📮`}
            >
                <img src="https://img.shields.io/badge/rss-F88900?style=for-the-badge&logo=rss&logoColor=white"
                     height={22}
                     alt="RSS"/>
            </a>
            <span>새 글을 편하게 받아보세요</span>
        </div>
    );
};

export default RssFeedInfo;
