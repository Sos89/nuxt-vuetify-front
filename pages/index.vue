<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <m-header
          page-title="Home"
          v-model="searchable"
          :nav-data="navItems"
          @clickBars="dd"
        />
      </v-col>
    </v-row>
    <v-row v-if="isBasket" class="basket_content">
      <v-expand-transition>
        <v-banner elevation="24" min-width="370px">
          <v-row>
            <v-col>
              <v-btn @click="closeBasket" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(product, index) of getBasket" :key="product.id" class="d-flex align-center">
              <div>
                <v-img
                  :src="`http://127.0.0.1:8000/images/${product.image}`"
                  max-width="100px"
                  height="100px"
                ></v-img>
              </div>
              <v-col class="d-flex align-center">
                <div class="quantity mx-1">
                  <v-btn @click="minus(index)" icon small>
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-1"> {{ product.quantity }}</span>
                  <v-btn @click="plus(index)" icon small>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
                <div class="basketPrice mx-1">x {{ product.price }}</div>
                <v-btn @click="deleteProductFromBasket(index)" class="mx-2" icon small>
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
          <v-row class="d-flex align-center flex-column" v-if="getBasket.length > 0">
            <v-col>
              Total: {{ basketTotal }}
            </v-col>
            <v-col>
              <v-btn>Checkout</v-btn>
            </v-col>
          </v-row>
        </v-banner>
      </v-expand-transition>

    </v-row>
    <v-row>
      <v-col v-for="(product, index) of filteredList" :key="index">
        <product-card
          :loading="isLoading"
          @reserve="reset(product)"
          :image="`http://127.0.0.1:8000/images/${product.image}`"
          reserve="Reserve"
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MHeader from '~/components/layout/M-Header'
export default {
  name: 'IndexPage',
  components: { MHeader },
  async fetch() {
    await this.fetchProducts()
  },
  data() {
    return {
      searchable: '',
      navItems: [
        { title: 'Home', linkTo: '/' },
        { title: 'About Us', linkTo: '#' },
        { title: 'Categories', linkTo: '/category' },
        { title: 'Services', linkTo: '#' },
        { title: 'Blog', linkTo: '#' },
        { title: 'Contact Us', linkTo: '#' },
      ],
      isLoading: false,
      isBasket: false,
      show: false,
    }
  },
  computed: {
    ...mapGetters('products', ['getProducts', 'getBasket']),
    filteredList() {
      return this.getProducts.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.searchable.toLowerCase())
      })
    },
    basketTotal(){
      this.isBasket = true
      let res = []
      for (let item of this.getBasket){
        res.push(item.price * item.quantity)
      }
      res = res.reduce( (sum, el) => {
        return sum + el
      })
      return Math.floor(res)

    }
  },

  methods: {
    ...mapMutations('products', ['setPlusProduct', 'setMinusProduct']),
    ...mapActions('products', [
      'fetchProducts',
      'editProduct',
      'reserveProduct',
      'minusProduct',
      'plusProduct',
      'destroyFromBasket'
    ]),
    reset(product) {
      this.reserveProduct(product)
    },
    dd() {
      this.isBasket = !this.isBasket
    },
    closeBasket() {
      this.isBasket = false
    },
    minus(index) {
      this.minusProduct(index)
    },
    plus(index) {
      this.plusProduct(index)
    },
    deleteProductFromBasket(index){
      this.destroyFromBasket(index)
    }
  },
  mounted() {
  },
}
</script>
<style scoped>
.basket_content {
  position: fixed;
  background: white;
  top: 0;
  right: 0;
  z-index: 11;
  height: 100vh;
  width: 400px;
  overflow-y: auto;
  padding: 10px;
}
</style>
