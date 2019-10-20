<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-btn
      v-for="(counter, index) in counters"
      :key="index"
      class="pa-5 mt-8 d-flex justify-space-between display-1 font-weight-bold"
      block
      color="secondary"
      x-large
      dark
      style="height: auto"
      @click.end="click(counter, true)"
    >
      <v-icon x-large>
        mdi-{{ counter.icon }}
      </v-icon>
      <span>{{ counter.name }}</span>
      <span>{{ counter.total }}</span>
    </v-btn>

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

export default {
  data () {
    return {
      resetSheet: false,
      startTime: false,
      username: 'Jules',
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
    click (counter, increment) {
      if (!this.startTime) {
        this.startTime = new Date()
      }
      increment ? counter.total++ : counter.total--
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
      this.resetSheet = false
      for (const counter of this.counters) {
        counter.total = 0
      }
      this.startTime = false
    }
  }
}
</script>
