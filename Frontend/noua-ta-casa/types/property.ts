// types/property.ts
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  rooms: number;
  surface: number; // suprafața utilă în mp
  type: 'apartament' | 'casa';
  imageUrl: string;
}