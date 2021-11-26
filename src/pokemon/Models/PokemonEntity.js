import { Model } from "../../domain"
import { IdValueObject } from "../../kernel/Models/IdValueObject"
import { NameValueObject } from "../../kernel/Models/NameValueObject"

export class PokemonEntity extends Model {
  _id
  _name
  _power

  static validate({power}) {
    if (power == undefined) {
      throw InvalidNameError.create(`[PokemonEntity.validate] required a power(${power})`)
    }
  }

  static create({id, name, power}) {
    PokemonEntity.validate({power})
    return new PokemonEntity({id: IdValueObject.create(id), name: NameValueObject.create(name), power})
  }

  constructor({id, name, power}) {
    super()

    this._id = id
    this._name = name
    this._power = power
  }

  toJSON() {
    return {id: this._id.toJSON(), name: this._name.toJSON(), power: this._power}
  }
}
