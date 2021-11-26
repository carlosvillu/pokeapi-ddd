import { UseCase } from "../../domain";
import { HTTPPokemonRepository} from "../Repositories/HTTPPokemonRepository"
import { NameValueObject } from "../../kernel/Models/NameValueObject";

export class GetByNamePokemonUseCase extends UseCase {
  _repository

  static create({config}) {
    const repository = HTTPPokemonRepository.create({config})
    return new GetByNamePokemonUseCase({repository})
  }

  constructor({repository}) {
    super()

    this._repository = repository
  }

  async execute({name}) {
    const nameVO = NameValueObject.create({name})
    const pokemonEntity = await this._repository.pokemonByName({name: nameVO})

    return pokemonEntity.toJSON()
  }
}