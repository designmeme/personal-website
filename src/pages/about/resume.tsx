import * as React from 'react'
import type {HeadFC, PageProps} from "gatsby"
import SeoHead from "../../components/seo-head";
import PageLayout, {PageFrontmatter} from "../../components/page-layout";
import resumeData from '../../data/resume.json'
import CareerList from "../../components/career-list";
import {Link} from "gatsby";


export const frontmatter: PageFrontmatter = {
    title: `이력서 및 경력기술서`,
    subtitle: `프론트엔드 웹 개발자 이지혜입니다`,
    excerpt: `다양한 형태의 웹사이트와 모바일 웹, 반응형 웹 그리고 웹 접근성 프로젝트까지 풍부한 개발 경험을 가지고 있습니다.`,
    createdAt: `2017-07-07T00:00:00+09:00`,
    updatedAt: `2023-03-31T13:00:00+09:00`,
}

const ResumePage: React.FC<PageProps> = () => {
    return (
        <PageLayout frontmatter={frontmatter}>
            <h3>이력서</h3>

            <h5>프로필</h5>
            <dl className="profile-list">
                <dt className="profile-title">이름</dt>
                <dd className="profile-description">이지혜</dd>
                <dt className="profile-title">이메일</dt>
                <dd className="profile-description">ghe.lee19@gmail.com</dd>
                <dt className="profile-title">홈페이지</dt>
                <dd className="profile-description"><Link to={'/'}>https://heyjihye.com</Link></dd>
            </dl>

            <hr/>

            <h5>경력</h5>
            <CareerList data={resumeData.career}/>

            <hr/>

            <h5>학력</h5>
            <CareerList data={resumeData.education}/>

            <hr/>

            <h5>전문 기술</h5>
            <p>전문 분야와 기술, 개발할 때 사용하는 도구입니다.</p>

            <ul>
                {resumeData.skills.map((skill, index) => (
                    <li key={index.toString()}>{skill}</li>
                ))}
            </ul>

            <hr/>

            <h5>협업</h5>
            <p>
                프로젝트 목표를 제대로 이해하고 기획 및 디자인을 존중하며 여러 직군과 협업합니다.
                <br/>
                소규모부터 대규모까지 다양한 규모의 프로젝트에서 팀원 및 분야 책임자로 일한 경험이 많습니다.
            </p>

            <ul>
                {resumeData.tools.map((tool, index) => (
                    <li key={index.toString()}>{tool}</li>
                ))}
            </ul>

            <hr className="print-hr"/>

            <h3>경력 기술서</h3>
            <p>
                웹 표준에 맞춰 의미 있는 구조를 가지며, 다양한 환경에 반응하도록 디자인과 UX를 구현하고,
                (검색엔진을 포함하여) 모두가 접근 가능한 웹사이트를 만들기 위해 노력하고 있습니다.
            </p>

            <hr/>

            <h5>프로젝트</h5>

            <p className="p-small">다양한 형태의 웹사이트와 모바일 웹, 반응형 웹 그리고 웹 접근성 프로젝트까지 풍부한 개발 경험을 가지고 있습니다.</p>

            {/*todo footnote -> info box*/}
            <p className="p-smaller">주요 작업은 이름 앞에 ★ 표시가 있습니다. 특별한 언급이 없다면 신규 제작 프로젝트이며, 프론트엔드 부문을 전담하였거나 90% 이상 기여한 작업입니다.</p>

            <CareerList data={resumeData.projects}/>

            <hr/>

            <h5>남김글</h5>
            <p>
                능동적으로 프로젝트를 수행하고 다양한 기술과 협업 능력을 높이며 프론트엔드 웹 개발자가 지녀야 할 자질을 쌓아왔습니다.
                <br/>
                항상 새로운 기술에 대한 관심과 배우고자 하는 열망을 바탕으로 업무에 임하겠습니다.
            </p>

        </PageLayout>
    )
}

export const Head: HeadFC = ({location}) =>
    // 사이트 제목과 페이지 부제목이 중복되어 페이지 제목만 설정함.
    // <SeoHead title={frontmatter.title + (frontmatter.subtitle && ` — ${frontmatter.subtitle}`)}
    <SeoHead title={frontmatter.title}
             description={frontmatter.excerpt}
             pathname={location.pathname}/>

export default ResumePage
