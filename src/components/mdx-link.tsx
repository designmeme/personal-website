/**
 * 마크다운 내 a 태그를 경로에 맞춰 알맞게 변환하는 컴포넌트
 *
 * 사용법
 * <MDXProvider
 *     components={[
 *       {
 *         a: (props) => <MdxLink {...props} />,
 *       },
 *     ]}
 *   >
 *     {children}
 *   </MDXProvider>
 *
 *   참고 소스 출처: https://zslabs.com/articles/mdx-link-routing-in-gatsby
 */

import React from 'react';
import {Link} from 'gatsby'

interface Props {
    href: string
}

const MdxLink: React.FC<Props> = ({ href, ...rest }: Props) => {
    const externalProtocols = ['http', 'https', 'mailto']
    const protocol = href.slice(0, href.indexOf(':'))

    // 내부 경로
    if (href.startsWith('/')) {
        return <Link data-link={`internal`} to={href} {...rest} />
    }

    // 외부 프로토콜 경로
    if (externalProtocols.includes(protocol)) {
        return <a data-link={`external`} href={href} rel="nofollow" target={'_blank'} {...rest} />
    }

    // 기타 경로
    return <a data-link={`etc`} href={href} {...rest} />
}

export default MdxLink
