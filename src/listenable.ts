export const listenable = <
	CallbackParameters extends Record<string, unknown>,
>() => {
	type Callback = (parameters: CallbackParameters) => void
	let listeners: Callback[] = []

	const addListener = (callback: Callback) => {
		listeners.push(callback)
	}
	const removeListener = (callback: Callback) => {
		listeners = listeners.filter((listener) => listener !== callback)
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
