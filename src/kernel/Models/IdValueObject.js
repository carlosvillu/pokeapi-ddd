import { Model } from "../../domain"
import { InvalidIdError } from "../Errors/InvalidIdError"

export class IdValueObject extends Model {
  _value

  static validate({id}) {
    if (id == undefined) {
      throw InvalidIdError.create(`[IdValueObject.validate] required a id(${id})`)
    }
  }

  static create({id}) {
    IdValueObject.validate({id})
    return new IdValueObject({id})
  }

  constructor({id}) {
    super()

    this._value = id
  }

  value() {
    return this._value
  }

  toJSON() {
   return {id: this.value()}
  }
}
