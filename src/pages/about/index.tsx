import * as React from 'react'
import type {HeadFC, PageProps} from "gatsby"
import {Link} from "gatsby";
import SeoHead from "../../components/seo-head";
import PageLayout, {PageFrontmatter} from "../../components/page-layout";
import {useSiteMetadata} from "../../hooks/use-site-metadata";


export const frontmatter: PageFrontmatter = {
    title: `안녕하세요, 이지혜입니다`,
    subtitle: `👩‍🎨 👩‍💻 🚀 📈`,
    excerpt: `15년 이상 경력의 프론트엔드 개발자로 다수의 프로젝트 개발 경험을 보유하고 있습니다.`,
    createdAt: `2017-07-07T00:00:00+09:00`,
    updatedAt: `2026-09-04T00:00:00+09:00`,
}

const AboutPage: React.FC<PageProps> = () => {
    const {email} = useSiteMetadata()

    return (
        <PageLayout frontmatter={frontmatter}>
            <p>
                15년 이상 경력의 프론트엔드 개발자로 다수의 프로젝트 개발 경험을 보유하고 있습니다.
                프리랜서로서 다양한 규모/기능/형태의 웹 서비스를 개발하고 있습니다.
                스타트업에서 약 6년간 챗봇 빌더 및 관리 사이트, 웨딩 웹 솔루션 등 프론트엔드 개발 책임자로 일했습니다.
            </p>

            <hr/>

            <h2>프리랜서 프론트엔드 개발자</h2>

            <p>React/Next.js, TypeScript, Angular 기반으로 아래 형태의 웹을 개발합니다.</p>
            <ul className="list-disc pl-8">
                <li>
                    <b>사용자 중심 웹서비스</b>
                    <br/>
                    신규 유입과 재방문을 높이는 사용성 중심 웹 개발에 중점을 둡니다.
                    <div className="text-sm text-secondary">SEO / SSR / Analytics / UX / Lighthouse</div>
                </li>
                <li>
                    <b>업무 효율성을 올리는 어드민</b>
                    <br/>
                    재사용 가능한 디자인 시스템을 바탕으로 업무에 필요한 다양한 UI를 개발하거나 외부 라이브러리를 사용합니다.
                    <div className="text-sm text-secondary">Design system / Data Grid / Chart / Calendar UI / Drag and Drop / Shortcuts</div>
                </li>
                <li>
                    <b>표현력이 중요한 서비스 소개 웹사이트</b>
                    <br/>
                    회사나 서비스 소개 사이트 등 가독성이 높으면서 브랜드를 잘 표현할 수 있게 시각 중심으로 표현합니다.
                    <div className="text-sm text-secondary">Scroll Animation / Chart UI / Single Page Web</div>
                </li>
            </ul>

            <p>참여한 주요 작업 목록입니다.</p>
            <p className="text-sm text-secondary">헬로우봇 스킬스토어 / 헬로우봇 스튜디오 / 김메리 / 웨딩마루, 스튜디온, 웨딩북 웹 ERP / 이디움펀딩 / 성호그룹 / 엑스타 슈퍼챌린지 / LG Artcool / 현대자동차 제네시스 이러닝 / 투어팁스 하이브리드앱 / KB국민은행 희망별 / 현대카드뮤직 2.0 / 현대자동차 일마일</p>
            <p>
                저를 고용하는 데 관심이 간다면 <Link to="./resume">이력서 및 경력기술서</Link> 페이지를 봐주세요.
            </p>
            <hr/>

            <h2>연락주세요</h2>
            <p>
                저와 같이 일하고 싶거나 궁금한 것이 있나요?
                <br/>
                이메일 주소 <a href={`mailto:${email}`} target="_blank">{email}</a>으로 언제든지 연락주세요 :)
            </p>

        </PageLayout>
    )
}

export const Head: HeadFC = ({location}) =>
    <SeoHead title={'소개'}
             description={frontmatter.excerpt}
             pathname={location.pathname}/>

export default AboutPage
