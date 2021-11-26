import { Repository } from "../../domain"

export class PokemonRepository extends Repository {
  async pokemonByName() {
    throw new Error('[PokemonRepository#pokemonByName] should be implemented')
  }

  async pokemonById() {
    throw new Error('[PokemonRepository#pokemonById] should be implemented')
  }

  async pokemonSaveByName() {
    throw new Error('[PokemonRepository#pokemonSaveByName] should be implemented')
  }
}
