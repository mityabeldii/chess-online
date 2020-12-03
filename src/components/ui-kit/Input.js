/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import mvConsts from '../../constants/mvConsts'
import InputMask from 'react-input-mask';
import { Frame, convertHex } from './styled-templates'

import useCustomDispatch from '../../hooks/useCustomDispatch'

export default (props) => {
    let ref = useRef()
    let [focus, setFocus] = useState(false)
    let [error, setError] = useState(false)
    useEffect(() => {
        let focusHandler = (event) => { setFocus(true) }
        let blurHandler = (event) => { setFocus(false) }
        if (ref.current) {
            ref.current.addEventListener(`focus`, focusHandler, true);
            ref.current.addEventListener(`blur`, blurHandler, true);
        }
        return (() => {
            if (ref.current) {
                ref.current.removeEventListener(`focus`, focusHandler, true);
                ref.current.removeEventListener(`blur`, blurHandler, true);
            }
        })
    }, [])
    let hasImage = props.image !== undefined
    useCustomDispatch(`CALL_INPUT_ERROR`, (e) => { if (e.detail === props.placeholder) { setError(true) } })
    return (
        <Frame extra={`position: relative;`} >
            <Label focus={focus || props.value.length > 0} hasImage={hasImage} onClick={() => { ref.current.focus() }}>{props.placeholder}</Label>
            {props.image ? <Image name={props.image} visible={!(focus || props.value.length > 0)} /> : null}
            {
                props.textarea
                    ? <Textarea ref={ref} {...props} error={error} onChange={(e) => { props.onChange(e); setError(false) }} />
                    : <Input ref={ref} {...props} error={error} onChange={(e) => { props.onChange(e); setError(false) }} />
            }
        </Frame>
    )
}

const Label = styled.div`
    display: flex;
    position: absolute;
    box-sizing: border-box;
    top: ${props => props.focus ? -12 : 12}px;
    left: ${props => +(props.hasImage && !props.focus) * 16 + 17}px;
    font-size: ${props => props.focus ? 12 : 14}px;
    transition: 0.1s;
    background: ${props => props.focus ? props.theme.background.primary : `transparent`};
    padding: 2px 8px 2px 8px;
    border-radius: 8px;
    color: ${props => props.theme.text.secondary};
    cursor: text;

    @media only screen and (max-width: 600px) {
        z-index: 0;
    }
`;

let Image = styled.img.attrs((props) => {
    let img
    try { img = require(`../../assets/images/${props.name}.svg`) } catch (error) { }
    return ({ src: img, })
})`
    position: absolute;
    left: 17px;
    width: 16px;
    height: 16px;
    transform: scale(${props => +props.visible});
    opacity: ${props => +props.visible};
    transition: 0.2s;

    @media only screen and (max-width: 600px) {
        
    }
`

const Textarea = styled.textarea`
    -webkit-appearance: none;
    outline: none;
    width: ${props => (props.short ? 255 : 540) - 34}px;
    resize: none; 
    min-height: calc(100px - 34px);
    font-size: 14px;
    padding: 17px;
    background: ${props => props.theme.background.primary};
    border: 1px solid ${props => props.theme.background.secondary};
    border-radius: 5px;
    color: ${props => props.theme.text.primary};
    transition: 0.2s;
    ::placeholder { color: transparent; }
    &::-webkit-input-placeholder {
        ${props => props.placeholderColor === undefined ? null : `color: ${props => props.placeholderColor}`}
    }

    @media (min-width: 320px) and (max-width: 480px) {
        width: calc(90vw - 34px);
        height: calc(31.25vw - 2 * 3.75vw);
        padding: 3.75vw 4.5vw;
        display: flex;
    }

    @supports (-webkit-touch-callout: none) {
        
    }
    
    ${props => props.extra}
`

const Input = styled.input`
    -webkit-appearance: none;
    outline: none;
    width: ${props => (props.short ? 255 : 540) - 34}px;
    height: ${48 - 34}px;
    font-size: 14px;
    padding: 17px;
    background: ${props => props.theme.background.primary};
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.background.secondary};
    border-radius: 5px;
    color: ${props => props.theme.text.primary};
    transition: 0.2s;

    ::-webkit-slider-thumb {
        border: 0.1vw solid #0ff050;
        height: 1.5vw;
        width: 1.5vw;
        border-radius: 1vw;
        background: ${props => props.theme.background.primary};
        cursor: pointer;
        -webkit-appearance: none;
    }
    ::placeholder {
        color: transparent;
    }
    @media (min-width: 320px) and (max-width: 480px) {
        width: calc(90vw - 34px);
        height: ${props => +props.visible * 5}vw;
        padding: ${props => +props.visible * 4}vw;
        border-radius: 2vw;
        margin: ${props => +props.visible}vw;
        font-size: 4vw;
    }
    &::-webkit-input-placeholder {
        ${props => props.placeholderColor === undefined ? null : `color: ${props => props.placeholderColor}`}
    }
    
    ${props => props.extra}
`
/*eslint-enable*/