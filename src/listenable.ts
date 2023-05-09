export const listenable = <
	CallbackParameters extends Record<string, unknown>,
>() => {
	type Callback = (parameters: CallbackParameters) => void
	const listeners: Callback[] = []

	const addListener = (callback: Callback) => {
		removeListener(callback) // Prevent duplicate listeners
		listeners.push(callback)
	}

	const removeListener = (callback: Callback) => {
		const listenerIndex = listeners.indexOf(callback)
		if (listenerIndex >= 0) {
			listeners.splice(listenerIndex, 1)
		}
	}

	const emit = (parameters: CallbackParameters) => {
		listeners.forEach((listener) => {
			listener(parameters)
		})
	}

	return {
		addListener,
		removeListener,
		emit,
	}
}
