/*eslint-disable*/
import { useState, useEffect } from 'react'

let useComponentSize = (ref) => {
    let [size, setSize] = useState({ width: 0, height: 0 })
    useEffect(() => {
        setSize({ width: ref.current.scrollWidth, height: ref.current.scrollHeight, })
    }, [ref])
    return size
}

export default useComponentSize;
/*eslint-enable*/