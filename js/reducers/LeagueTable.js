function table(state = [], action) {
  switch(action.type) {
    case 'RECEIVED_LEAGUE_TABLE_DATA':
      return action.data
    default:
      return state
  }
}

export function leagueTable(state = { table: [] }, action) {
  switch(action.type) {
    case 'RECEIVED_LEAGUE_TABLE_DATA':
      console.log('in reducer for action RECEIVED_LEAGUE_TABLE_DATA')
      return {
        table: table(state.table, action)
      }
    default:
      return state
  }
}
