import React from 'react';

type Props = {
    children: React.ReactNode
}

const SideBySide: React.FC<Props> = ({children}) => {
    return (
        <em className="side-by-side">{children}</em>
    );
};

export default SideBySide;
