/*eslint-disable*/
import React from 'react'
import styled from 'styled-components'

import { Frame, Button } from '../ui-kit/styled-templates'

import useCurrentUser from '../../hooks/useCurrentUser'

let UserApp = () => {

    let { currentUser, logOut } = useCurrentUser()

    return (
        <Wrapper>
            <Menu>
                <Header>chess.online</Header>
                <Body>

                </Body>
                <Footer>
                    <Button background={props => props.theme.red} onClick={logOut} >Log out</Button>
                </Footer>
            </Menu>
            <Workspace>

            </Workspace>
        </Wrapper>
    )
}

const Header = styled(Frame)`
    margin-top: 2vh;
    font-size: 20px;
    font-weight: bold;
`;

const Body = styled(Frame)`
    height: 100%;
    margin: 2vh 0;
    width: 15vw;
`;

const Footer = styled(Frame)`
    margin-bottom: 2vh;
`;

const Menu = styled(Frame)`
    width: 250px;
    height: 96vh;
    margin-left: 2vh;
    border-radius: 12px;
    background: ${props => props.theme.background.secondary};

    @media only screen and (max-width: 600px) {
        width: 90vw;    
    }
`;

const Workspace = styled(Frame)`
    width: 100%;
    flex: 1;
    height: 96vh;
    margin-left: 15px;

    @media only screen and (max-width: 600px) {
        width: 0vw;    
    }
`;

const Wrapper = styled(Frame)`
    width: 100vw;
    height: 100vh;
    flex-direction: row;
    * {
        /* border: 1px solid red; */
    }
`;

export default UserApp;
/*eslint-enable*/