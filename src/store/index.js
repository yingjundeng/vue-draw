import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


 const state={
       count:0,
	   city:0,
  }
 const mutations={
        CHANGE_COUNT(state,n=2){
			state.count = state.count+1
			console.log(n)
		},
		CHANGE_CITY(state,params){
			state.city = state.city+1+params.num
		}
  }
 const actions={
     CHANGE_CITY(context){
		 context.commit("CHANGE_CITY",{num:9})
	 }
  }


export default new Vuex.Store({
  state,
  mutations,
  actions,
})
