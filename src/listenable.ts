export type ListenerOptions = {
	once?: boolean
	// @TODO: abortable
}

export const listenable = <
	CallbackParameters extends Record<string, unknown>,
>() => {
	type Callback = (parameters: CallbackParameters) => void
	type Listener = {
		callback: Callback
		options: ListenerOptions
	}

	const listeners: Listener[] = []

	const findIndex = (callback: Callback) =>
		listeners.findIndex((listener) => listener.callback === callback)

	const addListener = (callback: Callback, options: ListenerOptions = {}) => {
		// Prevent duplicate listeners
		if (findIndex(callback) >= 0) {
			return
		}

		listeners.push({ callback, options })
	}

	const removeListener = (callback: Callback) => {
		const listenerIndex = findIndex(callback)
		if (listenerIndex >= 0) {
			listeners.splice(listenerIndex, 1)
		}
	}

	const emit = (parameters: CallbackParameters) => {
		listeners.forEach((listener) => {
			listener.callback(parameters)
			if (listener.options.once) {
				removeListener(listener.callback)
			}
		})
	}

	return {
		addListener,
		removeListener,
		emit,
	}
}
