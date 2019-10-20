<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row
      v-for="(counter, index) in counters"
      :key="index"
      class="mt-8"
      style="width: 100%"
    >
      <v-col
        :cols="2"
      >
        <v-btn
          class="pa-5 display-1 font-weight-bold"
          color="error"
          x-large
          dark
          style="height: auto"
          @click.end="click(index)"
        >
          <v-icon x-large>
            mdi-minus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          class="pa-5 d-flex justify-space-between display-1 font-weight-bold"
          block
          color="primary"
          x-large
          dark
          style="height: auto"
          @click.end="click(index, true)"
        >
          <v-icon x-large>
            mdi-{{ counter.icon }}
          </v-icon>
          <span>{{ counter.name }}</span>
          <span>{{ counter.total }}</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-fab-transition>
      <v-btn
        v-if="startTime"
        color="success"
        fab
        large
        dark
        bottom
        right
        style="z-index: 100;
              right: 7px;
              bottom: 63px;
              position: fixed;"
        @click.end="save()"
      >
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-bottom-sheet v-model="resetSheet">
      <v-sheet class="text-center pa-8">
        <p>
          Reset the counter?
        </p>
        <v-btn
          color="success"
          @click="reset()"
        >
          RESET
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import { saveAs } from 'file-saver'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      resetSheet: false
    }
  },
  computed: {
    counters () {
      return this.$store.state.counters
    },
    startTime () {
      return this.$store.state.startTime
    },
    username () {
      return this.$store.state.username
    }
  },
  methods: {
    click (index, increment) {
      if (!this.$store.state.startTime) {
        this.toggleStartTime()
      }

      increment ? this.$store.commit('increment', index) : this.$store.commit('decrement', index)
    },
    save () {
      const endTime = new Date()
      const date = this.startTime.toISOString().split('T')[0]
      let text =
`Traffic Watch

User:     ${this.username}
Date:     ${date}
Start:    ${this.startTime.toLocaleTimeString()}
End:      ${endTime.toLocaleTimeString()}


`
      let maxNameLength = 0
      for (const counter of this.counters) {
        if (counter.name.length > maxNameLength) {
          maxNameLength = counter.name.length
        }
      }

      let total = 0
      for (const counter of this.counters) {
        let name = `${counter.name}:`
        while (name.length < (maxNameLength + 1)) {
          name = `${name} `
        }
        text += `${name.replace('_', ' ')}          ${counter.total}\n`
        total += counter.total
      }

      let totalText = 'TOTAL:'
      while (totalText.length < (maxNameLength + 1)) {
        totalText = `${totalText} `
      }
      text += `${totalText.replace('_', ' ')}          ${total}\n`

      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `Traffic Watch-${this.username}-${date}`)

      this.resetSheet = true
    },
    reset () {
      this.resetCounters()
      this.resetSheet = false
    },
    ...mapMutations({
      toggleStartTime: 'toggleStartTime',
      resetCounters: 'resetCounters'
    })
  }
}
</script>
