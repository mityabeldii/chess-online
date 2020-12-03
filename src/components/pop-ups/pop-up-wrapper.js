/*eslint-disable*/
import React, { useState, useEffect, useRef, Children } from 'react';
import styled from 'styled-components'

import { Frame } from '../ui-kit/styled-templates'

import useCustomDispatch from '../../hooks/useCustomDispatch'

let PopUpWrapper = (props) => {

    let { name = ``, disableDarkOverlay = false, extra = `` } = props

    let [visible, setVisible] = useState(false)

    useCustomDispatch(`OPEN_${name}_POP_UP`, () => { setVisible(true) })
    useCustomDispatch(`CLOSE_${name}_POP_UP`, () => { setVisible(false) })

    useEffect(() => {
        document.getElementsByTagName(`body`)[0].style.overflowY = visible ? `hidden` : `scroll`
    }, [visible])

    let onClose = () => { window.dispatchEvent(new CustomEvent(`CLOSE_${name}_POP_UP`)) }

    return (
        <Frame>
            { !disableDarkOverlay ? <DarkOverlay visible={visible} onClick={onClose} /> : null}
            <OpenProjectTab visible={visible} extra={extra} >
                <Cross onClick={onClose} />
                <ChildrenWrapper>
                    {props.children}
                </ChildrenWrapper>
            </OpenProjectTab>
        </Frame >
    );
}

const ChildrenWrapper = styled(Frame)`
    display: block;
    max-height: calc(90vh - 120px);
    overflow-y: scroll;
`;

let Cross = styled.img.attrs(() => {
    let img
    try { img = require(`../../assets/images/cross_w.svg`) } catch (error) { }
    return ({ src: img, })
})`
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: -40px;
    z-index: 4;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        transform: rotate(90deg);
    };
`

const OpenProjectTab = styled(Frame)`
    min-width: 480px;
    height: auto;
    padding: 30px 60px;
    border-radius: 12px;
    background: ${props => props.theme.background.primary};
    position: fixed;
    top: 50%;
    transform: translateY(${props => props.visible ? `-50%` : `100vh`});
    z-index: 3;
    box-sizing: border-box;

    @media only screen and (max-width: 600px) {
        min-width: auto;
        width: 96vw;
        padding: 9vw 3vw;
        transition: 0.2s;
    }
`;

const DarkOverlay = styled(Frame)`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, ${props => props.visible * 0.75});
    visibility: ${props => props.visible ? `visible` : `hidden`};
    backdrop-filter: blur(${props => props.visible * props.blur * 8}px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
`;

export default PopUpWrapper;
/*eslint-enable*/