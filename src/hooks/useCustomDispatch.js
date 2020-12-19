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

export let customHandler = (key, detail) => {
    window.dispatchEvent(new CustomEvent(key, { detail }))
}

export default useCustomDispatch;
/*eslint-enable*/