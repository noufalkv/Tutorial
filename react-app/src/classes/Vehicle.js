// Parent Class
class Vehicle {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return `${this.year} ${this.brand} ${this.model}`;
  }

  start() {
    return `${this.brand} ${this.model} is starting...`;
  }
}

// Child Class - Inheritance using extends
class Car extends Vehicle {
  constructor(brand, model, year, doors) {
    super(brand, model, year); // Call parent constructor
    this.doors = doors;
    this.fuelType = 'Petrol';
  }

  // Override parent method
  getInfo() {
    return `${super.getInfo()} - ${this.doors} doors, ${this.fuelType}`;
  }

  // New method specific to Car
  honk() {
    return `${this.brand} car honks: Beep! Beep!`;
  }
}

// Another Child Class
class Bike extends Vehicle {
  constructor(brand, model, year, bikeType) {
    super(brand, model, year);
    this.bikeType = bikeType;
  }

  getInfo() {
    return `${super.getInfo()} - ${this.bikeType}`;
  }

  wheelie() {
    return `${this.brand} ${this.model} is doing a wheelie!`;
  }
}

export { Vehicle, Car, Bike };
