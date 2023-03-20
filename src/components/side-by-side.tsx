import React from 'react';

interface SideBySideProps {
    children: React.ReactNode
}

const SideBySide: React.FC<SideBySideProps> = ({children}) => {
    return (
        <em className="side-by-side">{children}</em>
    );
};

export default SideBySide;
