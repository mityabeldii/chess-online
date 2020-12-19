/*eslint-disable*/
import React, { useState, useCallback } from 'react';
import { useMappedState } from 'redux-react-hook'
import firebase from 'firebase'

import { Frame, H1, Button } from '../ui-kit/styled-templates'
import PopUpWrapper from './pop-up-wrapper'

import useCurrentUser from '../../hooks/useCurrentUser'
import useCustomDispatch, { customHandler } from '../../hooks/useCustomDispatch'
import CommonHelper from '../../helpers/CommonHelper';

let InvitePopUp = () => {

    let { users } = useMappedState(useCallback((state) => ({ users: state.users.usersMap.toArray() }), []))
    let [invitor, setInvitor] = useState(undefined)
    let [gameId, setGameId] = useState(undefined)

    useCustomDispatch('OPEN_INVITE_POP_UP', (e) => {
        setInvitor(e.detail.invitor)
        setGameId(e.detail.game_id)
    })
    let username = { username: ``, ...users.get(invitor) }.username

    return (
        <PopUpWrapper name={`INVITE`} >
            <H1 extra={`align-items: center; text-align: center; @media only screen and (max-width: 600px) { width: 90vw; };`} >{username} wants to play with you</H1>
            <Frame row extra={`margin-top: 30px;`} >
                <Button extra={`width: 196px; @media only screen and (max-width: 600px) { width: 43.75vw; };`} background={props => props.theme.red} shaped onClick={() => {
                    if (gameId !== undefined) {
                        firebase.database().ref(`games/${gameId}/status`).set(`ended`)
                    }
                    customHandler(`CLOSE_INVITE_POP_UP`)
                }} >
                    Reject
                </Button>
                <Button extra={`width: 196px; margin-left: 20px; @media only screen and (max-width: 600px) { width: 43.75vw; margin-left: 2.5vw; };`} background={props => props.theme.green} onClick={() => {
                    if (gameId !== undefined) {
                        CommonHelper.linkTo(`/multiplayer/${gameId}`)
                        firebase.database().ref(`games/${gameId}/status`).set(`playing`)
                    }
                    customHandler(`CLOSE_INVITE_POP_UP`)
                }} >
                    Accept
                </Button>
            </Frame>
        </PopUpWrapper>
    );
}

export default InvitePopUp;
/*eslint-enable*/