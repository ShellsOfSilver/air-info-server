import {MinLength,MaxLength, IsString} from "class-validator";

export interface IAirPort {
  readonly name: string;
  readonly description: string;
  readonly country: string;
}

export class AirPort {

    @MinLength(2)
    @MaxLength(32)
    @IsString()
    readonly name: String;

    @MinLength(0)
    @MaxLength(1000)
    @IsString()
    readonly description: String;

    @MinLength(2)
    @MaxLength(128)
    @IsString()
    readonly country: String;

    constructor(
        airPort: IAirPort = {
            description: "",
            country: "",
            name: ""
        }
      ) {
        this.name = airPort.name;
        this.description = airPort.description;
        this.country = airPort.country;
      }
}