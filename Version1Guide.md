# Testgids voor US4 - Beheerder

## Voorbereiding
Volg deze stappen om de repository te klonen en de applicatie lokaal te starten:

### Klonen van de repository
```bash
git clone https://github.com/UCLL-Full-stack/project2425-groep3-4.git
```
### Stel omgevingsvariabelen in
Wijzig het bestand .env.example naar .env

### Backend instellen
- Navigeer naar de `backend`-directory:
```bash
  cd back-end
```
- Installeer de benodigde pakketten:
```bash
  npm install
```
- Start de backend-server:
```bash
  npm start
```
- **Optioneel**: Voer de backend-tests uit om te controleren of alles correct werkt:
```bash
  npm test
```
De swagger-doc url:  http://localhost:3000/api-docs

### Frontend instellen
- Navigeer naar de `frontend`-directory:
open new terminal en 
```bash
  cd front-end
```  
- Installeer de benodigde pakketten:
```bash
  npm install
``` 

- Start de frontend-applicatie:
```bash
  npm start
``` 
## Toegang tot de Applicatie
Open je webbrowser en navigeer naar [http://localhost:3000](http://localhost:3000) om de applicatie te bekijken en te testen.

## Gebruikersverhaal (US4) Testinstructies
Het volgende gebruikersverhaal wordt getest: **US4 - Beheerder**.

- **Als beheerder wil ik producten kunnen beheren met de CRUD-functionaliteiten zonder inloggen, zodat ik het hele WMS-systeem kan controleren.**

## Teststappen voor CRUD-functionaliteiten

### 1. Aanmaken van een product
- Ga naar de `Product`-pagina door de navigatieknop **Product** in de header te gebruiken.
- Vul de bovenste rij met velden (naam, beschrijving, locatie) in en klik op de knop **Add**.
- Controleer of het nieuwe product correct wordt weergegeven in de productlijst.

### 2. Lezen van productdetails
- Klik op de knop **Details** naast een product om de details van dat specifieke product te bekijken.
- Controleer of de gegevens correct worden weergegeven op de `Product Detail`-pagina.

### 3. Bijwerken van een product
- Op de `Product Detail`-pagina kun je de velden **Name**, **Description**, en **Location** bewerken.
- Klik op de knop **Update** om de wijzigingen op te slaan.
- Controleer of de wijzigingen succesvol zijn door terug te keren naar de `Product`-pagina en de bijgewerkte gegevens te bekijken.

### 4. Verwijderen van een product
- Klik op de knop **Delete** naast een product op de `Product`-pagina.
- Bevestig de actie wanneer daarom wordt gevraagd.
- Controleer of het product uit de lijst is verwijderd.

## Overige Informatie
- **Navigatie**: Gebruik de **Back to Products**-knop op de `Product Detail`-pagina om terug te keren naar de `Product`-pagina.
- **Libraries**: Indien extra (JavaScript) libraries vereist zijn, staan deze vermeld in de `package.json`-bestanden van zowel de `backend` als de `frontend`.
