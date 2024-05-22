export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  offPercent: number;
  offDueDate: Date;
}

export interface Restaurant {
  id: string;
  username: string;
  title: string;
}

export interface BackendError {
  message: string;
}
