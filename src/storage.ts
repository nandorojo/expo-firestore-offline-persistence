import { AsyncStorage } from 'react-native'

function handleError(func: string, param?: string): Promise<string> {
  let message
  if (!param) {
    message = func
  } else {
    message = `${func}() requires at least ${param} as its first parameter.`
  }
  console.warn(message)
  return Promise.reject(message)
}

type KeyType = string

class SyncStorage {
  data = new Map()

  loading: boolean = true

  init(): Promise<Array<unknown>> {
    return AsyncStorage.getAllKeys().then((keys: Array<KeyType>) =>
      AsyncStorage.multiGet(keys).then(
        (data: Array<Array<KeyType>>): Array<unknown> => {
          data.forEach(this.saveItem.bind(this))

          return [...this.data]
        }
      )
    )
  }

  getItem(key: KeyType): any {
    return this.data.get(key)
  }

  setItem(key: KeyType, value: any): Promise<unknown> {
    if (!key) return handleError('set', 'a key')

    this.data.set(key, value)
    return AsyncStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    )
  }

  removeItem(key: KeyType): Promise<unknown> {
    if (!key) return handleError('remove', 'a key')

    this.data.delete(key)
    return AsyncStorage.removeItem(key)
  }

  saveItem(item: Array<KeyType>) {
    let value

    try {
      value = JSON.parse(item[1])
    } catch (e) {
      ;[, value] = item
    }

    this.data.set(item[0], value)
    this.loading = false
  }

  getAllKeys(): Array<unknown> {
    return Array.from(this.data.keys())
  }
  key(i: number) {
    return this.getAllKeys()[i]
  }
  clear() {
    this.data.clear()
    return AsyncStorage.clear()
  }
}

const storage = new SyncStorage()

export default storage

// import storage from './storage'

// export const init = () =>
//   storage.init().then(() => {
//     const { getItem, setItem, removeItem, key, clear } = storage
//     // @ts-ignore
//     // window.localStorage = storage
//     window.localStorage = {
//       getItem,
//       key,
//       setItem,
//       removeItem,
//       clear,
//     }
//     // window.localStorage = {
//     //   _data: {},

//     //   getItem: async function (key: string) {
//     //     return this._data[key] ?? (await AsyncStorage.getItem(key))
//     //   },
//     //   key: function (i: number) {
//     //     return Object.keys(this._data)[i]
//     //   },

//     //   setItem: function (key: string, value: string) {
//     //     this._data[key] = value
//     //     AsyncStorage.setItem(key, value)
//     //   },
//     //   removeItem: function (key: string) {
//     //     delete this._data[key]
//     //     return AsyncStorage.removeItem(key)
//     //   },
//     //   clear: function () {
//     //     this._data = {}
//     //     return AsyncStorage.clear()
//     //   },
//     // }

//     setGlobalVars(window, { checkOrigin: false, win: SQLite })
//   })
