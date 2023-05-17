import React, {useEffect, useInsertionEffect, useState} from 'react';
import {Link} from "gatsby";

interface Item {
    url?: string
    title?: string
    items?: Item[]
}

type TocListProps = {
    toc: Item
    activeId: string
    depth?: number
}

type Props = {
    toc: Item
    title: string
    useScrollActive?: boolean
}

const TocList: React.FC<TocListProps> = ({toc, activeId, depth = 0}) => {
    depth++

    return (
        <>
            {toc.items?.length && toc.items[0].url ? (
                <ol>
                    {toc.items?.map((item, index) => {
                        // 현재 화면에 보이는 헤딩과 동일한 목차 앵커에 활성화 클래스를 추가한다.
                        const tocId = item.url?.slice(1)  // 맨앞 # 제외한 id만 추출
                        const activeClass = tocId === activeId ? ' active' : ''

                        return (
                            <li key={index}>
                                {item.url && <Link
                                    to={item.url}
                                    className={`toc-link${activeClass}`}
                                >{item.title}</Link>}
                                {item.items && <TocList toc={item} activeId={activeId} depth={depth}/>}
                            </li>
                        )
                    })}
                </ol>
            ) :  toc.items?.map((item, index) => (
                <TocList toc={item} activeId={activeId} depth={depth} key={index}/>
            ))}
        </>
    );
};

const Toc: React.FC<Props> = ({toc, title, useScrollActive = true}) => {

    // 본문 헤딩이 화면에 표시된 경우 해당 ToC 앵커에 active 클래스를 추가한다.
    const [activeId, setActiveId] = useState('')

    // useScrollActive가 true인 경우만 - 본문 상단에 ToC가 노출되는 좁은 화면에서는 불필요하다.
    useScrollActive && useEffect(() => {
        try {
            // 포스트 제목인 h1을 제외한 모든 헤딩이 대상
            const headings = document.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]')
            const firstHeading = headings[0]
            let previousY = 0  // 스크롤 방향을 파악하기 위해 스크롤 위치를 저장한다.
            const callback: IntersectionObserverCallback = entries => {
                entries.forEach(entry => {
                    const currentY = window.scrollY
                    const isScrollDown = currentY > previousY  // 아래로 스크롤하는지 여부

                    // 헤딩이 화면에 표시된 경우 activeId 로 지정한다.
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    } else if (entry.target.id == firstHeading.id && !isScrollDown) {
                        // 화면에서 가장 첫 헤딩위로 스크롤이 올라간 경우
                        setActiveId('')
                    }

                    previousY = currentY
                })
            }
            const options = {
                // root: document.querySelector('#scrollArea'),
                rootMargin: '0px 0px -70% 0px',  // 화면의 최상단~30% 위치에 있는 경우
                threshold: 1,  // 전체가 보여야 함.
            }
            const observer = new IntersectionObserver(callback, options)
            headings.forEach((heading) => observer.observe(heading))

            return () => observer.disconnect();
        } catch (error) {
            console.error(error)
        }
    }, [toc]);

    return (
        <>
            {toc.items && (
                <div className={`markdown-toc`}>
                    <Link
                        to={'.'}
                        className={`toc-title ${activeId == '' ? 'active': ''}`}
                    >목차: {title}</Link>
                    <TocList toc={toc} activeId={activeId}/>
                </div>
            )}
        </>
    );
};

export default Toc;
