import { createStore } from "vuex";

import state from "@/store/state";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
import actions from "@/store/actions";

const store = createStore({
  state,
  mutations,
  getters,
  actions,
  // strict mode is only for development. it ensures that state is only mutated in a *mutation*
  strict: process.env.NODE_ENV !== "production",
});

export default store;
