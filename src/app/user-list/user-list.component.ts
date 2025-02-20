import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { User } from '../models/user.model';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
 // isLoading = false;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Nom' },
    { prop: 'email', name: 'Email' },
    { prop: 'age', name: 'Âge' },
    { prop: 'city', name: 'Ville' }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log("Données brutes reçues:", data); // Vérifie ici
        this.users = data || []; 
        console.log("Données transformées:", this.users);
      },
      error: (err) => console.error("Erreur lors de la récupération des utilisateurs:", err)
    });
    
  }

  //save
  isLoading = false;

/*saveAllUsers(): void {
  if (this.users.length === 0) {
    alert("Aucune donnée à enregistrer !");
    return;
  }

  this.isLoading = true;
   // Transformer les données pour ne garder que `name` et `city`
   const filteredUsers = this.users.map(user => ({
    name: user.name,
    city: user.city
  }));

  console.log('🔹 Données filtrées envoyées au backend :', filteredUsers);
 // console.log('Transmi',this.users);
 // this.userService.saveUsers(this.users).subscribe({
    this.userService.saveUsers({persons: filteredUsers}).subscribe({
    next: () => {
      this.isLoading = false;
      alert("Les utilisateurs ont été enregistrés avec succès !");
    },
    error: (err) => {
      this.isLoading = false;
      console.error("Erreur lors de l'enregistrement :", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });
} */

  saveAllUsers(): void {
    if (this.users.length === 0) {
      alert("Aucune donnée à enregistrer !");
      return;
    }
  
    this.isLoading = true;
  
    // Transformer les données pour ne garder que `name` et `city`
    const filteredUsers = this.users.map(user => ({
      name: user.name,
      city: user.city
    })) as Pick<User, 'name' | 'city'>[];
  
    console.log('🔹 Données filtrées envoyées au backend :', { persons: filteredUsers });
  
    // ✅ Envoi correct avec `{ persons: filteredUsers }`
    this.userService.saveUsers({ persons: filteredUsers }).subscribe({
      next: () => {
        this.isLoading = false;
        alert("Les utilisateurs ont été enregistrés avec succès !");
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Erreur lors de l'enregistrement :", err);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  }
  
  
   

 
}
