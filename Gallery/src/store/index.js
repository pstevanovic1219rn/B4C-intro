import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}



export default new Vuex.Store({
  state: {
    items: [],
    zaposleni: [],
    token: '',
    userId: ''
  },

  mutations: {

    addZaposlen(state, zaposlen){
      state.items.push(zaposlen);
    },

    removeZaposlen(state, zaposlen){
      state.items.pop(zaposlen);
    },

    editZaposlen(state, zaposlen){
      state.items.pop(zaposlen);
    },

    addZaposleni(state, zaposleni){
      var tmp = zaposleni.map(a => a.id);
      state.zaposleni = tmp;
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

    setUserID(state, id) {
      state.userId = id;
    },

    removeUserID(state) {
      state.userId = '';
    },
},
  actions: {
    
    fetchZaposlenById({ commit, state }, id){
      if(!isNaN(id)){
      
        return new Promise( (resolve, reject) => {
        const item = state.items.filter(item => item.id == id)[0];
        if(item)
          resolve(item);
        else {
          fetch(`http://127.0.0.1:8000/api/zaposleni/${id}`, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${state.token}`}})
            .then( obj => obj.json())
            .then( res => {
              commit('addZaposlen', res);
              resolve(res[0]);
            });
          }
          });

        }
    },

    fetchZaposleni({ commit ,state}) {
      fetch('http://127.0.0.1:8000/api/zaposleni',{
        method: 'GET',
        headers: { 'Authorization': `Bearer ${state.token}`}}
      )
          .then( obj => obj.json() )
          .then( res => commit('addZaposleni', res) );
    },

    search({ commit ,state  }, q) {
      return new Promise( (resolve, reject) => {
        console.log(`http://localhost:8000/api/zaposleni/q=${q}`,{
          method: 'GET',
          headers: { 'Authorization': `Bearer ${state.token}`}});
        fetch(`http://localhost:8000/api/zaposleni/q=${q}`)
          .then( obj => obj.json())
          .then( res => {
            var data = JSON.parse(JSON.stringify(res));
            console.log(data);
            var ids = [];
            data.forEach(zaposlen =>{
              ids.push(zaposlen.id)
            })
            commit('addZaposlen',ids)
            resolve(data.total);
          });
      });
    },

    deleteZaposlenById({ commit, state }, id){
      if(!isNaN(id)){
      
          fetch(`http://127.0.0.1:8000/api/zaposleni/${id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${state.token}`}})
            .then( obj => obj.json())
            .then( res => {
              commit('removeZaposlen', res);
              resolve(res[0]);
            });
        }
    },

    editZaposlenById({ state }, obj) {
      const id = obj.id;
      fetch(`http://127.0.0.1:8000/api/zaposleni/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}` },
        body: JSON.stringify(obj)
      }).then( obj => obj.json())
      .then( res => {
        commit('addZaposlen', res.id);
        resolve(res[0]);
      });
    },

    insert({ state }, obj) {
      console.log(obj);
      fetch('http://127.0.0.1:8000/api/zaposleni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}` },
        body: JSON.stringify(obj)
      })
    },

    register({ commit }, obj) {
      fetch('http://127.0.0.1:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          commit('setToken', tkn.token);

          var parsed = parseJwt(tkn.token);
          var data = JSON.parse(JSON.stringify(parsed));
          commit('setUserID', data.userID);
        });
    },

    login({ commit }, obj) {
      fetch('http://127.0.0.1:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          console.log(tkn.token)
          commit('setToken', tkn.token)
        }
      });
    },
  }
})
