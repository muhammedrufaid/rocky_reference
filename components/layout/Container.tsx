import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div
            className={`mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 ${className}`}
        >
            {children}
        </div>
    );
};

export default Container;
