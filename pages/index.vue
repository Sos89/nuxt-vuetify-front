<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <m-header
        page-title="Home"
      />
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <notifications type="error" group="foo" position="top right"/>

    </v-col>
  </v-row>
</template>

<script>
import MHeader from "~/components/layout/M-Header";
export default {
  name: 'IndexPage',
  components: {MHeader},
  methods: {

  },
  mounted() {
    console.log(this.$auth.user)
  }
}
</script>
<style scoped>
.my-notification{
  background: #000;
}
</style>
