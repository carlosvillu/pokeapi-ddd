import { Pokemon } from "../../../src"
import { DomainError } from "../../../src/domain"
import sinon from 'sinon'
import { expect } from 'chai'
import { BrowserFetcher } from "../../../src/fetcher/BrowserFetcher"



window.ENV = {}
window.ENV.APP_ENV = 'test'

describe('GetByIdPokemonUseCase', async function() {
  beforeEach(async function () {
    this.domain = await Pokemon.create()
    this.getStub = sinon.stub(BrowserFetcher.prototype, 'get')
  })

  afterEach(function () {
    this.domain = undefined
    this.getStub.restore()
  })

  it('should return a pokemon entity json', async function() {
    this.getStub.returns(Promise.resolve({id: 35, name: 'clefairy', order: 35}))

    const pokemonJson = await this.domain.GetByIdPokemonUseCase.execute({id: 35})

    expect(pokemonJson.id).to.eql({id: 35})
  })
})
