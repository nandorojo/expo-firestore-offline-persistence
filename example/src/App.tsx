import * as React from 'react'
import { StyleSheet, View, Text, Button, StatusBar } from 'react-native'

import 'expo-firestore-offline-persistence'
import 'firebase/firestore'
import { FuegoProvider, Fuego, useDocument } from '@nandorojo/swr-firestore'

// you can replace this with your Firebase config!
const fuego = new Fuego({
  apiKey: 'AIzaSyBYA23RoUNQx_JRiE_QYbonur2bKne-e7U',
  authDomain: 'themicdrop-f0c9e.firebaseapp.com',
  databaseURL: 'https://themicdrop-f0c9e.firebaseio.com',
  projectId: 'themicdrop-f0c9e',
  storageBucket: 'themicdrop-f0c9e.appspot.com',
  messagingSenderId: '661922928136',
  appId: '1:661922928136:web:76ccc74cd6d4b26d85a3bd',
  measurementId: 'G-XVC4NNVMZ9',
})

fuego.db.enablePersistence()
export default function App() {
  return (
    <FuegoProvider fuego={fuego}>
      <Listener id={'1'} />
    </FuegoProvider>
  )
}

function Listener({ id }: { id: string }) {
  const { update, data } = useDocument<{ count: number }>('test/' + id, {
    listen: true,
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>Count: {data?.count ?? 'Loading'}</Text>
      <Button
        title="Increment"
        onPress={() => {
          update({
            count: (data?.count ?? -1) + 1,
          })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: 'blue' },
})
