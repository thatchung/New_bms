import actions from './actions';
import getters from './getters';
import mutations from './mutations.js';


export const state = () => ({
  session: null,
  profile: {}
});

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
