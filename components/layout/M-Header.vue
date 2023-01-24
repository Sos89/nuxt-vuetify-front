<template>
  <v-app-bar
    elevation="3"
    color="indigo"
  >
    <v-col cols="6">
      <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
    </v-col>
    <v-col cols="6" class="d-flex align-center justify-end" v-if="$auth.loggedIn">
      <v-col>
        <v-text-field
          label="Search"
          v-model="searchable"
          hide-details="auto"
          color="black"
          class="searchInput"
        ></v-text-field>
      </v-col>
      <v-btn icon>
        <v-icon @click="search">mdi-magnify</v-icon>
      </v-btn>
      <nuxt-link to="#" class="float-right logoutBtn" @click.prevent="logout">logout</nuxt-link>
    </v-col>
    <v-col cols="6" v-else>
      <v-btn icon class="float-right">
        <v-icon @click="search">mdi-magnify</v-icon>
      </v-btn>
    </v-col>

  </v-app-bar>
</template>

<script>
export default {
  name: "M-Header",
  props: {
    pageTitle: {
      type: String
    }
  },
  data(){
    return {
      searchable: '',
      isSearchInput: false
    }
  },
  methods: {
    search(){
      this.isSearchInput = !this.isSearchInput
    },
    async logout(){
      await this.$auth.logout()
      this.$router.push('/login')
      // this.$notify({
      //   group: 'foo',
      //   title: 'This is the <em>title</em>',
      //   text: 'This is some <b>content</b>',
      //   type: 'error',
      //   duration: 5000,
      //   speed: 1000,
      //   data: {}
      // })
    }
  }
}
</script>

<style scoped>
  .logoutBtn{
    text-decoration: none;
    color: white;
  }
  .searchInput{
    border: none;
    width: 50%;
    margin-left: auto;
  }
</style>
