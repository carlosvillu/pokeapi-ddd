import { DomainError } from "../../domain";

export class InvalidIdError extends DomainError {
  static create({msg}) {
    return new InvalidIdError(msg)
  }
}