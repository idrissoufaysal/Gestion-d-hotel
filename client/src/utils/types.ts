import { DateRange } from "react-day-picker";
export const ApiUrl="http://localhost:8000"
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

export interface State {
  city?: string;
  dates: DateRange;
  options: Options;
}

export interface StoreState extends State {
  setCity: (city: string | undefined) => void;
  setDates: (dates: DateRange | undefined) => void;
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
  role: "USER" | "ADMIN";
}

export interface AuthResponse {
  user: User;
  token: string;
}

///////////////////////////////////////

export interface Home1 {
  image: string;
  title: string;
  title2: string;
  price?: number;
}

export interface Home2 {
  image: string;
  title: string;
  title2: string;
  price?: number;
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
  roomNumbers: number;
}

// Type pour un tableau de Room

//type pour les hotels
export enum Type {
  Villa,
  Maison,
  Hotel,
  Appartement,
  Studio,
  Chateaux,
}

export interface OptionsType {
  value: "Villa"| "Maison"| "Hotel"|"Appartement"|"Studio"| "Chateaux";
  label?: "Villa"| "Maison"| "Hotel"|"Appartement"|"Studio"| "Chateaux";
}

export interface Property {
  id: number;
  name: string;
  type: Type;
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
