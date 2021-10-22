<template>
  <nav>
    <v-app-bar
      app
      color="#16ABF8"
      dark
      style="height: 105px"
      class="d-flex align-center"
    >
      <v-toolbar-title class="header-title" data-cy="header-title">TO DO LIST APP</v-toolbar-title>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .header-title {
    /* header-title */
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */
    text-transform: uppercase;
    color: #FFFFFF;
    
    @media only screen and (min-width: 768px) {
      margin-left: 200px;
    }
  }
</style>