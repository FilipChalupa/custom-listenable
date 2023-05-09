# Custom listenable [![npm](https://img.shields.io/npm/v/custom-listenable.svg)](https://www.npmjs.com/package/custom-listenable) ![npm type definitions](https://img.shields.io/npm/types/custom-listenable.svg)

Create custom listenable with `addListener` and `removeListener` methods.

## Installation

```bash
npm install custom-listenable
```

## Usage

```js
import { listenable } from 'custom-listenable'

// Create listenable
const myListenable = listenable()

// Prepare callback for new data
const callback = (data) => {
	console.log('Listener called')
	console.log(data)
}

// Listen to new data
myListenable.addListener(callback)

// Stop listening after 5 seconds
setTimeout(() => {
	myListenable.removeListener(callback)
}, 5000)

// Emit data every second
setInterval(() => {
	const data = {
		random: Math.random(),
		date: new Date(),
	}
	myListenable.emit(data)
}, 1000)

// Listen once
myListenable.addListener(
	(data) => {
		console.log('Listener called once')
		console.log(data)
	},
	{ once: true },
)
```

### TypeScript

You can specify type of data that will be emitted.

```ts
const myListenable = listenable<{ random: number; date: Date }>()
```
