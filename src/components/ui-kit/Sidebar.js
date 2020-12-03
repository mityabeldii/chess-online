/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Frame, Text, LogoImg } from './styled-templates'

let Sidebar = (props) => {

    let {
        width = window.innerWidth * 0.5,
        visible = false,
        onCloserClick = () => { },
        blur = true,
        animationType = `from-right`, // none, fade, from-left, from-top, from-right, from-bottom,
        animationDuration = 0.2, // in seconds
    } = props

    useEffect(() => {
        let listener = (e) => { if (e.key === `Escape`) { onCloserClick() } }
        document.addEventListener('keydown', listener);
        return (() => { document.removeEventListener('keydown', listener); })
    }, [])

    return <Wrapper visible={visible} animationType={animationType} animationDuration={animationDuration} >
        <DarkLayer onClick={onCloserClick} visible={visible} animationType={animationType} animationDuration={animationDuration} />
        <SideBarWrapper visible={visible} width={width} blur={blur} animationType={animationType} animationDuration={animationDuration} >
            <CrossWrapper>
                <LogoImg name={`cross`} width={2} extra={`cursor: pointer;`} onClick={onCloserClick} />
            </CrossWrapper>
            {props.children}
        </SideBarWrapper>
    </Wrapper>
}

const Wrapper = styled(Frame)`
    position: fixed;
    top: 0;
    left: 0;
    visibility: ${props => props.visible ? `visible` : `hidden`};
    transition: ${props => props.animationType === `none` ? 0 : props.animationDuration};
`;

const DarkLayer = styled(Frame)`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, ${props => props.visible * 0.5});
    visibility: ${props => props.visible ? `visible` : `hidden`};
    backdrop-filter: blur(${props => props.visible * props.blur * 8}px);
    transition: ${props => props.animationType === `none` ? `0s` : props.animationDuration};
`;

const CrossWrapper = styled(Frame)`
    padding: 1vw;
    align-items: flex-start;
    width: 100%;
`;

const SideBarWrapper = styled(Frame)`
    width: 50vw;
    ${props => props.width ? 'width: calc(' + props.width + `px - 2vw);` : null}
    max-width: 100vw;
    padding: 1vw;
    justify-content: flex-start;
    height: calc(100vh);
    background: ${props => props.theme.background.primary};
    position: fixed;
    transition: ${props => props.animationDuration}s;
    ${props => getAnimationStyles(props)}
    overflow: scroll;
`;

let getAnimationStyles = (props) => {
    switch (props.animationType) {
        case `fade`: return `right: 0; opacity: ${+props.visible};`
        case `from-right`: return `right: 0; transform: translateX(${+!props.visible * 100}%);`
        case `from-left`: return `left: 0; transform: translateX(${+!props.visible * -100}%);`
        case `from-top`: return `top: 0; transform: translateY(${+!props.visible * -100}%);`
        case `from-bottom`: return `bottom: 0; transform: translateY(${+!props.visible * 100}%);`
        case `none`: return `right: 0; transform: translateX(${+!props.visible * 100}%); transition: 0s;`
        default: return `transform: translateX(${+!props.visible * 100}%);`
    }
}

export default Sidebar;
/*eslint-enable*/