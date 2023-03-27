import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

type Props = {
    createdAt: string | null
    updatedAt: string | null
    readMinutes?: number
}

const PageMeta: React.FC<Props> = ({createdAt, updatedAt, readMinutes}) => {
    return (
        <>
            <p className="post-meta">
                {createdAt && <span className="date">
                    <time dateTime={createdAt}>
                        {moment(createdAt).format('LL')}
                    </time> 작성
                    {!updatedAt && '함'}
                </span>}
                {updatedAt && (
                    <span className="modified">
                        <time dateTime={updatedAt}>
                            {moment(updatedAt).format('LL')}
                        </time> 수정함
                    </span>
                )}

                {readMinutes && <span className="reading-time">
                    <FontAwesomeIcon icon={faBook}/>
                    {readMinutes}-{Math.ceil(readMinutes * 1.3)}분 읽기
                </span>}
            </p>
        </>
    );
};

export default PageMeta;
