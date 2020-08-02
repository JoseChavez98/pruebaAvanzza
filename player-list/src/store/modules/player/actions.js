import * as mutations from '../../mutation-types'
import * as actions from '../../action-types'
export default {
  [actions.SELECT_PLAYER_FOR_EDITION] ({ commit }, id) {
    commit(mutations.SET_SELECTED_PLAYER_ID, id)
  },
  [actions.UNSELECT_PLAYER_FOR_EDITION] ({ commit }) {
    commit(mutations.SET_SELECTED_PLAYER_ID, null)
  },
  [actions.SELECT_PLAYER_FOR_DELETION] ({ commit }, id) {
    commit(mutations.SET_SELECTED_PLAYER_ID, id)
  },
  [actions.UNSELECT_PLAYER_FOR_DELETION] ({ commit }) {
    commit(mutations.SET_SELECTED_PLAYER_ID, null)
  }
}
