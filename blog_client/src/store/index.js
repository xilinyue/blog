import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null
    },
    mutations: {
        login (state,user) {
            state.userInfo = user;
        }
    },
    actions: {
        login (context,user) {
            context.commit('login',user)
        }
    },
    modules: {
    }
})