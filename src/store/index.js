import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        userinfo:{
            user:'',
            paw:''
        }
    },
    mutations:{
        setUser(state,payload){
            state.userinfo = payload;
        }
    }
})

export default store;