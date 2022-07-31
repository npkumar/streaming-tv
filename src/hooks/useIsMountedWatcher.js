import { useRef, useEffect } from 'react';

/**
 * React hook which returns a reference whose `current` value reflects whether
 * or not the component is still mounted or not.
 *
 * @return {Object}
 */
const useIsMountedWatcher = () => {
    const isMounted = useRef(true);
    useEffect(
        () => () => {
            isMounted.current = false;
        },
        []
    );
    return isMounted;
};

export default useIsMountedWatcher;
