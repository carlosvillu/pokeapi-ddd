/* eslint-disable prettier/prettier */
import { Config } from './config/index.js'

const interOP = (fn, name) => () => fn().then(mod => mod[name])
const UseCases = {
  GetByNamePokemonUseCase: interOP(() => import(/* webpackChunkName: 'GetByNamePokemonUseCase' */ './pokemon/UseCases/GetByNamePokemonUseCase.js'), 'GetByNamePokemonUseCase' ),
  GetByIdPokemonUseCase: interOP(() => import(/* webpackChunkName: 'GetByIdPokemonUseCase' */ './pokemon/UseCases/GetByIdPokemonUseCase.js'), 'GetByIdPokemonUseCase' ),
}

export class Pokemon {
  _config

  static async create(externalConfig) {
    const config = await Config.create(externalConfig)
    return new Pokemon({ config })
  }

  constructor({ config }) {
    this._config = config
  }

  config(key, value) {
    return value ? this._config.set(key, value) : this._config.get(key)
  }

  get GetByNamePokemonUseCase() { return this._getter('GetByNamePokemonUseCase') }
  get GetByIdPokemonUseCase() { return this._getter('GetByIdPokemonUseCase') }

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
