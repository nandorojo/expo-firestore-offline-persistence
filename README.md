# Expo + Firestore + Offline Persistence ❄️🥳

Enable Firestore persistence in Expo/React Native apps without detaching.

# Why?

Firebase/Firestore offline persistence doesn't currently work in Expo apps, unless you detach and use `react-native-firebase`.

This library lets you use Firestore without detaching from Expo, by polyfilling the Firestore JS SDK.

To learn more about Firestore peristence, see their offline mode docs: https://cloud.google.com/firestore/docs/manage-data/enable-offline

# Installation

```sh
yarn add expo-firestore-offline-persistence

# or
npm install expo-firestore-offline-persistence
```

Install peer dependencies:

```sh
expo install expo-sqlite indexeddbshim
```

# Usage

Import `expo-firestore-offline-persistence` in your root `App.js` file. You should import this before you import firebase.

```js
import 'expo-firestore-offline-persistence'
```

**That's it!** Now you can enable Firestore persistence like normal:

```js
import 'expo-firestore-offline-persistence'

// ...

import * as firebase from 'firebase/app'
import 'firebase/firestore'

// You'll want to use the instance of Firestore you've already created, instead of firebase.firestore()
firebase.firestore().enablePersistence()
```

## Usage with `@nandorojo/swr-firestore`

If you're using `@nandorojo/swr-firestore`, you can enable this using `fuego.db` directly. Your `App.js` will look like this:

```js
import * as React from 'react'

import 'expo-firestore-offline-persistence' // 👋 import this first
import 'firebase/firestore'

import { FuegoProvider, Fuego } from '@nandorojo/swr-firestore'

const fuego = new Fuego({
  // your firebase config here
})

fuego.db.enablePersistence()

export default function App() {
  return <FuegoProvider fuego={fuego}>{/* Your app code here... */}</FuegoProvider>
}
```

If you aren't familiar with `@nandorojo/swr-firestore`, I recommend you check it out. It makes querying Firestore in React/Expo apps way simpler.

## Credit

I'd like to thank @zwily, @nnatter, @brettz9, and @bulby97 for contributing to the gist that led to the creation of this library.

For more background on their great work: https://gist.github.com/zwily/e9e97e0f9f523a72c24c7df01d889482

## License

MIT
