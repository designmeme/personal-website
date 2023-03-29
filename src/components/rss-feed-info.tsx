import React from 'react';
import {Link} from "gatsby";

const RssFeedInfo = () => {
    return (
        <div className={`rss-feed-info`}>
            <Link to={`/rss.xml`} title={`RSS 피드로 웹사이트 구독하기 📮`}>
                <img src="https://img.shields.io/badge/rss-F88900?style=for-the-badge&logo=rss&logoColor=white"
                     height={22}
                     alt="RSS"/>
            </Link>
            <span>새 글을 편하게 받아보세요</span>
        </div>
    );
};

export default RssFeedInfo;
