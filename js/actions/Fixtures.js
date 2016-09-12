export const REQUEST_FIXTURES = 'REQUEST_FIXTURES'
export const RECEIVE_FIXTURES = 'RECEIVE_FIXTURES'

import { baseUrl } from 'futsalNative/js/config'

import moment from 'moment'

function requestData() {
	return {
		type: REQUEST_FIXTURES
	}
}

function receiveData(data) {
  let payload = data.map((fixture) => {
    return { ...fixture, kickOffAt: moment(fixture.kickOffAt) }
  })
  return {
    type: RECEIVE_FIXTURES,
    data: payload
  }
}

export function populateFixtures() {
	let url = baseUrl + '/match'
  return (dispatch) => {
    dispatch(requestData())
    return fetch(url)
      .then((res) => res.json())
      .then((json) => dispatch(receiveData(json)))
      .catch((err) => {
				dispatch(receiveData([]))
				alert(err.message)
				console.log('There was an error fetching fixtures')
        console.error(err)
      })
  }
}
