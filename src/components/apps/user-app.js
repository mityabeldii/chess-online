/*eslint-disable*/
import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useMappedState } from 'redux-react-hook'
import firebase from 'firebase'
import moment from 'moment-timezone'

import { Frame, Button, Link, convertHex, P } from '../ui-kit/styled-templates'
import SinglePlayer from '../pages/single-player'
import Multiplayer from '../pages/multiplayer'
import HistoryPage from '../pages/history-page'
import DocsPage from '../pages/docs-page'
import UsersPage from '../pages/users-page'
import InvitePopUp from '../pop-ups/invite-pop-up'

import useCurrentUser from '../../hooks/useCurrentUser'
import { customHandler } from '../../hooks/useCustomDispatch'

let menu_items = [
    {
        label: 'Single player',
        link: '/single_player',
    },
    {
        label: 'Multiplayer',
        link: '/multiplayer',
    },
    // {
    //     label: 'History',
    //     link: '/history',
    // },
    {
        label: 'Users',
        link: '/users',
    },
    {
        label: 'Docs',
        link: '/docs',
    },
]

let UserApp = () => {

    let path = useLocation()
    let { currentUser, logOut } = useCurrentUser()
    let { users } = useMappedState(useCallback((state) => ({ users: state.users.usersMap.toArray() }), []))

    useEffect(() => { firebase.database().ref(`users/${currentUser.id}/timestamp`).set(+moment()) }, [path])

    useEffect(() => {
        firebase.database().ref(`games`).on('value', (snapshot) => {
            let games = Object.values(snapshot.val() || [])
            let invitation = games.filter(i => i.status === `waiting` && i.player_2 === currentUser.id)[0]
            if (invitation) {
                customHandler(`OPEN_INVITE_POP_UP`, { invitor: invitation.player_1, game_id: invitation.id })
            }
        })
    }, [])

    return (
        <Wrapper>
            <InvitePopUp />
            <Menu>
                <Link to={`/`} ><Header>tic tac toe</Header></Link>
                <Body>
                    <MenuTitle>Menu</MenuTitle>
                    {
                        menu_items.map((item, index) => {
                            return (
                                <Link to={item.link} key={index} >
                                    <MenuItem selected={path.pathname === item.link} >
                                        {item.label}
                                    </MenuItem>
                                </Link>
                            )
                        })
                    }
                </Body>
                <Body>
                    {/* <MenuTitle>Players online</MenuTitle>
                    {users.map((item, index) => {
                        return (
                            <MenuTitle key={index} >{item.username}</MenuTitle>
                        )
                    })} */}
                </Body>
                <Footer>
                    <Button shaped background={convertHex(`#ffffff`, 0.3)} extra={`width: 220px !important; margin-bottom: 15px;`} onClick={() => { window.open(`https://github.com/Nymaxxx/tik-toe-toy-online`) }} >
                        GitHub
                    </Button>
                    <Button shaped background={convertHex(`#ffffff`, 0.3)} extra={`width: 220px !important;`} onClick={logOut} >Log out</Button>
                </Footer>
            </Menu>
            <Workspace is_empty={path.pathname === `/`} >
                <Switch>
                    <Route exact path={`/single_player`} component={SinglePlayer} />
                    <Route exact path={`/multiplayer`} component={Multiplayer} />
                    <Route exact path={`/multiplayer/:game_id`} component={Multiplayer} />
                    {/* <Route exact path={`/history`} component={HistoryPage} /> */}
                    <Route exact path={`/docs`} component={DocsPage} />
                    <Route exact path={`/users`} component={UsersPage} />
                </Switch>
            </Workspace>
        </Wrapper>
    )
}

const GitHub = styled(Frame)`
    width: 30px;
    height: 30px;
    background: url("${() => require(`../../assets/images/github.svg`).default}") no-repeat center center;
`;

const MenuTitle = styled(Frame)`
    width: 100%;
    align-items: flex-start;
    font-size: 12px;
    color: red;
    color: ${props => props.theme.text.secondary} !important;
    margin: 10px 0 10px 15px;
`;

const MenuItem = styled(Frame)`
    width: calc(220px - 2 * 15px);
    height: calc(45px - 2 * 15px);
    padding: 15px;
    align-items: flex-start;
    border-radius: 12px;
    font-size: 13px;
    color: ${props => props.selected ? `white` : props.theme.text.secondary};
    &:hover {
        opacity: 0.8;
    }
`;

const Header = styled(Frame)`
    width: 220px;
    margin-top: 2vh;
    font-size: 20px;
    font-weight: bold;
    align-items: flex-start;
`;

const Body = styled(Frame)`
    margin: 2vh 0;
    width: 220px;
    justify-content: flex-start;
`;

const Footer = styled(Frame)`
    margin-bottom: 2vh;
`;

const Menu = styled(Frame)`
    width: 250px;
    height: 96vh;
    margin-left: 2vh;
    border-radius: 12px;
    background: ${props => props.theme.background.secondary};
    > * {
        &:nth-child(1) { height: 100%; flex: 1; }
        &:nth-child(2) { height: 100%; flex: 4; }
        &:nth-child(3) { height: 100%; flex: 4; }
        &:nth-child(4) { height: 100%; flex: 1; }
    }

    @media only screen and (max-width: 600px) {
        width: 100vw;
        position: fixed;
        transform: translateX(-100%);
    }
`;

const Workspace = styled(Frame)`
    width: 100%;
    flex: 1;
    height: 96vh;
    margin-left: 15px;
    border-radius: 12px;
    &:after {
        content: '${props => props.is_empty ? `Empty` : ``}';
        color: ${props => props.theme.text.secondary};
        font-size: 14px;
    }

    @media only screen and (max-width: 600px) {
        width: 0vw;
        width: 90vw;  
    }
`;

const Wrapper = styled(Frame)`
    width: 100vw;
    height: 100vh;
    flex-direction: row;
    * {
        /* border: 1px solid red; */
    }

    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

export default UserApp;
/*eslint-enable*/