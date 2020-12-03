/*eslint-disable*/
import firebase from 'firebase'

let UsersAPI = {
    parselessLogin: async (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                return user
            })
            .catch((error) => { console.log(error); });
    },

    parselessSignup: async (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                return user
            })
            .catch((error) => { console.log(error); });

    },

    parselessLogout: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    parselesslyGetCurrentUser: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    getUsersByIds: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    updateUser: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    getAllUsers: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    getAllFranchisees: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    getAllTrainers: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    getAllFranchiseesAndTrainers: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    getUserById: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    createUser: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    deleteUser: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

}

export default UsersAPI;
/*eslint-enable*/