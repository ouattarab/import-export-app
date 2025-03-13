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
  users: User[] = [];
 // isLoading = false;
  columns = [
   // { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Nom' },
    { prop: 'email', name: 'Email' },
    { prop: 'age', name: 'Âge' },
    { prop: 'city', name: 'Ville' },
    { prop: 'phoneNumber', name:'Telephone'}
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   /* console.log("🔔 Initialisation du composant, récupération des utilisateurs...");
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log("Données brutes reçues:", data); // Vérifie ici
        this.users = data || []; 
        console.log("Données transformées:", this.users);
      },
      error: (err) => console.error("Erreur lors de la récupération des utilisateurs:", err)
     // this.injectTestData();
    });* */
    this.getUsers();
  
  }

    // 🔥 Nouvelle méthode pour rafraîchir les données
getUsers(): void {
  this.userService.getUsers().subscribe({
    next: (data) => {
      console.log("📊 Mise à jour des utilisateurs :", data);
      this.users = data || []; 
    },
    error: (err) => console.error("🚨 Erreur lors de la mise à jour des utilisateurs :", err)
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
  
    // 🔹 Définir les variables supplémentaires
    const variable1 = "Valeur1"; // Remplace par la vraie valeur
    const variable2 = "Valeur2"; // Remplace par la vraie valeur
  
    // Transformer les données pour ne garder que `name`, `city` et `phoneNumber`
    const filteredUsers = this.users.map(user => ({
      name: user.name,
      city: user.city,
      phoneNumber: user.phoneNumber,
    })) as Pick<User, 'name' | 'city' | 'phoneNumber'>[];
  
    console.log('🔹 Données filtrées envoyées au backend :', { persons: filteredUsers, variable1, variable2 });
  
    // ✅ Envoi correct avec `{ persons, variable1, variable2 }`
    this.userService.saveUsers({ persons: filteredUsers, variable1, variable2 }).subscribe({
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
  

  /**
   * 🔹 Fonction pour importer un fichier CSV et extraire les `phoneNumber`
   */
  importCSV(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      alert("Aucun fichier sélectionné !");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvContent = e.target.result;
      this.processCSV(csvContent);
    };
    reader.readAsText(file);
  }

  /**
   * 🔹 Fonction pour traiter le contenu du fichier CSV
   */
  processCSV(csvContent: string): void {
    const rows = csvContent.split('\n'); // Séparation des lignes
    const extractedNumbers: { phoneNumber: string }[] = [];

    rows.forEach(row => {
      const columns = row.split(','); // Supposons que les valeurs soient séparées par des virgules
      if (columns.length > 0) {
        const phoneNumber = columns[0].trim(); // Supposons que `phoneNumber` est la 1ère colonne
        if (phoneNumber) {
          extractedNumbers.push({ phoneNumber });
        }
      }
    });

    console.log("📂 Numéros extraits du CSV :", extractedNumbers);

    if (extractedNumbers.length > 0) {
      this.savePhoneNumbers(extractedNumbers);
    } else {
      alert("Aucun numéro valide trouvé dans le fichier.");
    }
  }

  /**
   * 🔹 Fonction pour enregistrer la liste des `phoneNumber` extraits
   */
  savePhoneNumbers(phoneNumbers: { phoneNumber: string }[]): void {
    this.isLoading = true;

    this.userService.saveImport({ persons: phoneNumbers }).subscribe({
      next: () => {
        this.isLoading = false;
        alert("Les numéros de téléphone ont été enregistrés avec succès !");
        this.getUsers(); // Rafraîchir la liste
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Erreur lors de l'enregistrement :", err);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  }

  
  
  
   

 
}
