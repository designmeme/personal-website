import * as React from 'react'
import type {HeadFC, PageProps} from "gatsby"
import {Link} from "gatsby";
import SeoHead from "../../components/seo-head";
import PageLayout from "../../components/page-layout";
import {useSiteMetadata} from "../../hooks/use-site-metadata";
import resumeData from '../../data/resume.json'


export const frontmatter = {
    title: `안녕하세요, 이지혜입니다`,
    subtitle: ``,
    description: `2011년, 직군이 생소하던 그때부터 프론트엔드 웹 개발을 하고 있습니다. 웹 표준에 맞춰 의미 있는 구조를 가지며, 디자인과 UX를 다양한 환경에 반응하는, (검색엔진을 포함하여) 모두가 접근 가능한 웹사이트를 만들기 위해 노력하고 있습니다.`,
    createdAt: `2017-07-07T00:00:00+09:00`,
    updatedAt: `2021-03-18T00:00:00+09:00`,
}

const AboutPage: React.FC<PageProps> = () => {
    const {email} = useSiteMetadata()

    return (
        <PageLayout title={frontmatter.title} subtitle={frontmatter.subtitle}>
            <h5>프리랜서 프론트엔드 웹 개발자</h5>
            <p>
                2011년, 직군이 생소하던 그때부터 프리랜서로서 시작하여 현재까지 프론트엔드 웹 개발 분야에서 일하고 있습니다.
                웹 표준에 맞춰 의미 있는 구조를 가지며, 다양한 환경에 반응하도록 디자인과 UX를 구현하고,
                (검색엔진을 포함하여) 모두가 접근 가능한 웹사이트를 만들기 위해 노력하고 있습니다.
            </p>
            <ul>
                {resumeData.skills.map(skill => (
                    <li>{skill}</li>
                ))}
            </ul>
            <hr/>
            <h5>같이 일해요</h5>
            <p>참여한 주요 작업 목록입니다.</p>
            <p className="p-small">헬로우봇 스킬스토어 / 헬로우봇 스튜디오 / 김메리 / 웨딩마루, 스튜디온, 웨딩북 웹 ERP / 이디움펀딩 / 성호그룹 / 엑스타 슈퍼챌린지 / LG Artcool / 현대자동차 제네시스 이러닝 / 투어팁스 하이브리드앱 / KB국민은행 희망별 / 현대카드뮤직 2.0 / 현대자동차 일마일</p>
            <p>
                사용자를 고려한 디자인과 UX를 갖추면서 구조적이면서 빠르게 로딩되고 사용자가 어떤 기기로 보든지 기대한 대로 작동하는 웹사이트에 관심이 많습니다.
                그런 프로젝트를 함께하고 싶어요. 저를 고용하는 데 관심이 간다면 <Link to="./resume">이력서 및 경력기술서</Link> 페이지를 봐주세요.
            </p>
            <hr/>
            <h5>연락주세요</h5>
            <p>
                저와 같이 일하고 싶거나 궁금한 것이 있나요?
                <br/>
                이메일 주소 <a href={`mailto:${email}`} target="_blank">{email}</a>으로 언제든지 연락주세요 :)
            </p>

        </PageLayout>
    )
}

export const Head: HeadFC = ({location}) =>
    <SeoHead title={frontmatter.title + (frontmatter.subtitle && ` — ${frontmatter.subtitle}`)}
             description={frontmatter.description}
             pathname={location.pathname}/>

export default AboutPage
