'useClient'

import React, { useRef, useState } from 'react';

interface DraggableWrapperProps {
    children: React.ReactNode;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const offsetXRef = useRef<number>(0);
    const offsetYRef = useRef<number>(0);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        offsetXRef.current = event.clientX - wrapperRef.current!.offsetLeft;
        offsetYRef.current = event.clientY - wrapperRef.current!.offsetTop;
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const wrapper = wrapperRef.current!;
        const left = event.clientX - offsetXRef.current;
        const top = event.clientY - offsetYRef.current;
        wrapper.style.left = `${left}px`;
        wrapper.style.top = `${top}px`;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={wrapperRef}
            style={{ position: 'absolute' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {children}
        </div>
    );
};

export default DraggableWrapper;