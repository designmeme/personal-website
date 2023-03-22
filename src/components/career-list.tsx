import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faDisplay,
    faMobileScreenButton,
    faTabletScreenButton,
    faUniversalAccess
} from "@fortawesome/free-solid-svg-icons";

interface Career {
    title: string
    date: [string, string]
    description?: string
    client?: string
    urls?: string[]
    tags?: string[]
    featured?: boolean
}

type Props = {
    data: (Career | any)[]
}

const dateToText = (date: string): string => {
    if (date === 'present') {
        return '현재'
    }
    const [year, month] = date.split('-').map(d => +d)
    return `${year}년 ${month}월`
}

const CareerList: React.FC<Props> = ({data}) => {
    return (
        <dl className="career-list">
            {data.map(career => (
                <>
                    <dt className={`career-title ${career.featured && 'featured'}`}>{career.title}</dt>
                    <dd className="career-meta">
                        <span className="career-date">
                            <time dateTime={career.date[0] + '-01'}>{dateToText(career.date[0])}</time>
                            {" - "}
                            <time dateTime={career.date[1] + '-01'}>{dateToText(career.date[1])}</time>
                        </span>

                        {career.client && (
                            <>
                                &middot; <span className="career-client" title="Client">{career.client}</span>
                            </>
                        )}

                        {career.tags && (
                            <>
                                &middot; <span className="career-tags">
                                {career.tags.map((tag: string) => (
                                    <>
                                        {tag === 'mobile' && <FontAwesomeIcon className="icon" icon={faMobileScreenButton} />}
                                        {tag === 'tablet' && <FontAwesomeIcon className="icon" icon={faTabletScreenButton} />}
                                        {tag === 'desktop' && <FontAwesomeIcon className="icon" icon={faDisplay} />}
                                        {tag === 'universal-access' && <FontAwesomeIcon className="icon" icon={faUniversalAccess} />}
                                        <span className="sr-only">{tag == "universal-access" ? 'web accessibility' : tag}</span>
                                    </>
                                ))}
                                </span>
                            </>
                        )}
                    </dd>

                    {career.description && <dd className="career-description">{career.description}</dd>}

                    {career.urls?.map((url: string) =>
                        <dd className="career-url"><a href={url} target="_blank" title="새창">{url}</a></dd>)}
                </>
            ))}
        </dl>
    );
};

export default CareerList;
