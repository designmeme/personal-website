/**
 * MDX 내 불필요하게 span 태그로 감싼 경우 알맞게 변환하는 컴포넌트
 *
 * 사용법
 * <MDXProvider
 *     components={[
 *       {
 *         span: (props: any) => <MdxFixSpan {...props} />,
 *       },
 *     ]}
 *   >
 *     {children}
 *   </MDXProvider>
 */

import React from 'react';

type Props = React.ComponentPropsWithoutRef<'span'>

const MdxFixSpan: React.FC<Props> = (props) => {
    const html = props.dangerouslySetInnerHTML?.__html
    if (typeof html === 'string' && html) {

        // gatsby-remark-images 설정 -> wrapperStyle 에서 이미지 비율대로 높이를 잡음.
        // 피겨 이미지의 부모 요소에 flex 설정이 필요함.
        if (html.startsWith('<figure class="gatsby-resp-image-figure"')) {
            return <div style={{'display': 'flex'}} {...props}/>
        }
    }

    // rehype-pretty-code - tailwind typography 스타일 충돌 방지
    if (props.hasOwnProperty('data-rehype-pretty-code-figure')) {
        return <span {...props} className={['not-prose', props.className].filter(Boolean).join(' ')} />
    }

    return <span {...props}/>
}

export default MdxFixSpan
