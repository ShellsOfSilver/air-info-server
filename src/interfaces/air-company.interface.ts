import {MinLength,MaxLength, IsString, ArrayNotEmpty, ArrayUnique} from "class-validator";

export interface IAirCompany {
  readonly name: string;
  readonly address: string;
  readonly listPlanes: [];
  readonly listAirPorts: [];
}

export class AirCompany {

    @MinLength(2)
    @MaxLength(32)
    @IsString()
    readonly name: String;

    @MinLength(10)
    @MaxLength(128)
    @IsString()
    readonly address: String;

    @ArrayNotEmpty()
    readonly listPlanes: [];

    @ArrayNotEmpty()
    @ArrayUnique()
    readonly listAirPorts: [];

    constructor(
        airPort: IAirCompany = {
            address: "",
            name: "",
            listPlanes: [],
            listAirPorts: []
        }
      ) {
        this.name = airPort.name;
        this.address = airPort.address;
        this.listAirPorts = airPort.listAirPorts;
        this.listPlanes = airPort.listPlanes;
      }
}

  