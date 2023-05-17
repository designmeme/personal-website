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

import React, {ReactNode} from 'react';
import {Link} from 'gatsby'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

interface Props {
    href: string
    children: ReactNode
}

const MdxLink: React.FC<Props> = ({ href, children, ...rest }: Props) => {
    const externalProtocols = ['http', 'https', 'mailto']
    const protocol = href.slice(0, href.indexOf(':'))

    // 내부 경로
    if (href.startsWith('/')) {
        return <Link
            to={href}
            className="link-internal"
            children={children}
            {...rest}
            />
    }

    // 외부 프로토콜 경로
    if (externalProtocols.includes(protocol)) {
        return <a className='outbound' href={href} rel="nofollow" target={'_blank'} {...rest}>
            {children}
            <span className="icon">
                <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" transform={'down-1'} />
                <span className="sr-only">(새창)</span>
            </span>
        </a>
    }

    // 기타 경로
    return <a className="link-etc" href={href} children={children} {...rest} />
}

export default MdxLink
