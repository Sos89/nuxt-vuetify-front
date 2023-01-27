export const state = () => ({
  categories: null
})

export const getters = {
  getCategory(state){
    return state.categories
  }
}

export const mutations = {
  setCategories(state, categories){
    state.categories = categories
  }
}

export const actions = {
  async fetchCategories({ commit }){
    try {
      const { data } = await this.$axios.get('/api/categories', )
      commit('setCategories', data)
    }
    catch (err){
      commit('setError', err.response.data.errors)
    }
  },
  async createCategory({ commit }, name){
    const { data } = await this.$axios.post('/api/categories', {name: name})
  }
}
