export const state = () => ({
  counter: 0,
  isLoggedIn: false,
  name: "Not Logged In"
});

export const getters = {
  getLogin(state) {
    return state.name;
  },
  getLoginState(state) {
    return state.isLoggedIn;
  }
};

export const mutations = {
  setLogin(state, name) {
    console.log("calling setloing: ", name);
    state.isLoggedIn = true;
    state.name = name;
  }
};
