import { Pokemon } from "../../../src"
import { DomainError } from "../../../src/domain"
import sinon from 'sinon'
import { expect } from 'chai'
import { HTTPPokemonRepository } from "../../../src/pokemon/Repositories/HTTPPokemonRepository"

window.ENV = {}
window.ENV.APP_ENV = 'test'

describe('GetByNamePokemonUseCase', async function() {
  beforeEach(async function () {
    this.domain = await Pokemon.create()
    this.server = sinon.fakeServer.create()
    this.server.autoRespond = true
  })

  afterEach(function () {
    this.domain = undefined
    this.server.restore()
  })

  it('should return a pokemon entity json', async function() {
    const host = this.domain.config('API_HOST')
    const name = 'clefairy'
    const url = `${host}/${HTTPPokemonRepository.VERSION}/pokemon/${name}`

    this.server.respondWith('GET', url, [200, { Accept: 'application/json' }, JSON.stringify({id: 12, name, order: 56})])

    const pokemonJson = await this.domain.GetByNamePokemonUseCase.execute({name})

    expect(pokemonJson.name).to.eql({name})
  })
})
