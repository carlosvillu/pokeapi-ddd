/* eslint-disable prettier/prettier */
import { Config } from './config/index.js'

const interOP = (fn, name) => () => fn().then(mod => mod[name])
const UseCases = {
}

export class Domestika {
  _config

  static async create(externalConfig) {
    const config = await Config.create(externalConfig)
    return new Domestika({ config })
  }

  constructor({ config }) {
    this._config = config
  }

  config(key, value) {
    return value ? this._config.set(key, value) : this._config.get(key)
  }


  _getter(name) {
    const self = this
    return {
      async execute() {
        const klass = await UseCases[name]()
        const response = klass.create({ config: self._config }).execute(...arguments)
        return response
      },
    }
  }
}

