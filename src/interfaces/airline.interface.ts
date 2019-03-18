import {
    MinLength, MaxLength, 
    IsString, IsMongoId, 
    IsDateString, ArrayUnique, 
    ArrayNotEmpty, IsEnum} from "class-validator";
import { IAirPlane } from "./airplane.interface";
import { IAirCompany } from "./air-company.interface";
import { IAirPort } from "./airport.interface";

export enum FlightType {
    ScheduledPassanger, //Пассажириский по расписанию
    ScheduledCargo, // Грузовой, но только с письмами.
    Military
}

export enum Status {
    Active,
    Canceled,
    Diverted, // Была произведена смена пункта назначения (например, по метео-условиям)
    DN, // Data source needed — Неоткуда получить информацию о статусе
    Landed,
    NotOperational,
    Scheduled,
    Unknown
}

export interface IAirLine {
    idAirCompany: String;
    idPlane: String;
    flights: String;
    direction: Direction;
    note: String; 
    status: Status;
    schedule: Schedule;
    flightType: FlightType;
}

export interface IDirection{
    fromIdAirPort: String;
    toIdAirPort: String;
}

export interface ISchedule{
    startFly: Date;
    endFly: Date;
    days: [];
}

export class Direction {

    @IsMongoId()
    readonly fromIdAirPort: String;

    @IsMongoId()
    readonly toIdAirPort: String;

    constructor(
        airDirection: IDirection = {
            fromIdAirPort: "",
            toIdAirPort: ""
        }
      ) {
        this.fromIdAirPort = airDirection.fromIdAirPort,
        this.toIdAirPort = airDirection.toIdAirPort
      }
}

export class Schedule extends Direction{
    
    @IsDateString()
    readonly startFly: Date;

    @IsDateString()
    readonly endFly: Date;

    @ArrayNotEmpty()
    @ArrayUnique()
    readonly days: [];

    constructor(
        airSchedule: ISchedule = {
          startFly: new Date(),
          endFly: new Date(),
          days: []
        },
        airDirection)
    {
        super(airDirection);
        this.startFly = airSchedule.startFly;
        this.endFly = airSchedule.endFly;
        this.days = airSchedule.days;
    }
}

export class AirLine extends Schedule{

    @IsMongoId()
    readonly idAirCompany: String;

    @IsMongoId()
    readonly idPlane: String;

    @MinLength(4)
    @MaxLength(32)
    @IsString()
    readonly flights: String;
    readonly direction: Direction;

    @MaxLength(128)
    @IsString()
    readonly note: String;

    @IsEnum(Status)
    readonly status: Status;

    readonly schedule: Schedule;

    @IsEnum(FlightType)
    readonly flightType: FlightType;

    constructor(
        airLine: IAirLine = {
            idAirCompany: "",
            idPlane: "",
            flights: "",
            direction: {
                fromIdAirPort: "",
                toIdAirPort: ""
            },
            note: "",
            status: Status.Unknown,
            schedule: {
                startFly: new Date(),
                endFly: new Date(),
                days: [],
                fromIdAirPort: "",
                toIdAirPort: ""
            },
            flightType: FlightType.ScheduledPassanger,
        }
      ) {
        super(airLine.schedule, airLine.direction);
        this.idAirCompany = airLine.idAirCompany;
        this.idPlane = airLine.idPlane;
        this.flights = airLine.flights;
        this.note = airLine.note;
        this.status = (airLine.status as Status);
        this.flightType = (airLine.flightType as FlightType);
      }
}