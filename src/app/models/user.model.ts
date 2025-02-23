export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
    phone: string;
    test?: string; // ? signifie que ce champ est optionnel
  }
  