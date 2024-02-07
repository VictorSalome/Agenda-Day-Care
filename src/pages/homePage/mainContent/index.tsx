import React, { ReactNode } from 'react';

interface MainContentProps {
    children?: ReactNode; // Indica que children é uma propriedade opcional do tipo ReactNode
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
    return (
        <div className="h-screen flex-1 p-0.4">
            {children}
        </div>
    );
}

export default MainContent;
