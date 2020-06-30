import { Platform } from 'react-native'

if (Platform.OS !== 'web') {
  require('./polyfill')
}
