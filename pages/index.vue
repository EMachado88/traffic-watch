<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-btn
      v-for="(counter, index) in counters"
      :key="index"
      class="pa-5 mt-8 d-flex justify-space-between title"
      block
      color="secondary"
      x-large
      dark
      style="height: auto"
      @click.end="click(counter)"
    >
      <v-icon>
        mdi-{{ counter.icon }}
      </v-icon>
      <span>{{ counter.name }}</span>
      <span>{{ counter.total }}</span>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      counters: [
        {
          name: 'Cars',
          icon: 'car',
          total: 0
        },
        {
          name: 'Trucks',
          icon: 'truck',
          total: 0
        }
      ]
    }
  },
  methods: {
    click (counter) {
      counter.total++
    }
  }
}
</script>
