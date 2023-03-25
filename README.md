# 👋 heyjihye

[Gatsby](https://www.gatsbyjs.com)를 바탕으로 만든 [개인 웹사이트](https://heyjihye.com)의 소스 코드를 담고 있어요

![Gatsby](https://img.shields.io/badge/Gatsby-%23663399.svg?style=for-the-badge&logo=gatsby&logoColor=white)

## 👩‍💻 Develop

### 로컬에서 개발하기

```shell
npm run develop
```

### Gatsby 참고

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

### Release

[Release Please](https://github.com/googleapis/release-please)를 사용해 CHANGELOG, 깃헙 릴리즈, 프로젝트 버전 등을 자동으로 처리합니다.

1. Commit messages: [Conventional Commits](https://www.conventionalcommits.org/) 규약에 맞는 커밋 메세지를 작성합니다.
    * Intellij IDEA Plugin: [Git Commit Template](https://plugins.jetbrains.com/plugin/9861-git-commit-template) 사용 추천

2. Auto Release:
    * 사용 기술: [Release Please](https://github.com/googleapis/release-please)
    * 구현: GitHub Action > [Release Please Action](https://github.com/google-github-actions/release-please-action)
    * 설정 파일: `/.github/workflows/release-please.yml`

## 🚀 Hosting

[Gatsby Cloud Hosting](https://www.gatsbyjs.com/dashboard) 서비스를
이용하며, [연결 깃헙 저장소](https://github.com/designmeme/personal-website)의 `main` 브랜치가 업데이트 되면 자동으로 빌드 후 배포합니다.

### 도메인 연결 및 관리

* URL: https://heyjihye.com
* 커스텀 도메인 설정: Gatsby Cloud 사이트 설정 페이지 > Hosting > Domains
* 도메인 구매: [가비아](https://www.gabia.com/)
* DNS 설정: [가비아 DNS 관리](https://dns.gabia.com/)
    * heyjihye.com 연결: DNS A 타입 레코드 추가 완료
    * www.heyjihye.com 연결: DNS CNAME 타입 레코드 추가 완료

## 🚀 Integrations

### SEO

작성전

### Analytics

작성전
