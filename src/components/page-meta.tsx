import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faTags} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

type Props = {
    updatedAt?: string | null
    readMinutes?: number | null
    tags?: readonly string[] | null
}

const PageMeta: React.FC<Props> = ({updatedAt, readMinutes, tags}) => {
    return (
        <>
            <p className="ml-[2px] flex gap-2 text-secondary text-xs">
                {updatedAt && (
                    <span>
                        <time dateTime={updatedAt}>
                            {moment(updatedAt).format('LL')}
                        </time> 수정
                    </span>
                )}

                {updatedAt && readMinutes != null && readMinutes > 0 && <span aria-hidden="true" className="opacity-50">|</span>}

                {readMinutes != null && readMinutes > 0 && <span>
                    {readMinutes}-{Math.ceil(readMinutes * 1.3)}분 읽기
                </span>}

                {tags && tags.length > 0 && (
                    <>
                    <span aria-hidden="true" className="opacity-50">|</span>

                    <span>
                        태그:{' '}
                        {
                            // todo Link to Tag page
                            tags.map((tag, index) =>
                                <span key={`tag-${index}`}>
                                    {tag}
                                    {index + 1 != tags.length && ", "}
                                </span>)
                        }
                    </span>
                    </>
                )}
            </p>

        </>
    );
};

export default PageMeta;
