import React from 'react';

interface CircleProps {
    radius?: number;
    color?: string;
}


const Circle: React.FC<CircleProps> = ({ radius = 10, color = 'red' }) => {
    const circleStyle: React.CSSProperties = {
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        backgroundColor: color,
    };


    return <div style={circleStyle}></div>;
};


export default Circle;