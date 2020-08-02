export default{
  selectedPlayer: state => state.list.filter(player => player.id === state.selectedId)
}
