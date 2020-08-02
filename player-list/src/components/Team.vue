<template>
  <b-container fluid>
    <b-row class="mb-2  text-center">
      <b-col cols=6 class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="2"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Search by Name or Position"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols=6 class="my-1">
        <b-button variant="success" size="sm" @click="playerModal('Create',$event.target)" class="ml-5">New Player</b-button>
      </b-col>
    </b-row>
    <b-table
      striped
      hover
      dark
      fixed
      responsive
      sticky-header="600px"
      primary-key="id"
      sort-by="name"
      sort-icon-left
      :filter="filter"
      :fields="fields"
      :items="playersProp"
    >
      <template v-slot:cell(actions)="row">
        <b-button
          variant="primary"
          size="sm"
          @click="selectForEdition(row.item.id);playerModal('Edit',$event.target)"
        >Edit</b-button>
        <b-button
          variant="outline-danger"
          size="sm"
          @click="selectForDeletion(row.item.id); deletePlayer()"
        >Delete</b-button>
      </template>

      <template v-slot:cell(goals)="row">
        <Goals :goalsProp="row.item.goals" :id="row.item.id" />
      </template>
    </b-table>

    <b-modal
      id="player-modal"
      :title="playerModalInfo.title"
      ok-only
      @hide="resetPlayerModal(); resetPlayerFields()"
      @ok="handleSubmit"
    >
      <b-form-group label-cols-sm="3" label="Name : " label-align-sm="left" required>
        <b-form-input v-model="newPlayer.name"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="3" label="Position : " label-align-sm="left" required>
        <b-form-input v-model="newPlayer.position"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="3" label="Goals : " label-align-sm="left" required>
        <b-form-input v-model="newPlayer.goals"></b-form-input>
      </b-form-group>
    </b-modal>
    <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
      Success on Operation!!
    </b-alert>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { SET_PLAYERS } from '../store/mutation-types'
import {
  SELECT_PLAYER_FOR_EDITION,
  UNSELECT_PLAYER_FOR_EDITION,
  SELECT_PLAYER_FOR_DELETION,
  UNSELECT_PLAYER_FOR_DELETION
} from '../store/action-types'
import { playersCollection } from '../db/firebase'
import Goals from './Goals'

export default {
  name: 'Team',
  components: {
    Goals
  },
  data () {
    return {
      newPlayer: {
        name: '',
        position: '',
        goals: 0
      },
      playerModalInfo: {
        title: ''
      },
      transProps: {
        name: 'flip-list'
      },
      fields: [
        { key: 'name', sortable: true },
        { key: 'position', sortable: true },
        { key: 'goals', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      filter: null,
      showDismissibleAlert: false
    }
  },
  props: {
    playersProp: {
      type: Array,
      required: true
    }
  },
  beforeMount () {
    this.$store.commit(SET_PLAYERS, this.playersProp)
  },
  computed: {
    ...mapState({
      displayablePlayer: (state) => state.players.list,
      selectedId: (state) => state.players.selectedId
    }),
    ...mapGetters(['selectedPlayer'])
  },
  methods: {
    addPlayer () {
      playersCollection
        .add({
          name: this.newPlayer.name,
          position: this.newPlayer.position,
          goals: this.newPlayer.goals
        })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
      this.newPlayer.name = ''
      this.newPlayer.position = ''
      this.newPlayer.goals = 0
      this.showAlert()
    },
    updatePlayer (player, id) {
      playersCollection
        .doc(id)
        .update({ ...player })
        .then(function (docRef) {
          console.log('Updated document with ID: ', id)
        })
        .catch(function (error) {
          console.error('Error updating document: ', error)
        })
      this.showAlert()
    },
    deletePlayer () {
      playersCollection.doc(this.selectedId).delete()
      this.showAlert()
    },
    playerModal (modalTitle, button) {
      if (modalTitle !== 'Edit') {
        this.playerModalInfo.title = modalTitle + ' player'
        this.$root.$emit('bv::show::modal', 'player-modal', button)
      } else {
        this.playerModalInfo.title = modalTitle + ' player'

        this.newPlayer.name = this.selectedPlayer[0].name
        this.newPlayer.position = this.selectedPlayer[0].position
        this.newPlayer.goals = this.selectedPlayer[0].goals

        this.$root.$emit('bv::show::modal', 'player-modal', button)
      }
    },
    resetPlayerModal () {
      this.playerModalInfo.title = ''
    },
    resetPlayerFields () {
      this.newPlayer.name = ''
      this.newPlayer.position = ''
      this.newPlayer.goals = 0
    },
    checkFormValidity () {
      if (this.newPlayer.name === '' || this.newPlayer.position === '') {
        return false
      }
      return true
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        console.log('error')
        return
      }
      if (this.playerModalInfo.title === 'Edit player') {
        this.updatePlayer(this.newPlayer, this.selectedId)
        this.unselectForEdition()
      } else {
        this.addPlayer()
      }
    },
    selectForEdition (playerId) {
      this.$store.dispatch(SELECT_PLAYER_FOR_EDITION, playerId)
    },
    unselectForEdition () {
      this.$store.dispatch(UNSELECT_PLAYER_FOR_EDITION)
    },
    selectForDeletion (playerId) {
      this.$store.dispatch(SELECT_PLAYER_FOR_DELETION, playerId)
    },
    unselectForDeletion () {
      this.$store.dispatch(UNSELECT_PLAYER_FOR_DELETION)
    },
    showAlert () {
      this.showDismissibleAlert = true
    }
  }
}
</script>
