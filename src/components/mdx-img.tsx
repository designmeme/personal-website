import React from 'react'

type Props = {
    src: string
    alt: string
    dangerouslySetInnerHTML: {
        __html: string
    }
}

/**
 * gatsby-remark-images 플러그인이 처리하지 않는 gif 이미지를 figure 구조로 변환하는 컴포넌트
 * @param src
 * @param alt
 * @param props
 * @constructor
 */
const MdxImg:React.FC<Props> = ({src, alt, ...props}) => {
    return (
        <figure>
            <a href={src} target="_blank" rel="noopener" style={{display: 'block'}}>
                <img src={src} alt={alt} style={{display: 'block', margin: '0 auto'}} {...props}/>
            </a>
            <figcaption>{alt}</figcaption>
        </figure>
    )
};

export default MdxImg
