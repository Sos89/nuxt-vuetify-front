export const state = () => ({
  products: null,
  product: null,
  error: null
})

export const getters = {
  getProducts(state){
    return state.products
  },
  getProduct(state){
    return state.product
  },
  getError(state) {
    return state.error
  }
}

export const mutations = {
  setProducts(state, products){
    state.products = products
  },
  setOneProduct(state, product){
    state.product = product
  },
  setError(state, error){
    state.error = error
  }
}

export const actions = {
  async createProduct({commit}, product){
    try {
      await this.$axios.post('/api/products', product)
      return true
    }catch (e){
      commit('setError', e.response.data.errors)
    return false
    }
  },
  async fetchProducts( { commit }){
    try {
      const { data }  = await this.$axios.get('/api/products')
      commit('setProducts', data.data)
    }catch (err){
      console.log(err)
    }
  },
  async fetchOneProduct( { commit }, id){
    try {
      const {data} = await this.$axios.get(`/api/products/${id}`)
      commit('setOneProduct', data.data)
    }catch (err){
      console.log(err.response.data, 'sdf')
    }
  },
  async deleteFindProduct({commit}, id){
    try {
      const response = await this.$axios.delete(`/api/products/${id}`)
    }
    catch (err){
      commit('setError', err.response.data.errors)
    }
  }
}
