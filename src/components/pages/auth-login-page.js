/*eslint-disable*/
import React from 'react'
import styled from 'styled-components'

import { Frame } from '../ui-kit/styled-templates'
import Form from '../ui-kit/Form'

let LoginPage = () => {
    return (
        <Wrapper>
            <Form
                fields={{}}
                onChange={(key, value) => { }}
            />
        </Wrapper>
    )
}

const Wrapper = styled(Frame)`
    width: 100vw;
    height: 100vh;
`;

export default LoginPage;
/*eslint-enable*/