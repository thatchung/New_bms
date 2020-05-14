import actions from './actions';
import getters from './getters';
import mutations from './mutations.js';



export const state = () => ({
  account: {},
});


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
