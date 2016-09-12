export function navigateTo(navigator, targetComponent) {
	navigator.push({
		component: targetComponent
	})
	return {
		type: 'NAVIGATED',
		targetComponent
	}
}

export function navigateBack(navigator) {
	navigator.pop()
	return {
		type: 'NAVIGATED_BACK',
	}
}