import { DomainError } from "../../domain";

export class InvalidNameError extends DomainError {
  static create({msg}) {
    return new InvalidNameError(msg)
  }
}