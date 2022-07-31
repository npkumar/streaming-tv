import { useEffect, useState } from 'react';

export const SM = 320;
export const MD = 730;
export const LG = 1140;

const useIsBreakpoint = (size) => {
    const [isGreaterThanSize, setIsGreaterThanSize] = useState(window.innerWidth >= size);

    useEffect(() => {
        const handleResize = () => setIsGreaterThanSize(window.innerWidth >= size);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [size]);

    return isGreaterThanSize;
};

export default useIsBreakpoint;
