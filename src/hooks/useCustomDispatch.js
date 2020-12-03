/*eslint-disable*/
import { useEffect } from 'react'

let useCustomDispatch = (key, handler) => {
    useEffect(() => {
        window.addEventListener(key, handler)
        return (() => {
            window.removeEventListener(key, handler)
        })
    })
}

export default useCustomDispatch;
/*eslint-enable*/