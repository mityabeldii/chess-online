/*eslint-disable*/
import React from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { Link as ImportLink } from 'react-router-dom'

import { theme } from '../../constants/mvConsts'
import ImportInput from './Input'
import ImportButton from './Button'

export const Input = (props) => <ImportInput {...props} />

export const Button = (props) => <ImportButton {...props} />

export const Textarea = (props) => <ImportInput textarea {...props} />

export const Link = (props) => <ImportLink
    style={{ textDecoration: 'none' }}
    {...props}
    onClick={() => {
        try { document.getElementById(`scrollWrapper`).scrollTo({ top: 0, behavior: "smooth", }); } catch (error) { }
        try { window.scrollTo({ top: 0, behavior: "smooth", }); } catch (error) { }
        if (props.onClick !== undefined) { props.onClick() }
    }}
/>

export const Frame = styled.div`
    display: ${props => props.only_mobile ? `none` : `flex`};
    justify-content: ${props => props.row ? props.start ? `flex-start` : props.end ? `flex-end` : `center` : `center`};
    align-items: ${props => !props.row ? props.start ? `flex-start` : props.end ? `flex-end` : `center` : `center`};
    flex-direction: ${props => props.row ? `row` : `column`};
    transition: 0.2s;
    font-size: 18px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    ${props => props.pointer ? `cursor: pointer;` : null}
    /* user-select: none; */
    /* cursor: default; */
    @media (min-width: 320px) and (max-width: 480px) {
        display: ${props => props.only_desktop ? `none` : `flex`};
        font-size: 4vw;
        transition: 0s;
    }
    ${props => props.extra}
`

export const Checkbox = (props) => {
    let CheckboxContent = styled.img`width: 12px; height: 12px; opacity: ${props => +props.checked}; transition: 0.2s;`
    let { checked = false, onChange = () => { } } = props
    return (
        <Frame extra={props => `border-radius: 4px; width: 20px; height: 20px; border: 2px solid ${props.theme.green}; cursor: pointer;`} onClick={() => { onChange(!checked) }} >
            <CheckboxContent src={require(`../../assets/images/checkbox_content.svg`)} checked={checked} />
        </Frame>
    )
}

export const Text = styled(Frame)`
// font-size: ${props => props.size ? props.size : 0.8}vw;
font-size: ${props => props.size ? props.size : 16}px;
color: ${props => props.text_color ? props.text_color : props.theme.text.primary};
font-family: ${props => props.bold ? `Bold` : `Regular`};
white-space: pre-wrap;
${props => props.extra}
@media (min-width: 320px) and (max-width: 480px) {
    font-size: ${props => (props.size ? props.size : 0.8) * 4}vw;
}`

export let ThemeWrapper = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export let convertHex = (hex = `#000000`, opacity = 1) => {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}

export let rgbToHex = (r = 0, g = 0, b = 0) => {
    if (r > 255 || g > 255 || b > 255) {
        throw `Invalid color component`
    }
    return ((r << 16) | (g << 8) | b).toString(16);
}

export const P = styled(Text)`
    max-width: 920px;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 30px;
    color: ${props => props.theme.text.secondary};
    ${props => props.extra}

    @media only screen and (max-width: 600px) {
        max-width: 90vw;
        font-size: 4.5vw;
        line-height: 6.5vw;
        margin-top: 4.5vw;
        margin-bottom: 6.25vw;
    }
`;

export const H1 = styled(Text)`
    font-size: 24px;
    line-height: 46px;
    margin-bottom: 15px;
    font-family: bold;
    max-width: 925px;

    @media only screen and (max-width: 600px) {
        font-size: 5vw;
        line-height: 8vw;
        margin-bottom: 4.5vw;
        max-width: 90vw;
    }
`;

export const H = styled(Text)`
    font-family: Bold;
    font-size: 48px;
    line-height: 62px;

    @media only screen and (max-width: 600px) {
       font-size: 7.5vw; 
       line-height: 10vw;
    }
`;

/*eslint-enable*/
