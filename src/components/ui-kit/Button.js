/*eslint-disable*/
import React from 'react'
import styled from 'styled-components'

let Button = (props) => {
    return (
        <Wrapper
            {...props}
            visible={props.visible === undefined ? true : props.visible}
            short={props.short === undefined ? true : props.short}
            onClick={() => { if (!props.disabled) { props.onClick && props.onClick() } }}
            bold
        >
            {props.children ? props.children : `button`}
        </Wrapper>
    )
}

export default Button

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 23px 30px 23px 30px;
    height: 16px;
    border-radius: 12px;
    font-family: bold;
    font-size: 16px;
    background: black;
    color: ${props => !props.shaped ? `white` : props.disabled ? props.theme.background.support : props.background ? props.background : props.theme.blue};
    min-width: 90px;
    cursor: ${props => props.disabled ? `default` : `pointer`};
    background: ${props => props.shaped ? `transparent` : props.disabled ? props.theme.background.support : props.background ? props.background : props.theme.blue};
    border: 2px solid ${props => props.disabled ? props.theme.background.support : props.background};
    opacity: 1;
    text-align: center;
    line-height: 18px;
    &:hover {
        opacity: 0.8;
    }

    ${props => props.extra}

    @media (min-width: 320px) and (max-width: 480px) {
        padding: 23px 30px 23px 30px;
        border-radius: 50px;
        font-size: 5vw;
        line-height: 5vw;
        border: 2px solid ${props => props.disabled ? props.theme.background.support : props.background};
    }
`
/*eslint-enable*/