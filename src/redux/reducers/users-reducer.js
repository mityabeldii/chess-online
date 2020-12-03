/*eslint-disable*/
import { Map, Set } from 'immutable'
import * as types from '../action-types'

const initialState = {
    usersMap: Map(),
    currentUserId: undefined,
    loading: false,
    error: undefined,
    initialized: false
}

const UsersReducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case types.CREATE_USER:
        case types.UPDATE_USER:
        case types.LOAD_USERS:
        case types.SIGNUP:
        case types.LOGOUT:
        case types.LOGIN:
            return {
                ...state,
                loading: true,
                error: undefined
            }
        case types.CREATE_USER_FAIL:
        case types.UPDATE_USER_FAIL:
        case types.LOAD_USERS_FAIL:
        case types.LOGIN_FAIL:
        case types.LOGOUT_FAIL:
        case types.SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            }


        case types.INITIALIZE_AUTH:
            return {
                ...state,
                loading: true,
                initialized: false,
                error: undefined
            }

        case types.INITIALIZE_AUTH_FAIL:
            return {
                ...state,
                loading: false,
                initialized: false,
                error: action.error
            }

        case types.SIGNUP_SUCCESS:
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                currentUserId: action.user.id,
                usersMap: state.usersMap.set(action.user.id, action.user),
                loading: false
            }

        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUserId: undefined,
                loading: false
            }

        // case types.INITIALIZE_AUTH_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         initialized: true,
        //         currentUserId: (action.user === undefined) ? undefined : action.user.id,
        //         usersMap: (action.user === undefined) ? state.usersMap : state.usersMap.set(action.user.id, action.user)
        //     }

        case types.INITIALIZE_AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                initialized: true,
                currentUserId: action.id,
                usersMap: (action.id === undefined) ? state.usersMap : state.usersMap.set(action.id, action)
            }

        case types.LOAD_USERS_SUCCESS:
        case types.LOAD_GROUPS_LINKS_USERS_SUCCESS:
            return {
                ...state,
                usersMap: state.usersMap.merge(action.users.reduce((res, u) => {
                    return res.set(u.id, u)
                }, Map())),
                loading: false
            }

        case types.UPDATE_USER_SUCCESS:
        case types.CREATE_USER_SUCCESS:
            return {
                ...state,
                usersMap: state.usersMap.set(action.user.id, action.user),
                loading: false
            }

        default:
            return state;

    }

}

export default UsersReducer;

/*eslint-enable*/