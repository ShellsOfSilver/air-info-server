import {MinLength,MaxLength, IsString, IsInt} from "class-validator";

export interface IAirPlane {
  readonly name: String;
  readonly maxSpeed: Number;
  readonly maxDistance: Number;
  readonly description: String;
  readonly capacity: ICapacity
}

export interface ICapacity {
  readonly economy: Number;
  readonly premiumEconomy: Number;
  readonly business: Number;
  readonly first: Number;
}

export class Capacity {

  @IsInt()
  economy: Number;

  @IsInt()
  premiumEconomy: Number;

  @IsInt()
  business: Number;

  @IsInt()
  first: Number;

  constructor(
    airPlane: ICapacity = {
      economy: 0,
      premiumEconomy: 0,
      business: 0,
      first: 0
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

  @IsInt()
  readonly maxSpeed: Number;

  @IsInt()
  readonly maxDistance: Number;

  @MinLength(0)
  @MaxLength(1000)
  @IsString()
  readonly description: String;

  readonly capacity: ICapacity;

  constructor(
    airPlane: IAirPlane = {
      name: "",
      maxSpeed: 0,
      maxDistance: 0,
      description: "",
      capacity: {
        economy: 0,
        premiumEconomy: 0,
        business: 0,
        first: 0
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
