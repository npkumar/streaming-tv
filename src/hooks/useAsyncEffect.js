import { useLayoutEffect, useRef } from 'react';
import useAsyncCallback from './useAsyncCallback';

const swallowRejection = () => {
    // It's expected that the user will handle the 'error' state declaratively.
};

const promisePlaceholder = new Promise(() => {});

const useAsyncEffect = (callback, options) => {
    const hasBeenCalledOnce = useRef(false);
    const [cb, result, error, isLoading] = useAsyncCallback(callback, options);

    useLayoutEffect(() => {
        hasBeenCalledOnce.current = true;
        cb().catch(swallowRejection);
    }, [cb]);

    // For async effects, we want to force them to already be in a 'loading' state from
    // the beginning. Therefore if useLayoutEffect hasn't run yet, then return a placeholder promise.
    const nextResult = hasBeenCalledOnce.current ? result : promisePlaceholder;
    const nextIsLoading = hasBeenCalledOnce.current ? isLoading : true;

    return [nextResult, error, nextIsLoading, cb];
};

export default useAsyncEffect;
