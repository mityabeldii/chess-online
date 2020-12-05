/*eslint-disable*/
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useMappedState } from 'redux-react-hook'

import { Frame, Button, Link, convertHex } from '../ui-kit/styled-templates'
import CommonHelper from '../../helpers/CommonHelper'

import useCurrentUser from '../../hooks/useCurrentUser'

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

let win_line_coordinates = [
    [0, -100, 0],
    [0, 0, 0],
    [0, 100, 0],
    [0, 100, 90],
    [0, 0, 90],
    [0, -100, 90],
    [0, 0, 45],
    [0, 0, -45],
]

let Playground = (props) => {

    let { game = {}, onChange = () => [] } = props
    let { config = [] } = game

    let { users } = useMappedState(useCallback((state) => ({ users: state.users.usersMap.toArray() }), []))
    let { currentUser } = useCurrentUser()

    let active_player = config.filter(i => i !== `-`).length % 2
    let my_turn = game[`player_${active_player + 1}`] === currentUser.id

    let winner = win_strics.map(i => i.map(j => +config[j]).filter(j => !isNaN(j))).filter(i => i.length === 3).filter(i => i[0] === i[1] && i[1] === i[2])
    let win_stric_number = win_strics.map(i => i.map(j => +config[j])).map(i => i.join(``)).indexOf(winner.join(``).replace(/,/g, ``))
    winner = winner[0] ? winner[0][0] : undefined

    let onMove = (index) => {
        if (winner === undefined && config[index] === `-` && my_turn) {
            onChange(config.map((a, b) => b === index && a === `-` ? [`0`, `1`][active_player] : a))
        }
    }

    useEffect(() => {
        if (game.status === `ended`) {
            window.alert(`Your opponent left this match`)
            CommonHelper.linkTo(`/`)
        }
    }, [game.status])

    return (
        <Wrapper>
            <PlayFieldWrapper>
                {
                    config.map((item, index) => {
                        return (
                            <Square key={index} onClick={() => { onMove(index) }} item={item} />
                        )
                    })
                }
                {new Array(4).fill(0).map((item, index) => <Line key={`line_${index}`} />)}
                <WinnerLine coordinates={win_line_coordinates[win_stric_number]} color={!my_turn ? `green` : `red`} />
            </PlayFieldWrapper>
            <Frame extra={`margin-left: 5px; @media only screen and (max-width: 600px) { margin: 15px 0; };`} >
                <User active={active_player === 0} >{{ username: `bot`, ...users.get(game.player_1) }.username}</User>
                <User active={active_player === 1} >{{ username: `bot`, ...users.get(game.player_2) }.username}</User>
                <Frame extra={`color: white; font-size: 12px; opacity: 0.3;`} >Match ID: {game.id}</Frame>
            </Frame>
        </Wrapper>
    )
}

const User = styled(Frame)`
    width: calc(220px - 2 * 15px);
    height: calc(45px - 2 * 15px);
    margin-bottom: 5px;
    padding: 15px;
    align-items: flex-start;
    border-radius: 12px;
    font-size: 13px;
    background: ${props => props.theme.background.secondary};
    border: 1px solid ${props => props.active ? props.theme.green : `transparent`};
    color: white;
    &:hover {
        opacity: 0.8;
    }
`;

const Wrapper = styled(Frame)`
    flex-direction: row;
    align-items: flex-start;

    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

const WinnerLine = styled(Frame)`
    width: 300px;
    height: 4px;
    border-radius: 2px;
    background: ${props => props.theme[props.color]};
    box-shadow: 0 0 10px ${props => props.theme[props.color]};
    position: absolute;
    visibility: ${props => props.coordinates ? `visible` : `hidden`};
    opacity: ${props => props.coordinates ? 1 : 0};
    transition: transform 0s;
    transform: rotate(${props => props.coordinates ? props.coordinates[2] : 0}deg) translate(${props => props.coordinates ? props.coordinates[0] : 0}px, ${props => props.coordinates ? props.coordinates[1] : 0}px);
`;

const Line = styled(Frame)`
    width: 300px;
    height: 1px;
    background: ${convertHex(`#ffffff`, 0.8)};
    position: absolute;
`;

let VerifiedSign = styled.img.attrs((props) => {
    let img
    try { img = require(`../../assets/images/ttt_circle.svg`) } catch (error) { }
    return ({ src: img, })
})` width: 100px; height: 100px;`

const Square = styled(Frame)`
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    &:hover {
        background: ${convertHex(`#ffffff`, 0.1)};
    }
    &:after {
        content: '';
        width: 100px;
        height: 100px;
        background: url("${props => require(`../../assets/images/ttt_${[`circle`, `cross`][+props.item ? +props.item : 0]}.svg`).default}") no-repeat center center;
        transition: 0.2s;
        transform: scale(${props => props.item === `-` ? 0 : 1});
    }
`;

const PlayFieldWrapper = styled(Frame)`
    width: 302px;
    height: 302px;
    padding: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 12px;
    background: ${props => props.theme.background.secondary};
    > * {
        &:nth-child(10) {
            transform: translate(0px, 50px);
        }
        &:nth-child(11) {
            transform: translate(0px, -50px);
        }
        &:nth-child(12) {
            transform: rotate(90deg) translate(0px, 50px);
        }
        &:nth-child(13) {
            transform: rotate(90deg) translate(0px, -50px);
        }
    }
`;

export default Playground;
/*eslint-enable*/