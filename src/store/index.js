import { createStore } from "vuex";

export const state = () => {
  return {
    isLoggedIn: false,
  };
};

export const mutations = {
  LOGIN_USER(state) {
    // (other than React) in Vue nothing wrong with updating the state directly
    state.isLoggedIn = true;
  },
};

const store = createStore({
  state,
  mutations,
  // strict mode is only for development. it ensures that state is only mutated in a *mutation*
  strict: process.env.NODE_ENV !== "production",
});

export default store;
