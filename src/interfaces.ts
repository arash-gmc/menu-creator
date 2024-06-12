export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  photoPublicId?: string;
  offPercent: number;
  offDueDate: Date;
}

export interface Restaurant {
  id: string;
  username: string;
  title: string;
  theme: string;
  logoPublicId: string;
  instagramId: string;
  type: string;
  email: string;
  phoneNumber: string;
}

export const restaurantTypes = ["restaurant", "cafe", "fast-food"] as const;

export type RestaurantTypes = (typeof restaurantTypes)[number];

export interface BackendError {
  message: string;
}
