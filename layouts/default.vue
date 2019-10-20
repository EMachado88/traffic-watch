<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation fixed>
      <v-btn value="counter">
        <span>Counter</span>
        <v-icon>mdi-counter</v-icon>
      </v-btn>

      <v-btn value="settings">
        <span>Settings</span>
        <v-icon>mdi-wrench</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Traffic Watch'
    }
  }
}
</script>
