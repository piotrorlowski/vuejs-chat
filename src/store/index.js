import Vue from 'vue';
import Vuex from 'vuex';
import { getUser } from '../api/users'

Vue.use(Vuex);

const date = new Date();

const store = new Vuex.Store({
    state: {
        users: [{
            id: 1,
            name: {first: "Ada"},
            picture: {medium: "https://randomuser.me/api/portraits/med/women/75.jpg"},
        }],
        messages: [{
            id: 1,
            text: "Hey, how are you doing today?",
            time: date.toLocaleString('pl-PL'),
            sender: {
                id: 1,
                name: "Ada",
                profilePicture: "https://randomuser.me/api/portraits/med/women/75.jpg",
                isResponse: false,
            },
        }]
    },
    mutations: {
        setUser(state, user) {
            state.users.push(user);
        },
        setMessage(state, message) {
            state.messages.push(message);
        },
    },
    actions: {
        async getUser(context) {
            const user = await getUser();
            context.commit('setUser', user);
        },
        sendMessage(context, message) {
            context.commit('setMessage', message);
        }
    }
});

export default store;
