import { Model } from "../../domain"
import { InvalidNameError } from "../Errors/InvalidNameError"

export class NameValueObject extends Model {
  _value

  static validate({name}) {
    if (name == undefined) {
      throw InvalidNameError.create(`[NameValueObject.validate] required a name(${name})`)
    }
  }

  static create({name}) {
    NameValueObject.validate({name})
    return new NameValueObject({name})
  }

  constructor({name}) {
    super()

    this._value = name
  }

  value() {
    return this._value
  }

  toJSON() {
   return {name: this.value()}
  }
}
