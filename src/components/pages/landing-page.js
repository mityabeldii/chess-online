/*eslint-disable*/
import React from 'react'
import styled from 'styled-components'

import { Frame, Button, Link } from '../ui-kit/styled-templates'

let LandingPage = () => {
    return (
        <Wrapper>
            <Frame row extra={props => `> * { &:nth-child(1) { margin-right: 10px; > * { box-shadow: 0 0 10px ${props.theme.green}; }; }; };`} >
                <Link to={`/login`} ><Button background={props => props.theme.green} >Login</Button></Link>
                <Link to={`/signup`} ><Button shaped background={props => props.theme.green} >Sign up</Button></Link>
            </Frame>
        </Wrapper>
    )
}

const Wrapper = styled(Frame)`
    width: 100vw;
    height: 100vh;
`;

export default LandingPage;
/*eslint-enable*/