import base from './base.js'
import { isBrowser, isNode } from '@web/js'

export class Config {
  static async create(externalConfig) {
    const APP_ENV = (isBrowser ? window.ENV.APP_ENV : process.env.APP_ENV) || 'development'
    const VERSION = (isBrowser ? window.ENV.VERSION : process.env.VERSION) || '--'
    const IS_INTERNAL = isNode && APP_ENV !== 'test'

    const envConfig = (await import(/* webpackChunkName: 'ENV_CONFIG' */ `./${APP_ENV}.js`)).default
    const internal = IS_INTERNAL
      ? (await import(/* webpackChunkName: 'INTERNAL' */ './internal.js')).default
      : () => ({})

    APP_ENV !== 'test' && console.log('\n\nVERSION:', VERSION, '\n\n') // eslint-disable-line
    APP_ENV !== 'test' && console.log('\n\nAPP_ENV:', APP_ENV, '\n\n') // eslint-disable-line
    APP_ENV !== 'test' && console.log('\n\nINTERNAL:', IS_INTERNAL, '\n\n') // eslint-disable-line

    return new Config({
      ...base(),
      ...envConfig(),
      ...internal(),
      ...externalConfig,
    })
  }

  constructor(config) {
    this._config = config
  }

  get(key) {
    return this._config[key]
  }

  set(key, value) {
    this._config[key] = value
    return this
  }
}

