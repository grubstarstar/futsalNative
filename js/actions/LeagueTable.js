import { baseUrl } from 'futsalNative/js/config'

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
	let url = baseUrl + '/table'
	console.log(url)
  return (dispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => dispatch(receiveData(json)))
      .catch((err) => {
				alert(err.message)
				console.log('There was an error')
        console.error(err)
      })
  }
}
