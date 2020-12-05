/*eslint-disable*/
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'redux-react-hook'

import * as usersActions from '../../redux/actions/users-actions'

import { Frame, Button, Link, P, H } from '../ui-kit/styled-templates'
import Form from '../ui-kit/Form'
import CommonHelper from '../../helpers/CommonHelper'

let fields = [
    // { name: `Name`, type: `string`, short: true },
    // { name: `Last name`, type: `string`, short: true },
    { name: `Email`, type: `string` },
    { name: `Username`, type: `string` },
    { name: `Create password`, type: `password`, short: true, },
    { name: `Confirm password`, type: `password`, short: true, },
]

let validateEmail = (email) => (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)

let checkPassword = (password) => {
    if (!password.match(/[a-z]+/)) { return `Password sould have at least 1 letter between lowercase [ a - z ]` }
    if (!password.match(/[A-Z]+/)) { return `Password sould have at least 1 letter between uppercase [ A - Z ]` }
    if (!password.match(/[0-9]+/)) { return `Password sould have at least 1 number between [ 0 - 9 ]`; }
    if (password.length < 8) { return `Minimum number of characters is 6` }
    return `Ok`
}

let SignUpPage = () => {

    let [tempData, setTempData] = useState({})
    let dispatch = useDispatch()

    let onSignUp = () => {
        let info = { ...tempData }
        delete info.create_password
        delete info.repeat_password
        if (!validateEmail(info.email)) {
            window.dispatchEvent(new CustomEvent(`CALL_INPUT_ERROR`, { detail: `Email` }))
            setTimeout(() => { window.alert(`Email is not valid`) }, 200)
            return
        }
        if (checkPassword(tempData.create_password) !== `Ok`) {
            window.dispatchEvent(new CustomEvent(`CALL_INPUT_ERROR`, { detail: `Create password` }))
            setTimeout(() => { window.alert(checkPassword(tempData.create_password)) }, 200)
            return
        }
        if (tempData.create_password !== tempData.confirm_password) {
            window.dispatchEvent(new CustomEvent(`CALL_INPUT_ERROR`, { detail: `Confirm password` }))
            setTimeout(() => { window.alert(`Password doesn't match`) }, 200)
            return
        }
        if (tempData.username === undefined || tempData.username === ``) {
            window.dispatchEvent(new CustomEvent(`CALL_INPUT_ERROR`, { detail: `Username` }))
            setTimeout(() => { window.alert(`Username is empty`) }, 200)
            return
        }
        dispatch(usersActions.signUp({ ...tempData, rememberMe: true })).then(pld => {
            CommonHelper.linkTo(`/`)
            if (pld.error !== undefined) {
                window.alert(pld.error.message);
            }
        })
    }

    return (
        <Wrapper>
            <H extra={`margin-bottom: 15px;`} >Sign up</H>
            <Form
                fields={fields}
                data={tempData}
                onChange={(key, value) => { setTempData({ ...tempData, [key]: value }) }}
            />
            <Button extra={`width: 540px; margin-top: 30px; @media only screen and (max-width: 600px) { width: 90vw; margin-bottom: 5vw; }`} background={props => props.theme.green} onClick={onSignUp} >Sign Up</Button>
            <Link to={`/login`} ><P extra={props => `margin-top: 15px; color: ${props.theme.text.secondary} !important; &:hover { color: white !important; };`} >Already have accaount?</P></Link>
        </Wrapper>
    )
}

const Wrapper = styled(Frame)`
    width: 100vw;
    height: 100vh;
`;

export default SignUpPage;
/*eslint-enable*/