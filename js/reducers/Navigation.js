export function navigationStack(state = [], action) {
	switch(action.type) {
		case 'NAVIGATED':
			return state.concat(action.targetComponent)
		case 'NAVIGATED_BACK':
			return state.slice(0, state.length - 1)
		default:
			return state
	}
}
