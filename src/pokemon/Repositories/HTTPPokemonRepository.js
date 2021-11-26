import { PokemonRepository } from "./PokemonRepository"
import { BrowserFetcher } from "../../fetcher/BrowserFetcher"
import { NodeFetcher } from "../../fetcher/NodeFetcher"
import { PokemonEntity } from "../Models/PokemonEntity"
import { NameValueObject } from "../../kernel/Models/NameValueObject"
import { IdValueObject } from "../../kernel/Models/IdValueObject"

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'


export class HTTPPokemonRepository extends PokemonRepository {
  static VERSION = 'v2'

  _fetcher
  _config

  static create({config}) {
    const fetcher = isBrowser ? BrowserFetcher.create() : NodeFetcher.create()
    return new HTTPPokemonRepository({fetcher, config})
  }

  constructor({fetcher, config}) {
    super()

    this._fetcher = fetcher
    this._config = config
  }

  async pokemonByName({name}) {
    return this._pokemonByVO({vo: name})
  }

  async pokemonById({id}) {
    return this._pokemonByVO({vo: id})
  }

  async _pokemonByVO({vo}) {
    
    const host = this._config.get('API_HOST')
    const {id, name, order} = await this._fetcher.get({url: `${host}/${HTTPPokemonRepository.VERSION}/pokemon/${vo.value()}`})

    const pokemonEntity = PokemonEntity.create({id: IdValueObject.create({id}).toJSON(), name: NameValueObject.create({name}).toJSON(), power: order})
    return pokemonEntity
  }
  
}
