
export interface DateSelection {
  startDate: Date;
  endDate: Date;
  key: string;
}

//////////////////// State management /////////////////
export interface Options {
  adult?: number;
  children?: number;
  room?: number;
}

export interface State{
  city?: string,
  dates: DateSelection[],
  options: Options
}

export interface StoreState extends State {
  setCity: (city: string) => void;
  setDates: (dates: DateSelection[]) => void;
  setOptions: (options: Options) => void;
  resetSearch: () => void;
}
///////////////////////////////////////////////////////////  


////USER AUTH/////////////////////////
export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  user: User;
  token: string;
}

///////////////////////////////////////


export interface Home1 {
  image: string,
  title: string,
  title2: string
  price?: number
}

export interface Home2 {
  image: string,
  title: string,
  title2: string
  price?: number
}

export interface PropertyType {
  type: string;
  count: number;
}

// Interface pour UnavailableDate
export interface UnavailableDate {
  id: number;
  date: string; // Utilisation de string pour représenter une date en format ISO
  roomNumberId: number;
}

// Interface pour RoomNumber
export interface RoomNumber {
  id: number;
  number: number;
  roomId: number;
  unavailableDates: UnavailableDate[];
}

// Interface pour Room
export interface Room {
  id: number;
  title: string;
  desc: string;
  price: number;
  maxPeople: number;
  hotelId: number;
  roomNumbers: RoomNumber[];
}

// Type pour un tableau de Room


export interface Property {
  id: number;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  desc: string;
  title: string;
  cheapesPrice: number;
  featured: boolean;
  rating: number;
  rooms: Room[];
}



