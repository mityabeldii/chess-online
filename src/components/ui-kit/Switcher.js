/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Frame, Text } from '../ui-kit/styled-templates'

let Switcher = (props) => {
    let { array = [], selected = 0, onChange = () => { }, width = 20 } = props
    return (
        <Wrapper {...props} >
            <Pointer
                left={width / array.length * selected + 1.2}
                width={selected >= 0 ? width / array.length : 0}
                reversed={props.reversed}
            />
            {
                array.map((item, index) => {
                    return (
                        <Variant
                            key={index}
                            onClick={() => { onChange(index) }}
                            {...props}
                            width={width / array.length}
                            extra={``}
                        >
                            <Text
                                bold={selected === index}
                            >
                                {item}
                            </Text>
                        </Variant>
                    )
                })
            }
        </Wrapper>
    )
}

export default Switcher;

const Variant = styled(Frame)`
width: ${props => props.width / 4}vw;
z-index: 2;
margin: 0.75vw;
border-left: 0.25vw solid ${props => props.index > 0 && Math.abs(props.selected - props.ndex) > 1 ? props.reversed ? `red` : `blue` : `transparent`};
border-right: 0.25vw solid ${props => props.index < props.array.length - 1 && Math.abs(props.selected - props.index) > 1 ? props.theme.background.support : `transparent`};
transition: 1s;
cursor: pointer;
@media (min-width: 320px) and (max-width: 480px) {
    width: ${props => props.width}vw;
    margin: 3vw;
    border-left: 1vw solid ${props => props.index > 0 && Math.abs(props.selected - props.ndex) > 1 ? props.reversed ? `red` : `blue` : `transparent`};
    border-right: 1vw solid ${props => props.index < props.array.length - 1 && Math.abs(props.selected - props.index) > 1 ? props.theme.background.support : `transparent`};
}`

let Wrapper = styled(Frame)`
border-radius: 0.75vw;
// margin: 1vw;
width: ${props => props.width / 4}vw;
position: relative;
flex-direction: row;
padding: 0.25vw;
z-index: 0;
background: ${props => props.reversed ? props.theme.background.secondary : props.theme.background.primary};
border: 0.1vw solid ${props => props.selected < 0 ? props.theme.red : `transparent`};
@media (min-width: 320px) and (max-width: 480px) {
    border-radius: 3vw;
    margin: 4vw;
    width: ${props => props.width}vw;
    padding: 1vw;
    border: 0.4vw solid ${props => props.selected < 0 ? props.theme.red : `transparent`};
}

`

const Pointer = styled(Frame)`
width: ${props => props.width / 4}vw;
height: 80%;
top: 10%;
left: ${props => props.left / 4}vw;
border-radius: 0.5vw;
position: absolute;
background: ${props => props.reversed ? props.theme.background.primary : props.theme.background.secondary};
@media (min-width: 320px) and (max-width: 480px) {
    width: ${props => props.width}vw;
    left: ${props => props.left}vw;
    border-radius: 2vw;
}
`
/*eslint-enable*/