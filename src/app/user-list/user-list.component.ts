import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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

saveAllUsers(): void {
  if (this.users.length === 0) {
    alert("Aucune donnée à enregistrer !");
    return;
  }

  this.isLoading = true;

  this.userService.saveUsers(this.users).subscribe({
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

  

  // Exporter les utilisateurs en CSV
 /* exportCSV(): void {
    const csv = this.userService.exportUsersToCSV(this.users);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }*/
}
