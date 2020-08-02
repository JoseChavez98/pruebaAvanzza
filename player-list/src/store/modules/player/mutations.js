import * as mutations from '../../mutation-types'
export default {
  [mutations.SET_PLAYERS] (state, players) {
    state.list = players
  },
  [mutations.SET_SELECTED_PLAYER_ID] (state, id) {
    state.selectedId = id
  }
}
