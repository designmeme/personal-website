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
import {OutboundLink} from "gatsby-plugin-google-gtag";
import {gaEvent} from "../hooks/analytics";
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
            data-link={`internal`}
            to={href}
            onClick={() => gaEvent('navigation', 'click_link_in_post', href)}
            children={children}
            {...rest}
            />
    }

    // 외부 프로토콜 경로
    if (externalProtocols.includes(protocol)) {
        // OutboundLink 자동으로 이벤트 트리거됨.
        // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-gtag/src/index.js
        return <OutboundLink className='outbound' href={href} rel="nofollow" target={'_blank'} {...rest}>
            {children}
            <span className="icon">
                <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" transform={'down-1'} />
                <span className="sr-only">(새창)</span>
            </span>
        </OutboundLink>
    }

    // 기타 경로
    return <a data-link={`etc`} href={href} children={children} {...rest} />
}

export default MdxLink
