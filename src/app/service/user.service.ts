import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // URL de l'API
  private newUsersUrl = 'http://localhost:3000/newusers';

  constructor(private http: HttpClient) { }

  // Importer des utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  saveUsers(users: User[]): Observable<User> {
    return this.http.post<User>(this.newUsersUrl, users);
  }

  
  

}
