import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faDisplay,
    faMobileScreenButton,
    faStar,
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
    if (null == date) {
        return '현재'
    }
    const [year, month] = date.split('-').map(d => +d)
    return `${year}년 ${month}월`
}

const CareerList: React.FC<Props> = ({data}) => {
    return (
        <ol className="text-sm">
            {data.map((career, index) => (
                <li key={index.toString()} className="mb-6 pl-4">
                    <div className={`text-base -ml-4 font-medium`}>
                        {career.featured && <FontAwesomeIcon icon={faStar} className="mr-1 text-sm text-brand"/>}
                        {career.title}
                    </div>
                    <div className="mt-1 text-xs font-extralight text-secondary">
                        <span className="career-date">
                            <time dateTime={career.date[0] + '-01'}>{dateToText(career.date[0])}</time>
                            {" - "}
                            <time dateTime={career.date[1] + '-01'}>{dateToText(career.date[1])}</time>
                            {career.date.length >= 3 && <span className="ml-1">· {career.date[2]}</span>}
                        </span>

                        {career.client && (
                            <>
                                &middot; <span title="Client">{career.client}</span>
                            </>
                        )}

                        {career.tags && (
                            <>
                                &middot; <span className="*:text-muted">
                                {career.tags.map((tag: string, j: number) => (
                                    <React.Fragment key={j.toString()}>
                                        {tag === 'mobile' && <FontAwesomeIcon icon={faMobileScreenButton}/>}
                                        {tag === 'tablet' && <FontAwesomeIcon icon={faTabletScreenButton}/>}
                                        {tag === 'desktop' && <FontAwesomeIcon icon={faDisplay}/>}
                                        {tag === 'universal-access' && <FontAwesomeIcon icon={faUniversalAccess}/>}
                                        <span className="sr-only">{tag == "universal-access" ? 'web accessibility' : tag}</span>
                                    </React.Fragment>
                                ))}
                                </span>
                            </>
                        )}
                    </div>

                    {career.description && <div className="text-sm whitespace-pre-wrap mt-1.5" dangerouslySetInnerHTML={{__html: career.description}}></div>}

                    {career.urls?.map((url: string, i: number) =>
                        <div className={`break-all text-xs ${!i && 'mt-1.5'}`} key={i}>
                            <a href={url} target="_blank" title="새창">{url}</a>
                        </div>)}
                </li>
            ))}
        </ol>
    );
};

export default CareerList;
