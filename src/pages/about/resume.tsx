import * as React from 'react'
import type {HeadFC, PageProps} from "gatsby"
import SeoHead from "../../components/seo-head";
import PageLayout, {PageFrontmatter} from "../../components/page-layout";
import resumeData from '../../data/resume.json'
import CareerList from "../../components/career-list";
import {Link} from "gatsby";


export const frontmatter: PageFrontmatter = {
    title: `이력서 및 경력기술서`,
    excerpt: `15년 이상 경력의 프론트엔드 개발자로 다수의 프로젝트 개발 경험을 보유하고 있습니다.`,
    createdAt: `2017-07-07T00:00:00+09:00`,
    updatedAt: `2026-08-11T12:00:00+09:00`,
}

const ResumePage: React.FC<PageProps> = () => {
    return (
        <PageLayout frontmatter={frontmatter}>
            <h2>프론트엔드 개발자 이지혜</h2>
            <p>
                15년 이상 경력의 프론트엔드 개발자로 다수의 프로젝트 개발 경험을 보유하고 있습니다.
                프리랜서로서 다양한 규모/기능/형태의 웹 서비스를 개발하고 있습니다.
                스타트업에서 약 6년간 챗봇 빌더 및 관리 사이트, 웨딩 웹 솔루션 등 프론트엔드 개발 책임자로 일했습니다.
            </p>
            <dl className="grid grid-cols-[3em_auto] gap-4">
                <dt className="font-medium mt-0">연락처</dt>
                <dd className="mt-0">ghe.lee19@gmail.com</dd>
                <dt className="font-medium mt-0">링크</dt>
                <dd className="flex gap-4 mt-0">
                    <Link to={'https://www.linkedin.com/in/heyjihye'} className="print-url">LinkedIn</Link>
                    <Link to={'https://github.com/designmeme'} className="print-url">GitHub</Link>
                </dd>
            </dl>

            <hr/>

            <h2>주요 강점</h2>
            <ul className="list-disc pl-8">
                <li>
                    <b>높음 품질과 신뢰</b>: 꼼꼼하게 요구 사항을 모두 구현하며 반복적인 테스트로 버그를 최소화한 품질 높은 산출물을 만듭니다.
                    신뢰가 쌓여 연속해서 일을 받거나 외주로 일하던 스타트업에서 계약직으로 일하고 이어서 다른 스타트업으로 인연을 이어가기도 했습니다.
                </li>
                <li>
                    <b>디자인과 기획 이해력</b>: 산업디자인을 공부하여 디자인·기획에 대한 높은 이해도를 가지고 있으며,
                    백엔드 영역과도 원활하게 협업하며 웹 제작 프로세스의 중간 다리 역할을 잘 수행합니다.
                </li>
                <li>
                    <b>다양한 개발 경험</b>: 신규 제작부터 주간 개선 사이클의 프로젝트, 다양한 규모의 회사, 다양한 UI와 기능, 1페이지부터 수십 페이지의 다양한 분량까지 폭 넓은 개발 경험을 갖고 있습니다.
                </li>
            </ul>

            <hr/>

            <h2>전문 기술</h2>
            <p>전문 분야와 기술, 개발할 때 사용하는 도구입니다.</p>
            <ul className="list-disc pl-8">
                <li>웹 표준, 브라우저 호환성, 반응형 웹, 웹 접근성, SEO, SPA, SSR, PWA</li>
                <li><b>Basic</b>: HTML5, CSS3, JavaScript(ES6+), TypeScript</li>
                <li><b>SPA</b>: React/Next.js, Angular, RxJS, Gatsby</li>
                <li><b>Design</b>: Tailwind CSS, shadcn/ui, Bootstrap, Material, Sass</li>
                <li><b>Dev</b>: Git, pnpm, npm, Chrome DevTools, Lighthouse, PyCharm/WebStorm</li>
                <li><b>CI/CD</b>: GitHub Actions, Travis, AWS(S3, Lambda), Firebase(Hosting, Functions), Vercel, Netlify, Docker</li>
                <li><b>Analytics</b>: Google Analytics, Google Tag Manager, Google Optimize, Amplitude, Airbridge, Facebook Pixel, Kakao Pixel</li>
                <li><b>AI</b>: AI Coding Agents(ChatGPT Codex, Claude Code), OpenRouter, Vibe coding</li>
                <li><b>etc</b>: Python, Django, Ninja API, SQL, SQLite, MySQL, ClickHouse</li>
            </ul>

            <p>협업을 위해 사용하는 도구입니다.</p>
            <ul className="list-disc pl-8">
                <li><b>커뮤니케이션</b>: Slack, Email</li>
                <li><b>프로젝트 및 이슈 관리</b>: Notion, GitHub, Bitbucket, JIRA, Redmine, Wrike, Trello</li>
                <li><b>기획</b>: Oven, AXURE, Balsamiq Mockups, PowerPoint</li>
                <li><b>디자인</b>: Figma, Zeplin, InVision, Sketch</li>
            </ul>

            <hr/>

            <h2>경력</h2>
            <CareerList data={resumeData.career}/>

            <br/>

            <h2>학력</h2>
            <CareerList data={resumeData.education}/>

            {/*<h3>경력 기술서</h3>*/}
            {/*<p>*/}
            {/*    웹 표준에 맞춰 의미 있는 구조를 가지며, 다양한 환경에 반응하도록 디자인과 UX를 구현하고,*/}
            {/*    (검색엔진을 포함하여) 모두가 접근 가능한 웹사이트를 만들기 위해 노력하고 있습니다.*/}
            {/*</p>*/}

            <hr/>

            <h2>프로젝트</h2>

            <p className="text-sm mb-2">다양한 형태의 웹사이트와 모바일 웹, 반응형 웹 그리고 웹 접근성 프로젝트까지 풍부한 개발 경험을 가지고 있습니다.</p>

            <p className="text-xs text-muted">주요 작업은 이름 앞에 ★ 표시가 있습니다. 특별한 언급이 없다면 신규 제작 프로젝트이며, 프론트엔드 부문을 전담하였거나 90% 이상 기여한 작업입니다.</p>

            <CareerList data={resumeData.projects}/>

            <hr/>

            <h2>남김글</h2>
            <p>
                능동적으로 프로젝트를 수행하고 다양한 기술과 협업 능력을 높이며 프론트엔드 개발자가 지녀야 할 자질을 쌓아왔습니다.
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
