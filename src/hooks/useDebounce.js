/*eslint-disable*/
import { useState, useEffect } from 'react'

let useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const handler = setTimeout(() => { setDebouncedValue(value) }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );

    return debouncedValue;
}

export default useDebounce;
/*eslint-enable*/