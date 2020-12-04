/*eslint-disable*/
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import { Frame } from '../ui-kit/styled-templates'
import LandingPage from '../pages/landing-page'
import LoginPage from '../pages/auth-login-page'
import SignUpPage from '../pages/auth-sign-up-page'
import Balls from '../ui-kit/balls'

let GuestApp = () => {
    return (
        <>
            {useMemo(() => <Balls />, [])}
            <Switch>
                <Route exact path={`/signup`} component={SignUpPage} />
                <Route exact path={`/login`} component={LoginPage} />
                <Route exact path={`/`} component={LandingPage} />
                <Route exact component={LandingPage} />
            </Switch>
        </>
    )
}

export default GuestApp;
/*eslint-enable*/