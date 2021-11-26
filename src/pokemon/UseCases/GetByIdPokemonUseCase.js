import { UseCase } from "../../domain";
import { HTTPPokemonRepository} from "../Repositories/HTTPPokemonRepository"
import { IdValueObject } from "../../kernel/Models/IdValueObject";

export class GetByIdPokemonUseCase extends UseCase {
  _repository

  static create({config}) {
    const repository = HTTPPokemonRepository.create({config})
    return new GetByIdPokemonUseCase({repository})
  }

  constructor({repository}) {
    super()

    this._repository = repository
  }

  async execute({id}) {
    const idVO = IdValueObject.create({id})
    const pokemonEntity = await this._repository.pokemonById({id: idVO})

    return pokemonEntity.toJSON()
  }
}