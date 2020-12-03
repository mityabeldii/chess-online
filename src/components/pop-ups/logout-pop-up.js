/*eslint-disable*/
import React from 'react';

import { Frame, H1, Button } from '../ui-kit/styled-templates'
import PopUpWrapper from '../pop-ups/pop-up-wrapper'

import useCurrentUser from '../../hooks/useCurrentUser'

let LogOutPopUp = () => {

    let onCloseLogOut = () => { window.dispatchEvent(new CustomEvent(`CLOSE_LOGOUT_POP_UP`, {})) }

    let { logOut } = useCurrentUser()

    return (
        <PopUpWrapper name={`LOGOUT`} >
            <H1 extra={`align-items: center; text-align: center; @media only screen and (max-width: 600px) { width: 90vw; };`} >Are you sure you want to exit?</H1>
            <Frame row extra={`margin-top: 30px;`} >
                <Button extra={`width: 196px; @media only screen and (max-width: 600px) { width: 43.75vw; };`} background={props => props.theme.blue} shaped onClick={onCloseLogOut} >
                    Cancel
                </Button>
                <Button extra={`width: 196px; margin-left: 20px; @media only screen and (max-width: 600px) { width: 43.75vw; margin-left: 2.5vw; };`} background={props => props.theme.red} onClick={() => {
                    logOut()
                    onCloseLogOut()
                }} >
                    Yes, logout
                </Button>
            </Frame>
        </PopUpWrapper>
    );
}

export default LogOutPopUp;
/*eslint-enable*/