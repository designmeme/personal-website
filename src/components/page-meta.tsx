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
            <p className="post-meta">
                {updatedAt && (
                    <span className="modified">
                        <time dateTime={updatedAt}>
                            {moment(updatedAt).format('LL')}
                        </time> 수정
                    </span>
                )}

                {readMinutes && <span className="reading-time">
                    {readMinutes}-{Math.ceil(readMinutes * 1.3)}분 읽기
                </span>}
            </p>

            {tags && (
                <p className="post-tags">
                    <FontAwesomeIcon icon={faTags}/>{' '}
                    Tags:{' '}
                    {
                        // todo Link to Tag page
                        tags.map((tag, index) =>
                            <span key={`tag-${index}`}>
                                <span className={"tag"}>{tag}</span>
                                {index + 1 != tags.length && ", "}
                            </span>)
                    }
                </p>
            )}
        </>
    );
};

export default PageMeta;
