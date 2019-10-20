export const state = () => ({
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
  ],
  startTime: false
})

export const mutations = {
  increment (state, index) {
    state.counters[index].total++
    // eslint-disable-next-line
    // console.log(state.counters[index])
  },
  decrement (state, index) {
    if (state.counters[index].total > 0) {
      state.counters[index].total--
    }
  },
  toggleStartTime (state) {
    state.startTime ? state.startTime = false : state.startTime = new Date()
  },
  resetCounters (state) {
    for (const counter of state.counters) {
      counter.total = 0
    }
    state.startTime = false
  }
}
