/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import moment from 'moment-timezone'

import { Frame, Button, Link, convertHex } from '../ui-kit/styled-templates'
import Playground from './playground'

import useCurrentUser from '../../hooks/useCurrentUser'
import CommonHelper from '../../helpers/CommonHelper'

let win_strics = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let SinglePlayer = () => {

    let [game, setGame] = useState({ config: [] })
    let { currentUser } = useCurrentUser()
    let { config } = game

    let active_player = game.config.filter(i => i !== `-`).length % 2

    let winner = win_strics.map(i => i.map(j => +config[j]).filter(j => !isNaN(j))).filter(i => i.length === 3).filter(i => i[0] === i[1] && i[1] === i[2])
    winner = winner[0] ? winner[0][0] : undefined

    useEffect(() => {
        if (game[`player_${active_player + 1}`] === `bot`) {
            if (winner === undefined) {
                let config = game.config
                let items = game.config.map((a, b) => b).filter(i => game.config[i] === `-`)
                let index = items[Math.floor(Math.random() * items.length)]
                config[index] = active_player + ``
                setTimeout(() => {
                    firebase.database().ref(`games/${game.id}`).set({ ...game, config: config.join(``) })
                }, 1000)
            } else {
                setTimeout(() => {
                    firebase.database().ref(`games/${game.id}`).set({ ...game, config: game.config.join(``), winner: game[`player_${active_player === 0 ? 2 : 1}`], status: `ended`, })
                }, 1000)
            }
        }
    }, [game])

    useEffect(() => {
        return (() => {
            if (game.id !== undefined) {
                firebase.database().ref(`games/${game.id}/status`).set(`ended`)
            }
        })
    }, [game.id])

    useEffect(() => {
        let id = window.createId()
        let new_game = {
            player_1: currentUser.id,
            player_2: `bot`,
            status: 'singleplayer',
            config: `---------`,
            id: id,
            timestamp: +moment(),
        }
        firebase.database().ref(`games/${id}`).set(new_game).then((d) => {
            setGame({ ...new_game, config: new_game.config.split(``) })
        })
        firebase.database().ref(`games/${id}`).on('value', (snapshot) => {
            setGame({ ...snapshot.val(), config: snapshot.val().config.split(``) })
        });
    }, [])

    return (
        <Wrapper>
            <Playground game={game} onChange={(new_config) => {
                firebase.database().ref(`games/${game.id}`).set({ ...game, config: new_config.join(``) })
            }} />
        </Wrapper>
    )
}

const Wrapper = styled(Frame)`
    width: 100%;
    height: 100%;
`;

export default SinglePlayer;
/*eslint-enable*/