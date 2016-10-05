import { baseUrl } from 'futsalNative/js/config'
import querystring from 'querystring';

// stuff for logging into the server using credentials
export function loginUsingCredentials(email, password) {
	let url = baseUrl + '/login'
	console.log('loginUsingCredentials', url, JSON.stringify({email, password}))
  return (dispatch) => {
    fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({email, password})
		})
			.then((res) => res.json())
			.then((json) => {
				if(json.error) {
					throw Error(json.error)
				}
				dispatch(loggedInUsingCredentials())
				dispatch(fetchProfile(json.futsal_access_token))
			})
      .catch((err) => {
				alert(err.message)
				console.log(err.message)
      })
  }
}
function loggedInUsingCredentials() {
	return {
		type: 'LOGGED_IN_USING_CREDENTIALS'
	}
}

// stuff for logging into the server when using Facebook login
export function loginUsingFacebook(fb_access_token) {
	let url = baseUrl + '/login'
	console.log('loginUsingFacebook', url)
  return (dispatch) => {
    fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({fb_access_token})
		})
      .then((res) => res.json())
			.then((json) => {
				if(json.error) {
					throw Error(json.error)
				}
				dispatch(loggedInUsingFacebook())
				dispatch(fetchProfile(json.futsal_access_token))
			})
      .catch((err) => {
				alert(err.message)
				console.log(err.message)
      })
  }
}
function loggedInUsingFacebook() {
	return {
		type: 'LOGGED_IN_USING_FACEBOOK'
	}
}

// stuff for getting the profile from the application server
function fetchProfile(futsalAccessToken) {

	let params = querystring.stringify({
		futsal_access_token: futsalAccessToken
	});
	console.log(params)

	let url = baseUrl + '/profile?' + params
	console.log(url)
	return (dispatch) => {
		fetch(url)
			.then(res => res.json())
			.then(json => dispatch(receivedProfile(json.profile)))
			.catch(console.log)
	}
}
function receivedProfile(profile) {
	return {
		type: 'RECEIVED_PROFILE',
		profile
	}
}
