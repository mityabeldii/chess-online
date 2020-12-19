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

let useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const handler = setTimeout(() => { setDebouncedValue(value) }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );

    return debouncedValue;
}

let MultiPlayer = () => {

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
        } else {
            if (winner === undefined) {

            } else {
                setTimeout(() => {
                    firebase.database().ref(`games/${game.id}`).set({ ...game, config: game.config.join(``), winner: game[`player_${active_player === 0 ? 2 : 1}`], status: `ended`, })
                }, 1000)
            }
        }
    }, [game])

    useEffect(() => {

        let id = window.createId()
        firebase.database().ref(`games`).once('value', (snapshot) => {
            Object.values(snapshot.val() || {}).filter(i => i.player_1 === currentUser.id || i.player_2 === currentUser.id).filter(i => i.status !== `ended`).forEach(i => {
                firebase.database().ref(`games/${i.id}/status`).set(`ended`)
            })
            let games = (Object.values(snapshot.val() || {}) || []).filter(i => i.player_1 !== currentUser.id && i.player_2 === `search` && i.timestamp - +moment() < 1000 * 10)
            if (games.length > 0) {
                firebase.database().ref(`games/${games[0].id}/status`).set(`playing`)
                firebase.database().ref(`games/${games[0].id}/player_2`).set(currentUser.id)
                firebase.database().ref(`games/${games[0].id}`).on('value', (snapshot) => {
                    if (snapshot.val() === null) { return }
                    setGame({ ...snapshot.val(), config: snapshot.val().config.split(``) })
                });
            } else {
                let new_game = {
                    player_1: currentUser.id,
                    player_2: 'search',
                    status: 'search',
                    config: `---------`,
                    id: id,
                    timestamp: +moment(),
                }
                firebase.database().ref(`games/${id}`).set(new_game)
                firebase.database().ref(`games/${id}`).on('value', (snapshot) => {
                    if (snapshot.val() == null) {
                        window.alert(`This game was deleted`)
                        CommonHelper.linkTo(`/`)
                    } else {
                        if (snapshot.val().status === `ended`) {
                            CommonHelper.linkTo('/')
                        }
                        setGame({ ...snapshot.val(), config: snapshot.val().config.split(``) })
                    }
                });
            }
        });
    }, [])

    useEffect(() => {
        return (() => {
            if (game.id !== undefined) {
                firebase.database().ref(`games/${game.id}`).once('value').then((d) => {
                    if (d.val() !== null) {
                        firebase.database().ref(`games/${game.id}/status`).set(`ended`)
                    }
                })
            }
        })
    }, [game.id])

    let debouncedSearchTerm = useDebounce(game, 1000 * 15);

    useEffect(() => {
        if (moment().diff(moment(game.timestamp), `seconds`) >= 15) {
            CommonHelper.linkTo(`/`)
            window.alert(`Timeout`)
        }
    }, [debouncedSearchTerm])


    if (game.player_2 === 'search') {
        return (
            <Wrapper>
                searching for opponent
            </Wrapper>
        )
    }

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

export default MultiPlayer;
/*eslint-enable*/