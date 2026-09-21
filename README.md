# 👋 heyjihye

[Gatsby](https://www.gatsbyjs.com)를 바탕으로 만든 [개인 웹사이트](https://jihye.dokkaebiclub.dev/?utm_source=github&utm_medium=referral&utm_campaign=github_profile)의 소스 코드를 담고 있어요

[//]: # ([![Gatsby]&#40;https://img.shields.io/badge/Gatsby-%23663399.svg?style=for-the-badge&logo=gatsby&logoColor=white&#41;]&#40;https://gatsbyjs.com&#41;)
[![Gatsby](https://img.shields.io/github/package-json/dependency-version/designmeme/personal-website/gatsby?logo=gatsby&labelColor=%23663399&color=%23663399&style=for-the-badge)](https://gatsbyjs.com)
[![Netlify Status](https://img.shields.io/netlify/101225b5-7387-48e9-b17a-c351d1d65a4c?logo=netlify&style=for-the-badge)](https://app.netlify.com/sites/rad-alpaca-81e1b1/deploys)
<br>
[![GitHub Workflow Release Please Status](https://img.shields.io/github/actions/workflow/status/designmeme/personal-website/release-please.yml?label=Release%20Please&logo=github&style=for-the-badge)](https://github.com/designmeme/personal-website/actions/workflows/release-please.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196.svg?logo=conventionalcommits&style=for-the-badge)](https://conventionalcommits.org)
[![Rss](https://img.shields.io/badge/rss-F88900?style=for-the-badge&logo=rss&logoColor=white)](https://jihye.dokkaebiclub.dev/rss.xml)
[![GitHub](https://img.shields.io/github/license/designmeme/personal-website?style=for-the-badge)](./LICENSE.md)

## 👩‍💻 Develop

### 요구 사항

- Node.js 24.21.0
- pnpm 10.7.1

이 프로젝트는 `.nvmrc`로 Node.js 버전을 관리합니다. fnm을 사용하는 경우
아래 명령으로 필요한 버전을 설치하고 활성화할 수 있습니다.

```shell
fnm install
fnm use
```

### 로컬에서 개발하기

```shell
pnpm develop
```

기본 포트(8000)를 다른 로컬 서비스가 사용 중이면 다음처럼 포트를 지정해 실행할 수 있습니다.

```shell
pnpm develop -- --port 8001
```

### 색상 테마

색상 테마는 기본적으로 운영체제 설정을 따릅니다. 헤더의 테마 선택 메뉴에서
라이트 또는 다크 테마를 고정할 수 있고, 시스템을 선택하면 운영체제 설정으로
다시 돌아갑니다. 선택한 테마는 브라우저에 저장되어 다음 방문에도 유지됩니다.

### Gatsby 참고

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

### Tech stacks

- Package manager: [pnpm](https://pnpm.io/)
- React/[Gatsby](https://www.gatsbyjs.com)
- RSS Feed: [gatsby-plugin-feed](https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/) 플러그인 사용. 
  - 플러그인 설정 참고: [gatsby-config.ts](./gatsby-config.ts)
- [Rehype Pretty Code](https://rehype-pretty.pages.dev/): Code blocks for MDX
- [TailwindCSS v4](https://tailwindcss.com/)
- [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography)

### Sitemap
```
/about
/about/resume
/blog
/blog/*
/design-guide

/sitemap-index.xml  # Auto Generated
/robots.txt  # Auto Generated
/rss.xml  # Auto Generated
/rss-ghost.xml  # rss feed to test
/ads.txt  # Google AdSense
/naverd849460eb9388f7c5265f4ac78dd5587.html  # Naver Serach Advisor
/_redirects  # heyjihye.netlify.app에서 운영 도메인으로 301 리디렉션

```

## 🤖 Release

[Release Please](https://github.com/googleapis/release-please)를 사용해 CHANGELOG, 깃헙 릴리즈, 프로젝트 버전 등을 자동으로 처리합니다.

1. Commit messages: [Conventional Commits](https://www.conventionalcommits.org/) 규약에 맞는 커밋 메세지를 작성합니다.
    * Intellij IDEA Plugin: [Git Commit Template](https://plugins.jetbrains.com/plugin/9861-git-commit-template) 사용 추천

2. Auto Release:
    * 사용 기술: [Release Please](https://github.com/googleapis/release-please)
    * 구현: GitHub Action > [Release Please Action v5](https://github.com/googleapis/release-please-action)
    * 설정 파일: `/.github/workflows/release-please.yml`
    * `main` 브랜치에 변경 사항이 반영되면 Release PR이 자동으로 생성되거나 갱신됩니다.
    * Release PR을 병합하면 CHANGELOG와 프로젝트 버전이 갱신되고 태그와 GitHub Release가 생성됩니다.
    * 같은 릴리즈 커밋만 `production` 브랜치로 자동 승격되어 Netlify 운영 환경에 배포됩니다.

### 품질 검사

`main`을 대상으로 하는 모든 PR과 `main` 푸시는 GitHub Actions에서 아래 검사를 실행합니다.

* `pnpm typecheck`
* `pnpm test`
* `pnpm build`

PR에서는 Netlify Deploy Preview도 함께 생성되어, 운영 배포 전에 실제 결과를 확인할 수 있습니다.

## 🚀 Deploy & Hosting

* Platform: [Netlify](https://www.netlify.com/)
* [Gatsby Adapter](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/adapters/) 기능 사용
* 관련 설정: [gatsby-config.ts](./gatsby-config.ts) - `gatsby-adapter-netlify`
* `production` 브랜치가 업데이트 되면 자동으로 빌드 후 운영 환경에 배포합니다. 이 브랜치는 Release Please workflow만 갱신합니다.
* `main`은 릴리즈 전 통합 브랜치로 Netlify Branch Deploy를 생성하며, `main` 대상 PR은 Netlify Deploy Preview URL을 생성합니다.

### Domain

* 운영 주소: [jihye.dokkaebiclub.dev](https://jihye.dokkaebiclub.dev)
* DNS: Porkbun에서 관리하며, `jihye` CNAME은 `heyjihye.netlify.app`을 가리킵니다.
* 기존 Netlify 주소(`heyjihye.netlify.app`)는 운영 주소로 301 리디렉션됩니다.

| 주소 | 사용 시작일 | 상태 | 설명 |
| --- | --- | --- | --- |
| `designmeme.github.io` | 2023-03-05 | 이전 | Git 이력상 초기 주소 |
| `heyjihye.com` | 2023-03-23 | 이전 | 첫 번째 커스텀 도메인 |
| `heyjihye.netlify.app` | 2026-08-10 | 이전 | Netlify 기본 주소, 현재 운영 주소로 301 리디렉션 |
| `jihye.dokkaebiclub.dev` | 2026-09-17 | 현재 | Netlify 기본 도메인 |


## 🚀 Integrations

### SEO

- [`SeoHead`](./src/components/seo-head.tsx): 페이지별 제목, 설명, canonical URL과 Open Graph·Twitter Card 메타 태그를 설정.
- 사용 플러그인
  - [`gatsby-config.ts`](./gatsby-config.ts) 설정 참고
  - [`gatsby-plugin-sitemap` ](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/): `/sitemap-index.xml` 파일 자동 생성
  - `gatsby-plugin-robots-txt`

### Analytics

- [Google Tag Manager](https://tagmanager.google.com/)
- [Google Analytics](https://analytics.google.com/)
  - GTM 활용해 연결 완료
- [Google Search Console](https://search.google.com/search-console/)
  - `dokkaebiclub.dev` 도메인 속성을 DNS TXT 레코드로 인증함.
  - `https://jihye.dokkaebiclub.dev/sitemap-index.xml`을 제출함.
- [Naver Search Advisor](https://searchadvisor.naver.com/)
  - `jihye.dokkaebiclub.dev` 사이트 등록 완료

### Advertising
- [Google AdSense](https://adsense.google.com/)

## License

Code released under [MIT License](./LICENSE.md)

모든 콘텐츠는 [Creative Commons BY-NC-ND 4.0 License](https://creativecommons.org/licenses/by-nc-nd/4.0/) 규정에 따라 이용할 수 있어요.
