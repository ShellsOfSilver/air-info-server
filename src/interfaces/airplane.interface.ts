
export class AirPlane {
  readonly name: String;
  readonly maxSpeed: Number;
  readonly maxDistance: Number;
  readonly description: String;
  readonly capacity: Capacity
}
  
export class Capacity {
  readonly economy: Number;
  readonly premiumEconomy: Number;
  readonly business: Number;
  readonly first: Number;
}