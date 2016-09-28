export const REQUEST_FIXTURES = 'REQUEST_FIXTURES'
export const RECEIVE_FIXTURES = 'RECEIVE_FIXTURES'

export const START_UPDATING_FIXTURE = 'START_UPDATING_FIXTURE'
export const FINISH_UPDATING_FIXTURE = 'FINISH_UPDATING_FIXTURE'

export const START_CREATING_FIXTURE = 'START_CREATING_FIXTURE'
export const FINISH_CREATING_FIXTURE = 'FINISH_CREATING_FIXTURE'

import { baseUrl } from 'futsalNative/js/config'

import moment from 'moment'

// fetching all fixtures

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

// updating a fixture

function updatingFixture() {
	return {
		type: START_UPDATING_FIXTURE
	}
}

function receiveUpdatedFixture(fixture) {
	return {
		type: FINISH_UPDATING_FIXTURE,
		data: fixture
	}
}

export function saveFixture(data) {
	let url = baseUrl + '/match'
  return (dispatch) => {
    dispatch(updatingFixture())
    return fetch(url, {
			method: 'PUT',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data) // data = id, ?teamA, ?teamB, ?teamA_Goals, ?teamB_Goals
		}).then((res) => res.json())
      .then((json) => dispatch(receiveUpdatedFixture(json)))
      .catch((err) => {
				dispatch(receiveData({}))
				alert(err.message)
				console.log('There was an error updating a fixture')
        console.error(err)
      })
  }
}

// creating a new fixture

function creatingFixture() {
	return {
		type: START_CREATING_FIXTURE
	}
}

function receiveCreatedFixture(fixture) {
	return {
		type: FINISH_CREATING_FIXTURE,
		data: fixture
	}
}

export function createFixture(data) {
	console.log('createFixture', data)
	let url = baseUrl + '/match'
  return (dispatch) => {
    dispatch(creatingFixture())
    return fetch(url, {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data) // data = teamA, teamB, kickOffAt, ?teamA_Goals, ?teamB_Goals
		}).then((res) => res.json())
      .then((json) => dispatch(receiveCreatedFixture(json)))
      .catch((err) => {
				dispatch(receiveData({}))
				alert(err.message)
				console.log('There was an error updating a fixture')
        console.error(err)
      })
  }
}
