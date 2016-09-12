export const REQUEST_RESULTS = 'REQUEST_RESULTS'
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS'

import { baseUrl } from 'futsalNative/js/config'

import moment from 'moment'

function requestData() {
	return {
		type: REQUEST_RESULTS
	}
}

function receiveData(data) {
  let payload = data.map((fixture) => {
    return { ...fixture, kickOffAt: moment(fixture.kickOffAt) }
  })
  return {
    type: RECEIVE_RESULTS,
    data: payload
  }
}

export function populateResults() {
	let url = baseUrl + '/match'
  return (dispatch) => {
    dispatch(requestData())
    return fetch(url)
      .then((res) => res.json())
      .then((json) => dispatch(receiveData(json)))
      .catch((err) => {
				alert(err.message)
				console.log('There was an error fetching fixtures')
        console.error(err)
      })
  }
}
