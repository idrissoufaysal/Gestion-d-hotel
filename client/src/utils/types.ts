

export interface DateSelection {
    startDate: Date;
    endDate: Date | null;
    key: string;
  }

  export interface Options {
    adult: number;
    children: number;
    room: number;
  }
  
  export interface Home1{
     image:string,
     title:string,
     title2:string
     price?: number 
  }

  export interface Home2{
     image:string,
     title:string,
     title2:string
     price?: number 
  }

 export interface PropertyType {
   type: string;
   count: number;
 }

export interface Room {
  // Ajoutez ici les propriétés de Room, si nécessaire
  // Exemple : roomNumber: number;
}

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
 
 
  
