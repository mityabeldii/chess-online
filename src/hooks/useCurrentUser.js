/*eslint-disable*/
import { useCallback } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'

import * as usersActions from '../redux/actions/users-actions'
import CommonHelper from '../helpers/CommonHelper'

let useCurrentUser = () => {

    let dispatch = useDispatch()

    return useMappedState(useCallback(state => {
        let currentUser = state.users.currentUserId ? state.users.usersMap.get(state.users.currentUserId) : { userRole: `guest` }
        let userRole = state.users.currentUserId ? state.users.usersMap.get(state.users.currentUserId).userRole : `guest`
        return ({
            currentUser,
            userRole,
            isAdmin: userRole === `admin`,
            logOut: async () => {
                await dispatch(usersActions.logOut());
                CommonHelper.linkTo(`/`)
                // window.location.reload();
            },
            updateUser: async (info) => state.users.currentUserId ? await dispatch(usersActions.updateUser({ info: { ...info }, id: state.users.currentUserId })) : () => { },

        })
    }, []))
}

export default useCurrentUser;
/*eslint-enable*/