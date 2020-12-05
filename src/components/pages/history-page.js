/*eslint-disable*/
import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import { useMappedState } from 'redux-react-hook'
import moment from 'moment-timezone'

import { Frame, Button, Link, convertHex } from '../ui-kit/styled-templates'
import Playground from './playground'

import useCurrentUser from '../../hooks/useCurrentUser'
import CommonHelper from '../../helpers/CommonHelper'

let HistoryPage = () => {

    let [games, setGames] = useState([])
    let { currentUser } = useCurrentUser()
    let { users } = useMappedState(useCallback((state) => ({ users: state.users.usersMap.toArray() }), []))

    useEffect(() => {
        firebase.database().ref(`games`).once(`value`)
            .then((d) => {
                setGames((Object.values(d.val() || {}) || []).filter(i => i.player_1 === currentUser.id || i.player_2 === currentUser).map(i => ({ timestamp: +moment().startOf(`year`), ...i })))
            })
    }, [])

    return (
        <Wrapper>
            {
                games.sort((a, b) => b.timestamp - a.timestamp).map((item, index) => {
                    return (
                        <Item key={index} >
                            <Frame extra={`width: 100%; flex: 3; color: white; opacity: 0.5;`} >
                                {moment(item.timestamp).format(`DD.MM.YYYY HH:mm`)}
                            </Frame>
                            <Frame extra={`width: 100%; flex: 3.5; color: white; opacity: ${item.winner === item.player_1 ? 1 : 0.5};`} >
                                {{ username: `bot`, ...users.get(item.player_1) }.username}
                            </Frame>
                            <Frame extra={`width: 100%; flex: 3.5; color: white; opacity: ${item.winner === item.player_2 ? 1 : 0.5};`} >
                                {{ username: `bot`, ...users.get(item.player_2) }.username}
                            </Frame>
                        </Item>
                    )
                })
            }
        </Wrapper>
    )
}

const Item = styled(Frame)`
    width: 500px;
    height: 45px;
    padding: 15px;
    border-radius: 12px;
    background: ${props => props.theme.background.secondary};
    flex-direction: row;
    margin-bottom: 10px;
    * {
        font-size: 14px;
        align-items: flex-start;
    }
`;

const Wrapper = styled(Frame)`
    width: 100%;
    height: 100%;
    display: block;
    max-height: 100%;
    overflow-y: scroll;
`;

export default HistoryPage;
/*eslint-enable*/