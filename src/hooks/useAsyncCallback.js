import { useRef, useState, useCallback } from 'react';
import useIsMountedWatcher from './useIsMountedWatcher';

const defaultState = { error: null, loading: false, result: null };
const isPromise = (result) => Promise.resolve(result) === result;

const useAsyncCallback = (callback, options) => {
    const { keepResultBetweenCalls = false } = options || {};
    const lastResult = useRef();
    const lastCallback = useRef();
    const [state, setState] = useState(defaultState);
    const isMountedRef = useIsMountedWatcher();

    // Save a reference the last known callback. This allows us to check later if the
    // promise which resolved is still the most recent one.
    lastCallback.current = callback;

    const handler = useCallback(
        async (...args) => {
            const request = callback(...args);

            if (isPromise(request)) {
                setState({ error: null, loading: true, result: request });
            }

            try {
                const result = await request;
                // Only update the state if we're still mounted and this callback is the most recent
                // callback which was registered for this component.
                const isCallbackStillRelevant = isMountedRef.current === true && lastCallback.current === callback;

                if (isCallbackStillRelevant) {
                    lastResult.current = result;
                    setState({ error: null, loading: false, result: result });
                }
            } catch (error) {
                const isCallbackStillRelevant = isMountedRef.current === true && lastCallback.current === callback;

                if (isCallbackStillRelevant) {
                    lastResult.current = null;
                    setState({ error: error, loading: false, result: null });
                    throw error;
                }
            }
            return request;
        },
        [callback, isMountedRef]
    );

    // If we're loading and already have a result previously, then pass that previous result back.
    // This allows the consumer to keep the previous result on screen while fetching a new one.
    const shouldReturnLastResult = keepResultBetweenCalls && state.loading && lastResult.current !== undefined;
    const result = shouldReturnLastResult ? lastResult.current : state.result;

    return [handler, result, state.error, state.loading];
};

export default useAsyncCallback;
