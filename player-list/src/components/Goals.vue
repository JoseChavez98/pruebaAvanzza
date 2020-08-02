<template>
<div>
  <span class="h5 mb-2"><b-icon icon="arrow-up" variant="info" @click="updateGoals(1)"></b-icon></span>
    {{this.goalsProp}}
  <span class="h5 mb-2"><b-icon icon="arrow-down" variant="info" @click="updateGoals(-1)"></b-icon></span>
</div>
</template>

<script>
import { playersCollection } from '../db/firebase'

export default {
  props: {
    goalsProp: {
      required: true
    },
    id: {
      required: true
    }
  },
  methods: {
    updateGoals (int) {
      playersCollection
        .doc(this.id)
        .update({goals: Number(this.goalsProp) + int})
        .then(function (docRef) {
          console.log('Updated document with ID: ', this.id)
        })
        .catch(function (error) {
          console.error('Error updating document: ', error)
        })
    }
  }
}
</script>
