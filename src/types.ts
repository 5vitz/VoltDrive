export interface Car {
  id: string;
  name: string;
  model: string;
  price: number;
  range: number; // in km
  acceleration: string; // 0-100 km/h
  image: string;
  description: string;
  category: 'Sedan' | 'SUV' | 'Hatch';
  features: string[];
}

export interface Lead {
  name: string;
  email: string;
  phone: string;
  carId: string;
  message?: string;
}
