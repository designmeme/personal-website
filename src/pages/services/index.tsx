import * as React from 'react'
import type {HeadFC, PageProps} from 'gatsby'
import {Link} from "gatsby";
import SeoHead from '../../components/seo-head'
import PageLayout, {type PageFrontmatter} from '../../components/page-layout'

export const frontmatter: PageFrontmatter = {
    title: 'React·Next.js·Angular 웹 개발 외주',
    excerpt: 'React·Next.js·Angular 기반 프론트엔드·풀스택 및 정적 웹사이트 개발 외주 서비스입니다. 디자인 시안 구현부터 반응형 웹, 웹 표준·접근성·성능·기본 SEO까지 제공합니다.',
    createdAt: '2026-09-08T00:00:00+09:00',
    updatedAt: '2026-09-08T00:00:00+09:00',
}

const ServicesPage: React.FC<PageProps> = () => (
    <PageLayout frontmatter={frontmatter} showMeta={false}>

        <h2>Pixel Perfect 웹 개발 외주 의뢰하기</h2>
        <p>
            디자인 시안과 합의된 기능 요구사항을 바탕으로 완성도 높은 웹사이트를 개발합니다.
            반응형 웹사이트부터 React·Next.js·Angular 애플리케이션까지 프로젝트 목적과 운영 환경에 맞춰 구현합니다.
        </p>
        <p>
            15년 이상 경력의 프론트엔드 개발자가 직접 상담부터 개발과 전달까지 진행합니다.
            자세한 내용은 <Link to="/about/resume/">경력 소개</Link>에서 확인할 수 있습니다.
        </p>

        <ul>
            <li>React/Next.js 프론트엔드/풀스택 개발</li>
            <li>Angular 프론트엔드/풀스택 개발</li>
            <li>웹퍼블리싱(정적 웹사이트 개발)</li>
        </ul>

        <h3>🎁 첫 고객 대상 20% 할인 이벤트</h3>
        <ul>
            <li><strong>대상</strong>: 첫 계약 진행 고객</li>
            <li><strong>혜택</strong>: 최초 합의 견적의 <strong>20% 할인</strong> (최대 100만 원 한도) <br/><em>작업 진행 후 추가 유상 수정건은 할인 대상에서 제외됩니다.</em></li>
        </ul>

        <h3>👩‍💻 작업 가능한 웹 유형</h3>
        <ul>
            <li>반응형 웹사이트, 데스크탑 웹사이트, 모바일 웹사이트</li>
            <li>신규 웹사이트의 메인 및 서브 페이지</li>
            <li>기존 웹사이트의 추가 서브 페이지</li>
            <li>원페이지(One-Page) 웹사이트</li>
        </ul>

        <h3>📝 기반 기술</h3>
        <ul>
            <li>React/Next.js: TypeScript, TailwindCSS, shadcn/ui, Prisma, Zustand, TanStack Query</li>
            <li>Angular: TypeScript, RxJS, TailwindCSS, spartan/ui</li>
            <li>웹퍼블리싱: HTML5/CSS3/JavaScript, jQuery, CSS 프레임워크(Bootstrap, Material Web 등)</li>
        </ul>

        <h3>🫶 기본 제공 사항</h3>
        <ul>
            <li>웹 표준, 구조적 마크업, 깔끔한 코드 작성</li>
            <li>브라우저 호환성(크로스 브라우징) 보장</li>
            <li>웹접근성 준수</li>
            <li>빠른 로딩을 위한 웹 성능 최적화</li>
            <li>기본 검색엔진 최적화(SEO)</li>
            <li>메뉴, 팝업, 아코디언, 슬라이더 등 기본 스크립트</li>
            <li>간단한 CSS 트랜지션 효과</li>
        </ul>

        <h3>🙏 추가 비용 발생 작업</h3>
        <ul>
            <li>다크 테마 지원(라이트/다크/시스템 모드 전환)</li>
            <li>스크롤 애니메이션 및 복잡한/고급 스크립트 효과</li>
            <li>복잡하거나 많은 CSS 트랜지션 효과</li>
            <li>서버 API 연동</li>
            <li>외부 서비스 SDK 연동 (카카오맵 등)</li>
            <li>웹 분석 도구 설치 (GA, Amplitude 등) 및 이벤트 처리</li>
            <li>외부 JS 라이브러리 활용 (Chart.js, AG Grid 등)</li>
            <li>웹 접근성 품질인증 목표 작업</li>
            <li>고급 검색엔진 최적화(SEO)</li>
            <li>CI/CD 설정</li>
            <li>Vercel, Netlify 깃헙 연동 설정 및 배포</li>
        </ul>

        <hr/>

        <h3>견적 산정</h3>
        <ul>
            <li><strong>최종 견적</strong>: 페이지 수, 디자인 복잡도, 기능 요구사항, 연동 범위 및 희망 일정에 따라 산정합니다.</li>
            <li><strong>빠른 작업 요청</strong>: 협의된 표준 일정보다 납기를 단축하는 긴급 작업은 단축 기간과 투입 범위에 따라 추가 비용이 발생할 수 있습니다.</li>
            <li><strong>무상 수정</strong>: 전달일 기준 1개월 이내 (산출물의 오타, 스크립트 오류, 디자인 및 기능 요구사항 구현 미비에 한함)</li>
            <li><strong>유상 수정</strong>: 전달 이후 구성요소/배치/디자인/기능 등 변경은 견적 및 일정 재협의 후 진행</li>
        </ul>

        <h3>산출물 및 전달</h3>
        <ul>
            <li><strong>산출물</strong>: 소스 코드</li>
            <li><strong>전달 방식</strong>: GitHub 저장소, 이메일, 메신저(Slack 등), FTP 서버 등 원하는 방식으로 전달</li>
        </ul>

        <h3>서비스 제공 절차</h3>
        <ol>
            <li>상담</li>
            <li>작업 내용/견적/일정 확정</li>
            <li>계약금 입금</li>
            <li>1차 산출물 전달</li>
            <li>검수 및 수정</li>
            <li>최종 산출물 전달</li>
            <li>잔금 입금</li>
        </ol>

        <h3>의뢰인 준비사항</h3>
        <ul>
            <li>디자인 시안(Figma, Zeplin, Sketch, Adobe XD 등)</li>
            <li>희망 일정</li>
            <li>기타 요구사항</li>
        </ul>

        <h3>안내</h3>
        <ul>
            <li>다양한 외부 플랫폼에서 동일한 외주 서비스를 제공합니다.
                <ul>
                    <li>크몽: <a href="https://kmong.com/@%EB%8F%84%EA%B9%A8%EB%B9%84%ED%81%B4%EB%9F%BD" data-link-external rel="nofollow" target={'_blank'}>도깨비클럽</a></li>
                    <li>원티드 긱스: <a href="https://www.wanted.co.kr/gigs/premium/53350" data-link-external rel="nofollow" target={'_blank'}>프로필</a></li>
                    <li>위시켓: <a href="https://www.wishket.com/partners/p/jihyelee315/" data-link-external rel="nofollow" target={'_blank'}>프로필</a></li>
                </ul>
                <div className={'text-sm'}>다만 플랫폼에서 결제할 경우 플랫폼 수수료가 추가되어 최종 금액이 더 크게 산정됩니다.</div>
            </li>
            <li>계약 금액은 세전(사업소득 3.3%) 금액입니다.</li>
            <li>대금 지급 방식은 총 계약 금액과 기간에 따라 다르게 책정됩니다. (예: 계약금 30%, 잔금 70% 등)</li>
        </ul>

        <h3>견적 문의하기</h3>
        <p>
            작업 의뢰 및 문의는 이메일 주소 <a href={`mailto:ghe.lee19@gmail.com`} target="_blank">ghe.lee19@gmail.com</a>으로 언제든지 연락주세요 :)
            <br/>
            빠른 견적을 위해 프로젝트 유형, 디자인 시안 유무, 예상 페이지 수, 필요한 기능, 희망 일정 및 예산 범위를 함께 보내주세요.
        </p>
    </PageLayout>
)

export const Head: HeadFC = ({location}) => (
    <SeoHead title={frontmatter.title} description={frontmatter.excerpt} pathname={location.pathname}/>
)

export default ServicesPage
