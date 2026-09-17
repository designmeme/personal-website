import * as React from 'react'
import type {HeadFC, PageProps} from 'gatsby'
import SeoHead from '../../components/seo-head'
import PageLayout, {PageFrontmatter} from "../../components/page-layout";

export const frontmatter: PageFrontmatter = {
    title: `서비스`,
    excerpt: `내용`,
    createdAt: `2026-09-08T00:00:00+09:00`,
    updatedAt: `2026-09-08T00:00:00+09:00`,
}

const ServicesPage: React.FC<PageProps> = () => (
    <PageLayout frontmatter={frontmatter} showMeta={false}>
        <h2>프론트엔드 개발 의뢰하기</h2>

## 📐 Pixel Perfect 웹퍼블리싱
## 📐 Pixel Perfect React/Next.js 프론트엔드 개발
## 📐 Pixel Perfect Angular 프론트엔드 개발

디자인 시안과 기능 요구사항을 100% 동일하게 구현하는 Pixel Perfect 웹 개발을 약속드립니다.

## 🎁 첫 고객 대상 20% 할인 이벤트
- **대상**: 첫 계약 진행 고객
    *다른 계정의 같은 회사인 경우 첫 계약만 대상입니다.*
- **혜택**: 최초 합의 견적의 **20% 할인** (최대 100만 원 한도)
    *작업 진행 후 추가 유상 수정건은 할인 대상에서 제외됩니다.*

## 👩‍💻 작업 가능한 웹 유형
- 반응형 웹사이트, 데스크탑 웹사이트, 모바일 웹사이트
- 신규 웹사이트의 메인 및 서브 페이지
- 기존 웹사이트의 추가 서브 페이지
- 원페이지(One-Page) 웹사이트

## 기반 기술
- HTML5/CSS3/JavaScript 사용하여 정적 웹사이트 개발
- 필요시 jQuery, CSS 프레임워크(Bootstrap, Material Web 등) 활용

- React/Next.js, TypeScript, TailwindCSS 사용하여 SPA 개발
- 필요시 shadcn/ui 기반 커스텀 디자인 적용

- Angular, TypeScript, TailwindCSS 사용하여 SPA 개발
- 필요시 spartan/ui 기반 커스텀 디자인 적용

## 🫶 기본 제공 사항
- 웹 표준, 구조적 마크업, 깔끔한 코드 작성
- 브라우저 호환성(크로스 브라우징) 보장
- 웹접근성 준수
- 빠른 로딩을 위한 웹 성능 최적화
- 기본 검색엔진 최적화(SEO)
- 메뉴, 팝업, 아코디언, 슬라이더 등 기본 스크립트
- 간단한 CSS 트렌지션 효과

## 🙏 추가 비용 발생 작업
- 다크 테마 지원(라이트/다크/시스템 모드 전환)
- 스크롤 애니메이션 및 복잡한/고급 스크립트 효과
- 복잡하거나 많은 CSS 트렌지션 효과
- 서버 API 연동
- 외부 서비스 SDK 연동 (카카오맵 등)
- 웹 분석 도구 설치 (GA, Amplitude 등) 및 이벤트 처리
- 외부 JS 라이브러리 활용 (Chart.js, AG Grid 등)
- W3C 접근성 인증 목표 작업
- 고급 검색엔진 최적화(SEO)
- CI/CD 설정
- Vercel, Netlify 깃헙 연동 설정 및 배포

## 🧮 견적 산정
- **최종 견적**: 기본 가격 + 웹페이지 유형, 페이지수, 페이지 내부 컨텐츠양, 요구 기술사항에 따라 추가 비용 산출
- **빠른 작업 요청**: 하루당 1.5배 금액 적용
- **무상 수정**: 전달일 기준 1개월 이내 (산출물의 오타, 스크립트 오류, 디자인 및 기능 요구사항 구현 미비에 한함)
- **유상 수정**: 전달 이후 구성요소/배치/디자인/기능 등 변경은 견적 및 일정 재협의 후 진행

## 🤝 산출물 및 전달
- **산출물**: 소스 코드
- **전달 방식**: GitHub 저장소, 이메일, 메신저(Slack 등), FTP 서버 등 원하는 방식으로 전달


## 서비스 제공 절차
의뢰서 작성(구글시트)
1. 상담
2. 작업 내용/견적/일정 확정
3. 결제
4. 1차 산출물 전달
5. 검수 및 수정
6. 최종 산출물 전달
7. 구매 확정

## 의뢰인 준비사항
- 디자인 시안(Figma, Zeplin, Sketch, Adobe XD 등)
- 희망 일정
- 기타 요구사항

## 안내
- 다양한 외부 플랫폼에서 동일한 외주 서비스를 제공합니다. 다만 플랫폼에서 결제할 경우 플랫폼 수수료가 추가되어 최종 금액이 더 크게 산정됩니다.
- 계약 금액은 세전(사업소득 3.3%) 금액입니다. 주민등록증 사본 및 통장 사본 보내줘야 함.
- 대금 지급 조건(예: 계약금 30%, 잔금 70% 등) -> 금액에 따라 상이

        계약서상의 용역 기간(납기)이나 하자보수(A/S) 범위, 또는 대금 지급 방식(계약금/중도금/잔금 비율)

        단순경비율(64.4%) 혜택 대상
        신규 프리랜서 연간 7,500만 원 미만
        사업소득(업종코드는 940926 소프트웨어 프리랜서)
        2년차 부터 2,400만 원 이상일 때 사업자등록증(청년창업 감면 등)을 고려해 봐야 함.

    </PageLayout>
)

export const Head: HeadFC = ({location}) =>
    <SeoHead title={frontmatter.title}
             description={frontmatter.excerpt}
             pathname={location.pathname}/>

export default ServicesPage
