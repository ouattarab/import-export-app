import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private apiUrl = 'http://localhost:8082/api/persons/persons'; // URL de l'API
  //private newUsersUrl = 'http://localhost:3000/newusers';
  private newUsersUrl = 'http://localhost:8082/api/persons';

  constructor(private http: HttpClient) { }

  // Importer des utilisateurs
  getUsers(): Observable<User[]> {
    const params = new HttpParams().set('timestamp', Date.now().toString());
    return this.http.get<User[]>(this.newUsersUrl, { params });
  }


  saveUsers(data: { persons: Pick<User, 'name' | 'city' | 'phoneNumber'>[], variable1: string, variable2: string }): Observable<any> {
    return this.http.post<User[]>(this.newUsersUrl, data);
  }
  
  
  saveImport(data: { persons: Pick<User, 'phoneNumber'>[] }): Observable<any> {
    return this.http.post<User[]>(this.newUsersUrl, data);
  }

  
  

}
