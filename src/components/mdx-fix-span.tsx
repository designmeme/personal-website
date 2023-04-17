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

interface Props {
    dangerouslySetInnerHTML: {
        __html: string
    }
}

const MdxFixSpan: React.FC<Props> = (props) => {
    if (props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html) {
        const html = props.dangerouslySetInnerHTML.__html

        // gatsby-remark-images 설정 -> wrapperStyle 에서 이미지 비율대로 높이를 잡음.
        // 피겨 이미지의 부모 요소에 flex 설정이 필요함.
        if (html.startsWith('<figure class="gatsby-resp-image-figure"')) {
            return <div style={{'display': 'flex'}} {...props}/>
        }
        // gatsby-remark-prismjs 사용시 해당 div 요소를 span 으로 감싸는 문제 해결용.
        else if (html.startsWith('<div class="gatsby-highlight"')) {
            return <div {...props}/>
        }
    }
    return <span {...props}/>
}

export default MdxFixSpan
