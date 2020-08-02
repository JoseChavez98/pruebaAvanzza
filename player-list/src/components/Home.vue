<template>
<div>
  <Team v-bind:playersProp="players"/>
</div>
</template>

<script>
import Team from './Team'
import {playersCollection} from '../db/firebase'

export default {
  name: 'Home',
  components: {
    Team
  },
  firestore () {
    return {
      players: playersCollection
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
}

</style>
