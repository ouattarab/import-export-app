export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
    test?: string; // ? signifie que ce champ est optionnel
  }
  