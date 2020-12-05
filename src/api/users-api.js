/*eslint-disable*/
import firebase from 'firebase'
require('firebase/auth')

let UsersAPI = {
    parselessLogin: async (data) => {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((d) => {
                    let user = { email: d.user.email, id: d.user.uid, userRole: `user` }
                    firebase.database().ref(`users/${user.id}`).set(user)
                        .then(() => {
                            resolve(user)
                        })
                })
                .catch((d) => { reject(d) })
        })
    },

    parselessSignup: async (data) => {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.create_password)
                .then((d) => {
                    delete data.create_password
                    delete data.confirm_password
                    delete data.rememberMe
                    firebase.database().ref(`users/${d.user.uid}`).set({ ...data, id: d.user.uid, userRole: `user` })
                        .then(() => {
                            resolve({ ...data, id: d.user.uid, userRole: `user` })
                        })
                })
                .catch((d) => { reject(d) })
        })
    },

    parselessLogout: async () => {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut()
                .then((d) => { resolve() })
                .catch((d) => { reject() })
        })
    },

    parselesslyGetCurrentUser: async () => {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                user = firebase.auth().currentUser
                if (user) {
                    firebase.database().ref(`users/${user.uid}`).once('value').then((d) => {
                        resolve(d.val())
                    })
                } else {
                    resolve(undefined)
                }
            })
        })
    },

    getUsersByIds: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    updateUser: async () => {
        return await (() => { setTimeout(() => { return null }, 1000) })
    },

    getAllUsers: async () => {
        return new Promise((resolve, reject) => {
            firebase.database().ref(`users`).once('value')
                .then((d) => { resolve(Object.values(d.val())) })
                .catch((d) => { reject(d) })
        })
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