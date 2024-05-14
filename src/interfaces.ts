export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface Restaurant {
  id: string;
  username: string;
  title: string;
}

export interface BackendError {
  message: string;
}
