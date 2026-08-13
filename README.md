# 👋 heyjihye

[Gatsby](https://www.gatsbyjs.com)를 바탕으로 만든 [개인 웹사이트](https://heyjihye.netlify.app/?utm_source=github&utm_medium=referral&utm_campaign=github_profile)의 소스 코드를 담고 있어요

[//]: # ([![Gatsby]&#40;https://img.shields.io/badge/Gatsby-%23663399.svg?style=for-the-badge&logo=gatsby&logoColor=white&#41;]&#40;https://gatsbyjs.com&#41;)
[![Gatsby](https://img.shields.io/github/package-json/dependency-version/designmeme/personal-website/gatsby?logo=gatsby&labelColor=%23663399&color=%23663399&style=for-the-badge)](https://gatsbyjs.com)
[![Netlify Status](https://img.shields.io/netlify/101225b5-7387-48e9-b17a-c351d1d65a4c?logo=netlify&style=for-the-badge)](https://app.netlify.com/sites/rad-alpaca-81e1b1/deploys)
<br>
[![GitHub Workflow Release Please Status](https://img.shields.io/github/actions/workflow/status/designmeme/personal-website/release-please.yml?label=Release%20Please&logo=github&style=for-the-badge)](https://github.com/designmeme/personal-website/actions/workflows/release-please.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196.svg?logo=conventionalcommits&style=for-the-badge)](https://conventionalcommits.org)
[![Rss](https://img.shields.io/badge/rss-F88900?style=for-the-badge&logo=rss&logoColor=white)](https://heyjihye.netlify.app/rss.xml)
[![GitHub](https://img.shields.io/github/license/designmeme/personal-website?style=for-the-badge)](./LICENSE.md)

## 👩‍💻 Develop

### 로컬에서 개발하기

```shell
npm run develop
npm run develop -- --port 8001
```

### Gatsby 참고

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

### 구현 기능

- RSS Feed: [gatsby-plugin-feed](https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/) 플러그인 사용. 
  - 플러그인 설정 참고: [gatsby-config.ts](./gatsby-config.ts)

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

## 🚀 Deploy & Hosting

* Platform: [Netlify](https://www.netlify.com/)
* [Gatsby Adapter](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/adapters/) 기능 사용
* 관련 설정: [gatsby-config.ts](./gatsby-config.ts) - `gatsby-adapter-netlify`
* [연결 깃헙 저장소](https://github.com/designmeme/personal-website)의 `deploy` 브랜치가 업데이트 되면 자동으로 빌드 후 배포합니다.


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
  - 속성 생성(GTM 활용해 인증) 및 사이트맵 제출 완료
  - 속성 생성 후 도메인이 변경되면 속성이 변경되기 때문에 새로 생성해야 함. 사이트 인증은 GTM 으로 자동 연결됨.

## License

Code released under [MIT License](./LICENSE.md)

모든 콘텐츠는 [Creative Commons BY-NC-ND 4.0 License](https://creativecommons.org/licenses/by-nc-nd/4.0/) 규정에 따라 이용할 수 있어요.
