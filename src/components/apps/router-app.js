/*eslint-disable*/
import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { HashRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useMappedState } from 'redux-react-hook';
import firebase from 'firebase'

import { Frame } from '../ui-kit/styled-templates'

import * as usersActions from '../../redux/actions/users-actions'

import GuestApp from '../apps/guest-app.js'
import UserApp from '../apps/user-app.js'
import LogOutPopUp from '../pop-ups/logout-pop-up'

import useCurrentUser from '../../hooks/useCurrentUser'

let RouterApp = () => {

    const { initialized } = useMappedState(useCallback(state => ({ initialized: state.users.initialized }), []))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(usersActions.initializeAuthorization()).then(pld => { if (pld.user !== undefined) { } });
        dispatch(usersActions.loadAllUsers())
    }, []);

    let { userRole } = useCurrentUser()

    if (initialized === false) {
        return <PreloaderPage/>
    }

    let route = GuestApp;
    switch (userRole) {
        case `guest`: route = GuestApp; break;
        case `user`: route = UserApp; break;
        // case `admin`: route = AdminApp; break;
        default: route = GuestApp; break;
    }

    return (
        <HashRouter>
            <Wrapper>
                <LogOutPopUp />
                <Switch>
                    <Route component={route} />
                </Switch>
            </Wrapper>
        </HashRouter>
    );
}

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    * {
        color: ${props => props.theme.text.primary};
    }
    @media only screen and (max-width: 600px) {
        
    }
`;

const PreloaderPage = styled(Frame)`
    width: 100vw;
    height: 100vh;
    background: ${props => props.theme.background.primary};
    color: white;
    &:after {
        content: 'loading';
    }
`;

export default RouterApp;
/*eslint-enable*/