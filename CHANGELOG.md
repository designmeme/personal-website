# Changelog

## [1.16.0](https://github.com/designmeme/personal-website/compare/v1.15.0...v1.16.0) (2023-04-22)


### Features

* **ui:** 포스트 페이지의 제목 위에 주제 보여주기(breadcrumb 추가) ([71d22c3](https://github.com/designmeme/personal-website/commit/71d22c3190ff55889b5c2ab3bef7e3c2dbe020cc)), closes [#71](https://github.com/designmeme/personal-website/issues/71)
* **ui:** 포스트 하단 이전/다음 글에 다른 주제 그룹 글도 표기 ([d78e265](https://github.com/designmeme/personal-website/commit/d78e265d9a5a81b8ebd03fabcbd7fca675eee95a)), closes [#74](https://github.com/designmeme/personal-website/issues/74)


### Bug Fixes

* **contents:** siteMetadata 누락 정보 추가 및 setup 설명문 수정 ([1ff5ff4](https://github.com/designmeme/personal-website/commit/1ff5ff4d29254cba5667bd3b9b0e458e7fc46be4))
* **ui:** 푸터 저작권 글자 너무 큰 문제 수정 ([986d753](https://github.com/designmeme/personal-website/commit/986d753d412627189baf848cde44a3724f7ba5d1))
* 업데이트 일시 수정 ([b9744b9](https://github.com/designmeme/personal-website/commit/b9744b9068d73894c97969d3aeb99286d3b5f973))
* 피드에 일부 채널 하위 요소 사라진 문제 해결(siteMetadata 누락 정보 추가) ([d5d89d0](https://github.com/designmeme/personal-website/commit/d5d89d07e46f67129c480099403ecd5451c0f234))

## [1.15.0](https://github.com/designmeme/personal-website/compare/v1.14.0...v1.15.0) (2023-04-21)


### Features

* **contents:** Gatsby RSS 피드 링크 추가 ([74a1b52](https://github.com/designmeme/personal-website/commit/74a1b524028f27062d0d2396a2aeb483054709a0))
* **contents:** 새 포스트 "RSS 피드 추가하기" 추가 ([b95d14e](https://github.com/designmeme/personal-website/commit/b95d14e30ea617515ef94182348a4bec9f35ee0d))


### Bug Fixes

* SSR 결과물에 글 메타 정보, ToC 등 미디어쿼리 조건부 내용이 들어가지 않는 문제 해결 ([2638659](https://github.com/designmeme/personal-website/commit/26386593d40465ad63aa2b1dcea08362f5e607b7))

## [1.14.0](https://github.com/designmeme/personal-website/compare/v1.13.0...v1.14.0) (2023-04-21)


### Features

* **ui:** 구글 애드센스 광고 차단 회복 기능 추가 ([20263df](https://github.com/designmeme/personal-website/commit/20263df58597950c07740ea807e7b75266b71f0b)), closes [#49](https://github.com/designmeme/personal-website/issues/49)
* **ui:** 블로그 하단에 구글 애드센스 광고 추가 ([165348c](https://github.com/designmeme/personal-website/commit/165348cd3b3a6dd7f626caea738f6232effce8fe)), closes [#56](https://github.com/designmeme/personal-website/issues/56)
* **ui:** 포스트 하단에 구글 애드센스 광고 추가 ([18f775a](https://github.com/designmeme/personal-website/commit/18f775a668556224a41d69eaa3358fefa5588f0f)), closes [#56](https://github.com/designmeme/personal-website/issues/56)

## [1.13.0](https://github.com/designmeme/personal-website/compare/v1.12.0...v1.13.0) (2023-04-20)


### Features

* 구글 애드센스 설정 프로퍼티 추가 ([44f303b](https://github.com/designmeme/personal-website/commit/44f303b6c9f0c6a15fdeb3d378637a05710757c0))


### Bug Fixes

* **ui:** 헤딩 숫자가 너무 눈에 띄지 않게 스타일 추가 ([a2fd57b](https://github.com/designmeme/personal-website/commit/a2fd57bb3653f73e8aa566c121dfbb14a18caeeb))
* 이력서 내용의 태그가 그대로 텍스트로 노출되는 오류 수정 ([32762c7](https://github.com/designmeme/personal-website/commit/32762c729151fb042589ccb69fe41c453a937fa5))
* 포스트 페이지의 광고 주변 마진 수정 ([a78888e](https://github.com/designmeme/personal-website/commit/a78888e32c34aa98d5478c2aba435c110f3c223a))

## [1.12.0](https://github.com/designmeme/personal-website/compare/v1.11.0...v1.12.0) (2023-04-19)


### Features

* 피드의 guid 형식 변경 ([adf9580](https://github.com/designmeme/personal-website/commit/adf9580762dae9d3ee1b6ac6abad1dccb7b2f090))

## [1.11.0](https://github.com/designmeme/personal-website/compare/v1.10.0...v1.11.0) (2023-04-18)


### Features

* **contents:** Media RSS 네임스페이스 정보 추가 ([0f55224](https://github.com/designmeme/personal-website/commit/0f552249921264c7206f5c1b4a85fed08096d213))
* **contents:** 새 블로그 주제 "Gatsby 웹사이트 개발" 추가 ([13c0141](https://github.com/designmeme/personal-website/commit/13c0141b3dacf0ee33bc354f49c1e9ad77ffc04c))
* feed 문서 링크에 utm 정보 추가 ([8e958af](https://github.com/designmeme/personal-website/commit/8e958af905c6288fc88ffad012ee423c7c6fae87))
* MdxFrontmatter 속성 images 를 image 로 변경 ([3961074](https://github.com/designmeme/personal-website/commit/3961074481a77b05af1d2634f224e9e52468e902))
* **ui:** SeoHead 컴포넌트에 useSiteTitle 프로퍼티 추가 ([9cc0019](https://github.com/designmeme/personal-website/commit/9cc0019e9e90594b9184608e4c83935341a8c057))
* 저작권 년도를 기간으로 표기 ([14c480e](https://github.com/designmeme/personal-website/commit/14c480ed61bf38ab3e3ab8738de8d281522eb1d2))
* 피드 리더에서 대표 이미지 안보이는 문제 수정 ([26bc7c4](https://github.com/designmeme/personal-website/commit/26bc7c48025b6785c9a27c493c5143500f5d2b77)), closes [#64](https://github.com/designmeme/personal-website/issues/64)
* 피드에 media:title 요소 추가 ([c70cbbf](https://github.com/designmeme/personal-website/commit/c70cbbf5f822c60e5f84216a07212a0eca047d23))


### Bug Fixes

* **contents:** author 값으로 한글 이름만 표기 ([e1f83da](https://github.com/designmeme/personal-website/commit/e1f83dae621425989cc4243c1ab754e58e0a0779))
* subtitle 없을 때 이미지 alt 값 잘못 설정되는 문제 해결 ([232b834](https://github.com/designmeme/personal-website/commit/232b8346b756805e1b2aad6e8f6ba9349f5204a0))
* 소개, 블로그 페이지의 title 값 수정 ([db1bd6c](https://github.com/designmeme/personal-website/commit/db1bd6c08992c6ae6022050bbbbdfb3b0b6ed08c))

## [1.10.0](https://github.com/designmeme/personal-website/compare/v1.9.0...v1.10.0) (2023-04-17)


### Features

* **ui:** 넓은 화면에서 오른쪽 사이드바에 ToC 표시 ([67fb5ec](https://github.com/designmeme/personal-website/commit/67fb5ec12842593adf9fa79aaf96c66df49d35ca))
* **ui:** 목차 영역에 제목 표기 ([d1eae99](https://github.com/designmeme/personal-website/commit/d1eae9960b7b57d61feed5edc54aa9dd339f6e1d))
* **ui:** 스크롤에 따라 목차 아이템에 활성 스타일 표시하기 ([e359c67](https://github.com/designmeme/personal-website/commit/e359c678649b7fea135b1afa582b9ecc8d8fde68)), closes [#60](https://github.com/designmeme/personal-website/issues/60)
* **ui:** 포스트 목차 및 제목에 섹션 번호 붙이기 ([974f6ea](https://github.com/designmeme/personal-website/commit/974f6eafca359a2539b4757d1cc2ec4c22945e86))


### Bug Fixes

* gatsby-remark-images 이미지의 높이 설정 안되는 문제 해결 ([f055622](https://github.com/designmeme/personal-website/commit/f055622f0a8857c0b1e65512e3a49eb034ce4a90))
* gatsby-remark-prismjs 사용시 해당 div 요소를 span 으로 감싸는 문제 해결 ([8981e0b](https://github.com/designmeme/personal-website/commit/8981e0b32a68e726a9f6e8d13790a6e3c6263951))
* **ui:** 포스트에서 헤딩을 순서대로 사용하도록 수정 ([6c00d26](https://github.com/designmeme/personal-website/commit/6c00d26e283fe344694ff663a43920da29b8c238))
* 포스트 대표 이미지에 alt 속성 추가 ([b800de4](https://github.com/designmeme/personal-website/commit/b800de4797a598a8c060bf1bfb724b04f35bf5a3))

## [1.9.0](https://github.com/designmeme/personal-website/compare/v1.8.0...v1.9.0) (2023-04-16)


### Features

* **contents:** 새 포스트 'RSS 피드' 추가 ([b10bbee](https://github.com/designmeme/personal-website/commit/b10bbee340ac2ae25d11920587368d8f1a7c3c10))
* **ui:** 포스트 페이지의 이미지 캡션 위치를 이미지 아래로 변경 ([acf1ac8](https://github.com/designmeme/personal-website/commit/acf1ac8e6f066b6e3c7cd3f6cc2b69c20b7a198f))


### Bug Fixes

* **contents:** 테스트를 위한 피드 파일 의 link 요소 추가 ([0fb79af](https://github.com/designmeme/personal-website/commit/0fb79af9d2bf2f5a32a43ad09889644d455d7b88))
* creativeCommons:license 요소를 채널 하위로 이동 ([612d7a7](https://github.com/designmeme/personal-website/commit/612d7a752259b683f6e58ded0ee34825b924afd2))
* link 태그 닫기 ([3e691a7](https://github.com/designmeme/personal-website/commit/3e691a7010312cfcd5b13e4cc33a4f19f4f654e6))

## [1.8.0](https://github.com/designmeme/personal-website/compare/v1.7.0...v1.8.0) (2023-04-13)


### Features

* **contents:** 저작권 라이센스를 BY-NC-ND 4.0로 변경 ([f7c2189](https://github.com/designmeme/personal-website/commit/f7c218907939edf9bff5a24b6acc186c279bfda6))
* **contents:** 테스트를 위한 피드 파일 추가 ([fde4b2b](https://github.com/designmeme/personal-website/commit/fde4b2b3a62c8c1de1c71d2700fa67dd035b2469))
* **ui:** CC 아이콘 이미지를 FontAwesome 폰트로 변경 ([3a2fcc4](https://github.com/designmeme/personal-website/commit/3a2fcc4d3df9b107d12cd93a864987cde1d9e277))


### Bug Fixes

* **contents:** 저작권 라이센스를 BY-NC-ND 4.0로 변경 누락 추가 ([bd21667](https://github.com/designmeme/personal-website/commit/bd21667b0a2ed97ce1ccb8d0b0e9e4a528b70654))
* gatsby-plugin-mdx 지원 확장자에서 .md 삭제 ([72b52f8](https://github.com/designmeme/personal-website/commit/72b52f88a38dec54ed01db24fee3b6ad568540e3))
* update packages ([31aacaf](https://github.com/designmeme/personal-website/commit/31aacafc435a7c0d093b84915a7252b0cf22c94e)), closes [#46](https://github.com/designmeme/personal-website/issues/46)
* 저작권 표기법에 따라 문구 수정 ([76e4ca3](https://github.com/designmeme/personal-website/commit/76e4ca3615405f32d6ea82ce2e40e296c301f2c6))

## [1.7.0](https://github.com/designmeme/personal-website/compare/v1.6.0...v1.7.0) (2023-04-09)


### Features

* **ui:** 포스트 네비게이션에서 부제목도 클릭 가능하도록 개선 ([9539b26](https://github.com/designmeme/personal-website/commit/9539b26340ab3e77b91e78a8a21930c797a46fd1)), closes [#30](https://github.com/designmeme/personal-website/issues/30)
* 포스트 페이지에 구조화된 탐색경로(BreadcrumbList) 데이터 추가 ([23cadeb](https://github.com/designmeme/personal-website/commit/23cadebe18a5a1b0f2d459f9e87a3071f99ba949)), closes [#7](https://github.com/designmeme/personal-website/issues/7)


### Bug Fixes

* canonical 주소와 동일하게 url 마지막에 / 추가함 ([8f70e30](https://github.com/designmeme/personal-website/commit/8f70e30d08a86379d220ba171744ce2fa5bda74f))

## [1.6.0](https://github.com/designmeme/personal-website/compare/v1.5.1...v1.6.0) (2023-04-08)


### Features

* 분석도구 Statcounter 관련 코드 삭제(불필요) ([3244746](https://github.com/designmeme/personal-website/commit/3244746c36477423866a4045f21a01c59894e960)), closes [#31](https://github.com/designmeme/personal-website/issues/31)

## [1.5.1](https://github.com/designmeme/personal-website/compare/v1.5.0...v1.5.1) (2023-04-07)


### Bug Fixes

* RSS creativeCommons 네임스페이스의 주소 수정 ([84c4c52](https://github.com/designmeme/personal-website/commit/84c4c52bcbf1c659439a3defa1378bcd51c53440))

## [1.5.0](https://github.com/designmeme/personal-website/compare/v1.4.0...v1.5.0) (2023-04-07)


### Features

* RSS 아이템에 category 항목 추가 ([a88321d](https://github.com/designmeme/personal-website/commit/a88321dd620fa92fdbf1b2660b5f803e1f69c23c))
* RSS 아이템에 creativeCommons:license 항목 추가 ([13dd401](https://github.com/designmeme/personal-website/commit/13dd4015378c9f8758165d6e2ae5b1d2fa82541c))
* RSS 채널에 atom:link 항목 추가 ([b9c493c](https://github.com/designmeme/personal-website/commit/b9c493ce91b3573e82284812ad1db3fb6a68648d))
* RSS 채널에 카테고리 항목 추가 ([fc05e95](https://github.com/designmeme/personal-website/commit/fc05e95d3cd5738c29b7a512509e751763640040))

## [1.4.0](https://github.com/designmeme/personal-website/compare/v1.3.0...v1.4.0) (2023-03-31)


### Features

* **contents:** Sass 관련 포스트의 태그 정보 개선 ([eadf656](https://github.com/designmeme/personal-website/commit/eadf6567676dbf53f70bdaf97c09eefa50d2f461))
* **contents:** 새 주제 '초보 개발자를 위한 핵심정리' 추가 ([b0edd54](https://github.com/designmeme/personal-website/commit/b0edd5498de04993ad2476405a39cc91fd6c78a9))
* **ui:** 포스트 태그 정보를 화면에 표시 [#24](https://github.com/designmeme/personal-website/issues/24) ([112b7bc](https://github.com/designmeme/personal-website/commit/112b7bc0731aabab321227cb7f9457034640bac6))
* **ui:** 포스트가 없는 주제에 작성 중임을 알려주기 ([0750f2a](https://github.com/designmeme/personal-website/commit/0750f2a3124e4c770ccf9d5b347e531855580801))


### Bug Fixes

* **contents:** 이력서 페이지의 title 값 수정(중복 내용 삭제) ([1fe200b](https://github.com/designmeme/personal-website/commit/1fe200b85419650b4b5d709e8fa96bc1d8c62013))
* react key 에러 수정 ([069b597](https://github.com/designmeme/personal-website/commit/069b597966213177f3ec3b08228f0c60ae84423a))

## [1.3.0](https://github.com/designmeme/personal-website/compare/v1.2.1...v1.3.0) (2023-03-29)


### Features

* **contents:** 블로그 페이지 설명 수정 ([0b3294a](https://github.com/designmeme/personal-website/commit/0b3294a0e873530485c3b4c277e14f394aa2e8c8))
* RSS feed 파일 생성 기능 추가 ([7942b7a](https://github.com/designmeme/personal-website/commit/7942b7aa946e73f29f2acf8a353c6e097242c051))
* 사이트 하단 링크의 title, text 문구 개선 ([77f5cdf](https://github.com/designmeme/personal-website/commit/77f5cdf7488950154268232b2d2c60f824ed5bfb))
* 사이트 하단에 RSS 피드 버튼 추가 ([2be8c52](https://github.com/designmeme/personal-website/commit/2be8c52355b64490864ebce351ac4c9b4e7b2008))
* 포스트 페이지에 RSS 피드 버튼 추가 ([ad70164](https://github.com/designmeme/personal-website/commit/ad70164c57b3559e2f16fa358608e3ba94368c19))
* 포스트 페이지에서 히어로 이미지, 목차, 광고의 노출 순서 개선 ([f630c6f](https://github.com/designmeme/personal-website/commit/f630c6f61431e21b6e2d410d7ce544b3f9fe4817))


### Bug Fixes

* **ui:** 포스트 사이드바 메뉴 주제가 2개 이상일 때 현재 주제가 구분 안되는 문제 수정 ([d5d5751](https://github.com/designmeme/personal-website/commit/d5d5751dbc5129d90075c566ddbfff22bdec6e6d))
* **ui:** 포스트 사이드바 메뉴가 최하단까지 안따라오는 문제 수정 ([e512a0a](https://github.com/designmeme/personal-website/commit/e512a0a67991f06cb890252e314bcf0e1d799e35))
* **ui:** 포스트 사이드바 메뉴에서 제목이 비활성화 일때 클래스 잘못 생성되는 문제 해결 ([bcf1682](https://github.com/designmeme/personal-website/commit/bcf1682e5c2bc33c89ef7d44be83e120677a3de6))
* 미공개 포스트 삭제 ([d415070](https://github.com/designmeme/personal-website/commit/d415070ed89538531f079314e96912f8eeee51f3))
* 사이트 하단 로고가 화면 중앙을 벗어나는 문제 해결 ([6863724](https://github.com/designmeme/personal-website/commit/6863724f3f034901891b92eb01d5cdfe6a546057))
* 포스트 히어로 이미지가 안보이는 문제 해결 ([ed71a59](https://github.com/designmeme/personal-website/commit/ed71a59378b497f590dce8fcdb9090cd801369e0)), closes [#22](https://github.com/designmeme/personal-website/issues/22)

## [1.2.1](https://github.com/designmeme/personal-website/compare/v1.2.0...v1.2.1) (2023-03-27)


### Bug Fixes

* 디자인 가이드 페이지의 레이아웃 에러 수정 ([d6d5d36](https://github.com/designmeme/personal-website/commit/d6d5d364c86f4daf6c4f316bc9883e5e5993e785))

## [1.2.0](https://github.com/designmeme/personal-website/compare/v1.1.0...v1.2.0) (2023-03-27)


### Features

* **contents:** About 소개글 수정 ([34dab92](https://github.com/designmeme/personal-website/commit/34dab920af3efecffd92425b494d4bfba9d59374))
* **contents:** 블로그 소개글 수정 ([05a2990](https://github.com/designmeme/personal-website/commit/05a29906c9621f1edcf8ffd607347fbfedd2e749))
* 페이지에 메타정보 표시 ([37bdf92](https://github.com/designmeme/personal-website/commit/37bdf9213e99b35d28bb8a5abc41100adede951e))

## [1.1.0](https://github.com/designmeme/personal-website/compare/v1.0.0...v1.1.0) (2023-03-26)


### Features

* **contents:** 목차 섹션 삭제 ([e91dd6a](https://github.com/designmeme/personal-website/commit/e91dd6a3b12771d21ce593bb279caf8fb3001c54))

## 1.0.0 (2023-03-24)


### Bug Fixes

* fontawesome 아이콘이 매우 크게 표시된 후 작아지는 문제 해결 ([efa0d65](https://github.com/designmeme/personal-website/commit/efa0d6504692dbb44994b1dec176045450b93da3))
* fontawesome 아이콘이 매우 크게 표시된 후 작아지는 문제 해결2 ([9bccb76](https://github.com/designmeme/personal-website/commit/9bccb767d6bb2deef7ef3263ca64798d3caf4865))
* 구글 애드센스 안보이는 오류 수정 ([c9762cc](https://github.com/designmeme/personal-website/commit/c9762cc764559f20ce73e407771bb8c982e94d65))
