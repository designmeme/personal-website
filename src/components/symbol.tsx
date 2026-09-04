import React from "react";

type Props = {
    className?: string
}

const Symbol: React.FC<Props> = ({className}) => {
    return (
        <span className={`text-right block w-max min-w-max leading-none text-brand font-bold tracking-[.05em] ${className ?? ''}`}>
            <span className="block">hey</span>jihye
        </span>
    )
}

export default Symbol;
