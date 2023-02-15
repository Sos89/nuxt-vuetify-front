<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <m-header
            page-title="Home"
            v-model="searchable"
            :nav-data="navItems"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-if="getProducts"
          v-for="(product, index) of filteredList"
          :key="index"
        >
          <product-card
            :loading="isLoading"
            @reserve="reset(product.id)"
            @edit="editProduct(product.id)"
            btn="Edit"
            reserve="Reserve"
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
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MHeader from '~/components/layout/M-Header'
export default {
  name: 'IndexPage',
  middleware: ['auth'],
  components: { MHeader },
  async fetch() {
    await this.fetchProducts()
  },
  data() {
    return {
      searchable: '',
      navItems: [
        { title: 'Home', linkTo: '/admin' },
        { title: 'Create Product', linkTo: '/admin/create' },
        { title: 'Categories', linkTo: '/admin/category'}
      ],
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters('products', ['getProducts']),
    filteredList() {
      return this.getProducts.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.searchable.toLowerCase())
      })
    },
  },

  methods: {
    ...mapActions('products', ['fetchProducts', 'editProduct']),
    reset(id) {
      alert(id)
      this.isLoading = !this.isLoading
    },
    editProduct(id) {
      this.$router.push(`/admin/edit/${id}`)
    },
  },
}
</script>
<style scoped></style>
