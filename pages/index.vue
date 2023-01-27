<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <m-header page-title="Home" v-model="searchable" :nav-data="navItems" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(product, index) of getProducts" :key="index">
        <product-card
          :loading="isLoading"
          @reserve="reset"
          :image="`http://127.0.0.1:8000/images/${product.image}`"
        >
          <template v-slot:card-title>
            <span>{{ product.title }}</span>
          </template>
          <template v-slot:description>
            <span>{{ product.description }}</span>
          </template>
          <template v-slot:product-price>
            <span>Price {{ product.price }} $.</span>
          </template>
        </product-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MHeader from '~/components/layout/M-Header'
export default {
  name: 'IndexPage',
  components: { MHeader },
  async fetch(){
    await this.fetchProducts()
  },
  data() {
    return {
      searchable: '',
      navItems: [
        { title: 'Home', linkTo: '#' },
        { title: 'About Us', linkTo: '#' },
        { title: 'Team', linkTo: '#' },
        { title: 'Services', linkTo: '#' },
        { title: 'Blog', linkTo: '#' },
        { title: 'Contact Us', linkTo: '#' },
      ],
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters('products', ['getProducts'])
  },

  methods: {
    ...mapActions('products', ['fetchProducts', 'fetchOneProduct']),
    reset() {
      alert(123)
      this.isLoading = !this.isLoading
    },
  },
  mounted() {
    console.log(this.$auth.user)
  },
}
</script>
<style scoped></style>
