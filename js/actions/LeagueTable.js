function requestData() {
	return {
		type: 'REQUEST_LEAGUE_TABLE_DATA'
	}
}

function receiveData(data) {
	return {
		type: 'RECEIVED_LEAGUE_TABLE_DATA',
    data: data
	}
}

export function populateLeagueTable() {
  return (dispatch) => {
    fetch('http://localhost:3000/table')
      .then((res) => res.json())
      .then((json) => dispatch(receiveData(json)))
      .catch((err) => {
				alert(err.message)
				console.log('There was an error')
        console.error(err)
      })
  }
}
