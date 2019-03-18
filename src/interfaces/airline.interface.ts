
export class AirLine {
    readonly idAirCompany: String;
    readonly idPlane: String;
    readonly flights: String;
    readonly direction: Direction;
    readonly note: String;
    readonly status: Status;
    readonly schedule: Schedule;
    readonly flightType: FlightType;
}

export class Direction {
    readonly fromIdAirPort: String;
    readonly toIdAirPort: String;
}

export class Schedule{
    readonly startFly: String;
    readonly endFly: String;
    readonly days: [];
}

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