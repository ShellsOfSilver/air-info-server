import {MinLength,MaxLength, IsString, IsInt, IsNumberString, Validate} from "class-validator";
import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

export interface IAirPlane {
  readonly name: String;
  readonly maxSpeed: String;
  readonly maxDistance: String;
  readonly description: String;
  readonly capacity: ICapacity
}

@ValidatorConstraint({ name: "customText", async: false })
export class CustomNumber implements ValidatorConstraintInterface {

    isNumeric(value) {
      return /^\+?\d+$/.test(value);
    }

    validate(text) {
        return this.isNumeric(text); 
    }

}

export interface ICapacity {
  readonly economy: String;
  readonly premiumEconomy: String;
  readonly business: String;
  readonly first: String;
}

export class Capacity {

  
  @Validate(CustomNumber)
  economy: String;

  @Validate(CustomNumber)
  premiumEconomy: String;

  @Validate(CustomNumber)
  business: String;

  @Validate(CustomNumber)
  first: String;

  constructor(
    airPlane: ICapacity = {
      economy: "",
      premiumEconomy: "",
      business: "",
      first: ""
    }
  ) {
    this.economy = airPlane.economy,
    this.premiumEconomy = airPlane.premiumEconomy,
    this.business = airPlane.business,
    this.first = airPlane.first
  }
}

export class AirPlane extends Capacity {

  @MinLength(2)
  @MaxLength(32)
  @IsString()
  readonly name: String;

  @Validate(CustomNumber)
  readonly maxSpeed: String;

  @Validate(CustomNumber)
  readonly maxDistance: String;

  @MinLength(0)
  @MaxLength(1000)
  @IsString()
  readonly description: String;

  readonly capacity: ICapacity;

  constructor(
    airPlane: IAirPlane = {
      name: "",
      maxSpeed: "",
      maxDistance: "",
      description: "",
      capacity: {
        economy: "",
        premiumEconomy: "",
        business: "",
        first: ""
      }
    }
  ) {
    super(airPlane.capacity);
    this.name = airPlane.name;
    this.description = airPlane.description;
    this.maxSpeed = airPlane.maxSpeed;
    this.maxDistance = airPlane.maxDistance;
  }
}
