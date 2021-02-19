export const state = () => ({
  counter: 0,
  isLoggedIn: false
});

export const getters = {
  getLogin(state) {
    return state.isLoggedIn;
  }
};

export const mutations = {
  setLogin(state) {
    state.isLoggedIn = true;
  }
};
