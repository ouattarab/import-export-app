import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // URL de l'API
  //private newUsersUrl = 'http://localhost:3000/newusers';
  private newUsersUrl = 'http://localhost:8082/api/persons/batch';

  constructor(private http: HttpClient) { }

  // Importer des utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }


    saveUsers(data: { persons: Pick<User, 'name' | 'city' | 'phone'>[] }): Observable<any> {
    return this.http.post<User[]>(this.newUsersUrl, data);
  }
  

  
  

}
