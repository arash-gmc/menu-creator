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
  name: string;
}

export interface BackendError{
  message:string
}
