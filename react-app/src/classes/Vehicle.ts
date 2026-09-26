// Vehicle Classes with Inheritance - TypeScript implementation

interface VehicleInfo {
  brand: string;
  model: string;
  year: number;
}

// Parent/Base Class
class Vehicle {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  getInfo(): string {
    return `${this.year} ${this.brand} ${this.model}`;
  }

  start(): string {
    return `${this.brand} ${this.model} is starting...`;
  }

  stop(): string {
    return `${this.brand} ${this.model} has stopped.`;
  }
}

// Child Class - Car
interface CarInfo extends VehicleInfo {
  doors: number;
  fuelType: string;
}

class Car extends Vehicle {
  doors: number;
  fuelType: string = 'Petrol';

  constructor(brand: string, model: string, year: number, doors: number) {
    super(brand, model, year);
    this.doors = doors;
  }

  // Override parent method
  getInfo(): string {
    return `${super.getInfo()} - ${this.doors} doors, ${this.fuelType}`;
  }

  honk(): string {
    return `${this.brand} car honks: Beep! Beep!`;
  }

  getCarInfo(): CarInfo {
    return {
      brand: this.brand,
      model: this.model,
      year: this.year,
      doors: this.doors,
      fuelType: this.fuelType
    };
  }
}

// Child Class - Bike
interface BikeInfo extends VehicleInfo {
  bikeType: string;
}

class Bike extends Vehicle {
  bikeType: string;

  constructor(brand: string, model: string, year: number, bikeType: string) {
    super(brand, model, year);
    this.bikeType = bikeType;
  }

  // Override parent method
  getInfo(): string {
    return `${super.getInfo()} - ${this.bikeType}`;
  }

  wheelie(): string {
    return `${this.brand} ${this.model} is doing a wheelie!`;
  }

  getBikeInfo(): BikeInfo {
    return {
      brand: this.brand,
      model: this.model,
      year: this.year,
      bikeType: this.bikeType
    };
  }
}

export { Vehicle, Car, Bike };
export type { VehicleInfo, CarInfo, BikeInfo };
