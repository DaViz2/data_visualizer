import React, { useState } from 'react';

interface CircleProps {
    radius?: number;
    value?: number;

}

const Circle: React.FC<CircleProps> = ({radius = 16, value}) => {
    let [color, setColor] = useState('purple');

    function handleClick(){
        console.log('clicked');
        color='red';
    }

    return <div className={`w-32 h-32 bg-purple-500 rounded-full flex justify-center items-center`} onClick={()=>handleClick()}>{value}</div>;
}

export default Circle;