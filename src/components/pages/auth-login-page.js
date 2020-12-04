/*eslint-disable*/
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'redux-react-hook'
import firebase from 'firebase'

import * as usersActions from '../../redux/actions/users-actions'

import { Frame, Button, Link, P, H } from '../ui-kit/styled-templates'
import Form from '../ui-kit/Form'
import CommonHelper from '../../helpers/CommonHelper'

let LoginFields = [
    { name: `Email`, type: `string` },
    { name: `Password`, type: `password` },
]

let LoginPage = () => {

    let [tempData, setTempData] = useState({})
    let dispatch = useDispatch()

    let onLogin = () => {
        dispatch(usersActions.logIn({ ...tempData, rememberMe: true }))
            .then(pld => {
                CommonHelper.linkTo(`/`)
                if (pld.error !== undefined) {
                    window.alert(pld.error.message);
                }
            })
    }

    return (
        <Wrapper>
            <H extra={`margin-bottom: 15px;`} >Login</H>
            <Form
                fields={LoginFields}
                data={tempData}
                onChange={(key, value) => { setTempData({ ...tempData, [key]: value }) }}
            />
            <Button extra={`width: 540px; margin-top: 30px; @media only screen and (max-width: 600px) { width: 90vw; margin-bottom: 5vw; }`} background={props => props.theme.green} onClick={onLogin} >Login</Button>
            <Link to={`/signup`} ><P extra={props => `margin-top: 15px; color: ${props.theme.text.secondary} !important; &:hover { color: white !important; };`} >Create new account</P></Link>
        </Wrapper>
    )
}

const Wrapper = styled(Frame)`
    width: 100vw;
    height: 100vh;
`;

export default LoginPage;
/*eslint-enable*/