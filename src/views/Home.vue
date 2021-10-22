<template>
  <v-app>
    <Header />
    <router-view></router-view>
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
  import Header from '../components/Header.vue'
  // import Footer from '../components/Footer.vue'

  export default {
    name: 'Home',

    components: {
      Header, 
      // Footer,
    },
  }
</script>
