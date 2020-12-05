/*eslint-disable*/
import firebase from 'firebase'

import * as types from '../action-types'
import UsersAPI from '../../api/users-api';

//LOGIN
let startLoggingIn = () => {
    return {
        type: types.LOGIN
    }
}
let onLoggedIn = (user) => {
    return {
        type: types.LOGIN_SUCCESS,
        user: user
    }
}
let onLoginFailed = (error) => {
    return {
        type: types.LOGIN_FAIL,
        error: error
    }
}

//thunk
export function logIn(data) {
    return (dispatch, getState) => {
        dispatch(startLoggingIn());
        return UsersAPI.parselessLogin(data).then(
            user => dispatch(onLoggedIn(user)),
            error => dispatch(onLoginFailed(error))
        )
    }
}

//SIGNUP
let startSigningUp = () => {
    return {
        type: types.SIGNUP
    }
}
let onSignedUp = (user) => {
    return {
        type: types.SIGNUP_SUCCESS,
        user: user
    }
}
let onSignUpFail = (error) => {
    return {
        type: types.SIGNUP_FAIL,
        error: error
    }
}

//thunk
export function signUp(data) {
    return (dispatch, getState) => {
        dispatch(startSigningUp())
        return UsersAPI.parselessSignup(data).then(
            user => dispatch(onSignedUp(user)),
            error => dispatch(onSignUpFail(error))
        )
    }
}

//LOGOUT
let startLoggingOut = () => {
    return {
        type: types.LOGOUT
    }
}
let onLogoutFail = () => {
    return {
        type: types.LOGOUT_FAIL
    }
}
let onLoggedOut = () => {
    return {
        type: types.LOGOUT_SUCCESS
    }
}

//thunk
export function logOut() {
    return (dispatch, getState) => {
        var usersState = getState().users;
        if (usersState.currentUserId === undefined) {
            return Promise.resolve()
        }
        dispatch(startLoggingOut());
        return UsersAPI.parselessLogout().then(
            () => dispatch(onLoggedOut()),
            () => dispatch(onLogoutFail())
        )
    }
}

//AUTH_INIT
let startAuthInit = () => {
    return {
        type: types.INITIALIZE_AUTH
    }
}
let authInitFailed = (err) => {
    return {
        type: types.INITIALIZE_AUTH_FAIL,
        error: err
    }
}
let authInitSuccess = (d) => {
    return {
        type: types.INITIALIZE_AUTH_SUCCESS,
        ...d
    }
}

//thunk
export function initializeAuthorization() {
    return (dispatch, getState) => {
        dispatch(startAuthInit());
        return UsersAPI.parselesslyGetCurrentUser().then(
            d => dispatch(authInitSuccess(d)),
            err => dispatch(authInitFailed())
        );
    }
}

//USERS
let loadUsers_ = () => {
    return {
        type: types.LOAD_USERS
    }
}

let loadUsersFail = (error) => {
    return {
        type: types.LOAD_USERS_FAIL,
        error: error
    }
}

let loadUsersSuccess = (users, links) => {
    return {
        type: types.LOAD_USERS_SUCCESS,
        users: users
    }
}

export function loadUsersByIds(ids) {
    return (dispatch, getState) => {
        dispatch(loadUsers_());
        return UsersAPI.getUsersByIds(ids).then(
            users => dispatch(loadUsersSuccess(users)),
            error => dispatch(loadUsersFail(error))
        )
    }
}

// update user

let updateUser_ = () => {
    return {
        type: types.UPDATE_USER
    }
}

let updateUserFail = (err) => {
    return {
        type: types.UPDATE_USER_FAIL,
        error: err
    }
}

export let updateUserSuccess = (user) => {
    return {
        type: types.UPDATE_USER_SUCCESS,
        user: user
    }
}

//thunk
export function updateUser(data) {
    return (dispatch, getState) => {
        // let {currentUserId, usersMap} = getState().users;
        // data.id = currentUserId;
        dispatch(updateUser_());
        return UsersAPI.updateUser(data).then(
            user => dispatch(updateUserSuccess(user)),
            err => dispatch(updateUserFail(err))
        )

    }
}

//load all users
export function loadAllUsers() {
    return (dispatch, getState) => {
        dispatch(loadUsers_())
        return UsersAPI.getAllUsers().then(
            users => dispatch(loadUsersSuccess(users)),
            err => dispatch(loadUsersFail(err))
        )
    }
}

export function loadAllFranchisees() {
    return (dispatch, getState) => {
        dispatch(loadUsers_())
        return UsersAPI.getAllFranchisees().then(
            users => dispatch(loadUsersSuccess(users)),
            err => dispatch(loadUsersFail(err))
        )
    }
}

export function loadAllTrainers() {
    return (dispatch, getState) => {
        dispatch(loadUsers_())
        return UsersAPI.getAllTrainers().then(
            users => dispatch(loadUsersSuccess(users)),
            err => dispatch(loadUsersFail(err))
        )
    }
}

export function loadAllTrainersAndFranchisees() {
    return (dispatch, getState) => {
        dispatch(loadUsers_())
        return UsersAPI.getAllFranchiseesAndTrainers().then(
            users => dispatch(loadUsersSuccess(users)),
            err => dispatch(loadUsersFail(err))
        )
    }
}

export function loadUserById(userId) {
    return (dispatch, getState) => {
        dispatch(loadUsers_())
        return UsersAPI.getUserById(userId).then(
            u => dispatch(loadUsersSuccess([u])),
            err => dispatch(loadUsersFail(err))
        )
    }
}

let createUser_ = () => {
    return {
        type: types.CREATE_USER
    }
}
let createUserSuccess = (user) => {
    return {
        type: types.CREATE_USER_SUCCESS,
        user: user
    }
}
let createUserFailed = (error) => {
    return {
        type: types.CREATE_USER_FAIL,
        error: error
    }
}

//thunk
export function createUser(data) {
    return (dispatch, getState) => {
        dispatch(createUser_());
        return UsersAPI.createUser(data).then(
            user => dispatch(createUserSuccess(user)),
            error => dispatch(createUserFailed(error))
        )
    }
}

let deleteUser_ = () => {
    return {
        type: types.DELETE_USER
    }
}
let deleteUserSuccess = (id) => {
    return {
        type: types.DELETE_USER_SUCCESS,
        id: id
    }
}
let deleteUserFailed = (error) => {
    return {
        type: types.DELETE_USER_FAIL,
        error: error
    }
}

//thunk
export function deleteUser(id) {
    return (dispatch, getState) => {
        dispatch(deleteUser_());
        return UsersAPI.deleteUser(id).then(
            data => dispatch(deleteUserSuccess(id)),
            error => dispatch(deleteUserFailed(error))
        )
    }
}

/*eslint-enable*/