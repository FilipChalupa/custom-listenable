export type ListenerOptions = {
	once?: boolean
	// @TODO: abortable
}

export const listenable = <CallbackData = unknown>() => {
	type Callback = (data: CallbackData) => void
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

	const emit = (data: CallbackData) => {
		listeners.forEach((listener) => {
			listener.callback(data)
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
