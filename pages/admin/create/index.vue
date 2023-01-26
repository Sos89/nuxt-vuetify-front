<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <m-header page-title="Home" :nav-data="navItems" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <v-form ref="createForm" v-model="valid">
              <v-file-input
                accept="image/*"
                label="File input"
                @click="onImageChange"
                v-model="form.image"
                :rules="fileRules"
                multiple
              ></v-file-input>
              <v-select
                :items="items"
                label="Standard"
                v-model="form.categories"
                :rules="selectRules"
              ></v-select>
              <m-input type="text" label="Title" v-model="form.title" :rules="[rules.required, rules.min]"/>
              <m-input type="text" label="Description" v-model="form.description" :rules="[rules.required, rules.min]"/>
              <m-input type="text" label="Price" v-model="form.price" :rules="numberRules"/>
              <v-btn @click.prevent="createProd" type="success">Create</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MHeader from '~/components/layout/M-Header'
import MInput from "@/components/M-Input";
export default {
  name: "index",
  middleware: 'admin-middleware',
  components: {MHeader, MInput},
  data(){
    return {
      valid: true,
      form: {
        categories: '',
        title: '',
        image: [],
        description: '',
        price: '',
        quantity: ''
      },
      navItems: [
        { title: 'Home', linkTo: '/admin' },
        { title: 'Create Product', linkTo: '/admin/create' }
      ],
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      rules: {
        required: value => !!value || "This field may not be empty.",
        min: v => (v && v.length >= 3) || "Min 3 characters"
      },
      fileRules: [
        v => !!v || 'File is required',
        v => (v && v.size > 0) || 'File is required',
      ],
      selectRules: [(v) => !!v || "Item is required"],
      numberRules: [
        v => v.length > 0 || 'This field may not be empty',
        v => v > 0 || 'The value must be greater than zero'
      ]
    }
  },
  methods: {
    ...mapActions('products', ['createProduct']),
    ...mapMutations('products', ['setError']),
    onImageChange(e) {
      this.form.image = e.target.files[0];
    },


    async createProd() {
      if (this.$refs.createForm.validate()) {
        let formData = new FormData();
        formData.append('image', this.form.image);
        formData.append('title', this.form.title);
        formData.append('description', this.form.description);
        formData.append('price', this.form.price);
        formData.append('categories', this.form.categories);

        const isCreated = await this.createProduct(formData)
        if (isCreated) {
          this.form.title = ''
          this.form.description = ''
          this.form.price = ''
          this.form.categories = ''
          this.$router.push('/admin')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
