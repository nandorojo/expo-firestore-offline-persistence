import * as SQLite from 'expo-sqlite'

// @ts-ignore
import setGlobalVars from 'indexeddbshim/dist/indexeddbshim-noninvasive'

// @ts-ignore
window.localStorage = {
  _data: {},

  getItem: async function (key: string) {
    return this._data[key]
  },
  key: function (i: number) {
    return Object.keys(this._data)[i]
  },
  setItem: function (key: string, value: string) {
    this._data[key] = value
  },
  removeItem: function (key: string) {
    delete this._data[key]
  },
  clear: function () {
    this._data = {}
  },
}

setGlobalVars(window, { checkOrigin: false, win: SQLite })
