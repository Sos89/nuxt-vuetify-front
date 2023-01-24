export const state = () => ({
  resMessage: false
})

export const getters = {
  getErrorMessage(state){
    return state.resMessage
  }
}

export const mutations = {
  setErrorMessage(state, err){
    state.resMessage = err
  }
}

export const actions = {
  async loginUser({commit}, userData){
    try {
      const {data} = await this.$auth.loginWith('laravelSanctum', userData)
    }
    catch (err){
      console.log(err.response.data.data, 'error')
    }
  },
  async registerUser({commit}, userData){
    try {
      const {data} = await this.$axios.post('/api/register', userData)
    }
    catch (err){
      commit('setErrorMessage', err.response.data.data)
    }
  }
}
