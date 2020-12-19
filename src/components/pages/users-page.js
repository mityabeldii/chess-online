/*eslint-disable*/
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useMappedState } from 'redux-react-hook'
import moment from 'moment-timezone'
import firebase from 'firebase'

import { Frame } from '../ui-kit/styled-templates'

import CommonHelper from '../../helpers/CommonHelper'

import useCurrentUser from '../../hooks/useCurrentUser'

let DocsPage = (props) => {

    let { currentUser } = useCurrentUser()
    let { users } = useMappedState(useCallback((state) => ({ users: state.users.usersMap.toArray().filter(i => i.id !== currentUser.id) }), [currentUser]))

    let inviteUser = (user_id) => {
        let id = window.createId()
        let new_game = {
            player_1: currentUser.id,
            player_2: user_id,
            status: 'waiting',
            config: `---------`,
            id: id,
            timestamp: +moment(),
        }
        firebase.database().ref(`games/${id}`).set(new_game)
        firebase.database().ref(`games/${id}/status`).on('value', (snapshot) => {
            if (snapshot.val() === `playing`) {
                CommonHelper.linkTo(`/multiplayer/${id}`)
            }
        })
    }

    return (
        <Wrapper>
            {
                users.map((user, index) => {
                    let online = moment().diff(moment(user.timestamp || 0), `seconds`) < 60 * 20
                    return (
                        <Tab key={user.id} onClick={() => { if (online) { inviteUser(user.id) } }} >
                            <Frame row>
                                <Frame extra={props => `width: 8px; height: 8px; border-radius: 50%; background: ${online ? props.theme.green : `rgba(255, 255, 255, 0.1)`}; margin-right: 10px;`} />
                                <Frame extra={`font-size: 14px;`} >{user.username}</Frame>
                            </Frame>
                            <Frame extra={props => `font-size: 14px; color: ${props.theme.text.secondary} !important;`} >Invite</Frame>
                        </Tab>
                    )
                })
            }
        </Wrapper>
    )
}

const Tab = styled(Frame)`
    width: 200px;
    height: 150px;
    border-radius: 12px;
    margin: 0 15px 15px 0;
    background: ${props => props.theme.background.secondary};
    cursor: pointer;
    border: 1px solid ${props => props.theme.background.secondary};
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: space-between;
    padding: 15px;
    &:hover {
        border: 1px solid ${props => `rgba(255, 255, 255, 0.1)`};
        > * {
            &:last-child {
                transform: translateX(5px);
            }
        }
    }
`;

const Wrapper = styled(Frame)`
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default DocsPage;
/*eslint-enable*/