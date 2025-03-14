#Vérifie la classe Person
#Assure-toi que les attributs et les méthodes setSomeField et setAnotherField existent bien.

#Exemple de classe correcte :

@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;
    private String phoneNumber;
    private Long sequence;
    
    private String variable1;  // Ajout des champs
    private String variable2;

    // Getters et setters
    public void setVariable1(String variable1) {
        this.variable1 = variable1;
    }

    public void setVariable2(String variable2) {
        this.variable2 = variable2;
    }
}

#Remplace setSomeField et setAnotherField par les bons setters :
#Dans ta méthode de service, remplace :
#person.setVariable1(variable1);
#person.setVariable2(variable2);
#Par les bons setters qui existent dans Person.

#Vérifie ton PersonRequestDTO :
#Si variable1 et variable2 doivent être envoyés du front, assure-toi qu’ils existent bien dans #PersonRequestDTO :
public class PersonRequestDTO {
    private List<PersonDTO> persons;
    private String variable1;
    private String variable2;
}
#Si nécessaire, modifie mapToEntity :
#Si la méthode mapToEntity est utilisée pour convertir PersonDTO en Person, assure-toi qu’elle #prend en compte variable1 et variable2 :
public Person mapToEntity(PersonDTO dto, String variable1, String variable2) {
    Person person = new Person();
    person.setName(dto.getName());
    person.setCity(dto.getCity());
    person.setPhoneNumber(dto.getPhoneNumber());
    person.setVariable1(variable1);
    person.setVariable2(variable2);
    return person;
}

#Et adapte l'appel dans ton service :
List<Person> personsToSave = personRequestDTO.getPersons().stream()
        .map(dto -> mapToEntity(dto, personRequestDTO.getVariable1(), personRequestDTO.getVariable2()))
        .collect(Collectors.toList());
