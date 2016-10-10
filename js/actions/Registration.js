import { baseUrl } from 'futsalNative/js/config'

export function registerUser(details) {
  const url = baseUrl + '/register'
  return (dispatch) => {
    fetch(
      url,
      {
        method: 'POST',
        headers: {
  				'Content-Type': 'application/json',
  				'Accept': 'application/json'
  			},
  			body: JSON.stringify(details)
      }
    )
    .then((res) => res.json())
    .then((json) => {
      if(json.error) {
        throw Error(json.error)
      }
      alert(`an activation email has been sent to ${details.email}`)
    })
    .catch((err) => {
      alert(err.message)
      console.log(err.message)
    })
  }
}
