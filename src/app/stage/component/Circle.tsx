import React from 'react';

interface CircleProps {
    radius?: number;
    value?: number;
}

const Circle: React.FC<CircleProps> = ({radius = 16, value}) => {

    return <div className={`w-32 h-32 bg-purple-500 rounded-full flex justify-center items-center`}>{value}</div>;
}

export default Circle;