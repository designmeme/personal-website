import './src/styles/main.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import {config} from '@fortawesome/fontawesome-svg-core'

// production build 에서 첫 사이트 진입시 fontawesome 아이콘이 매우 크게 표시된 후 작아지는 문제 해결용.
// autoAddCss 를 비활성화하고 fontawesome-svg-core/styles.css 를 직접 포함시킴.
// 참고: https://fontawesome.com/v5/docs/web/use-with/react#next-js
config.autoAddCss = false
