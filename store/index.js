export const state = () => ({
  trends: {},
  searchResults: {},
});

export const mutations = {
  setTrends(state, trends) {
    state.trends = trends;
  },

  setSearch(state, result) {
    state.searchResults = result;
  },
};

export const actions = {
  async getTrends({ commit }) {
    const trends = await this.$axios.$get(
      `/featured?key=${process.env.API_KEY}`
    );
    commit("setTrends", trends);
  },

  async getSearch({ commit }, query) {
    const search = await this.$axios.$get(
      `/search?q=${query}&key=${process.env.API_KEY}`
    );
    commit("setSearch", search);
  },
};
