# Testgids voor US4 - Beheerder

## Voorbereiding

Volg deze stappen om de repository te klonen en de applicatie lokaal te starten:

### Klonen van de repository

```bash
git clone https://github.com/UCLL-Full-stack/project2425-groep3-4.git
```

### Stel omgevingsvariabelen in

Wijzig het bestand `.env.example` naar `.env`.

### Backend instellen

- Navigeer naar de `back-end`directory:

```bash
  cd back-end
```

- Installeer de benodigde pakketten:

```bash
  npm install
```

- Voer de database migraties uit:

```bash
  npx prisma migrate dev
```

- Start de backend-server:

```bash
  npm start
```

- **Optioneel**: Voer de backend-tests uit om te controleren of alles correct werkt:

```bash
  npm test
```

De swagger-doc url: http://localhost:3000/api-docs

### Frontend instellen

- Navigeer naar de `front-end`directory:

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

Open je webbrowser en navigeer naar [http://localhost:3000](http://localhost:3000/) om de applicatie te bekijken en te testen.

## Seed Data

- Om de testgegevens in de database in te voeren, kun je de seed-script gebruiken. Dit vult de database met testdata zodat je de applicatie kunt testen met vooraf ingevulde informatie.
- Voer de volgende opdracht uit om de gegevens in te voeren:

```bash
npx ts-node util/seed.ts
```

## Gebruikersverhaal (US4) Testinstructies

Het volgende gebruikersverhaal wordt getest: **US4 - Beheerder**.

- **Als beheerder wil ik producten kunnen beheren met de CRUD-functionaliteiten zonder inloggen, zodat ik het hele WMS-systeem kan controleren.**

### Teststappen voor CRUD-functionaliteiten

### 1. Aanmaken van een product

- Ga naar de `Product`pagina door de navigatieknop **Product** in de header te gebruiken.
- Vul de bovenste rij met velden (naam, beschrijving, locatie) in en klik op de knop **Add**.
- Controleer of het nieuwe product correct wordt weergegeven in de productlijst.

### 2. Lezen van productdetails

- Klik op de knop **Details** naast een product om de details van dat specifieke product te bekijken.
- Controleer of de gegevens correct worden weergegeven op de `Product Detail`pagina.

### 3. Bijwerken van een product

- Op de `Product Detail`pagina kun je de velden **Name**, **Description**, en **Location** bewerken.
- Klik op de knop **Update** om de wijzigingen op te slaan.
- Controleer of de wijzigingen succesvol zijn door terug te keren naar de `Product`pagina en de bijgewerkte gegevens te bekijken.

### 4. Verwijderen van een product

- Klik op de knop **Delete** naast een product op de `Product`pagina.
- Bevestig de actie wanneer daarom wordt gevraagd.
- Controleer of het product uit de lijst is verwijderd.

---

## Gebruikersverhalen en Acceptatiecriteria

### US1: Magazijnmanager

**Als magazijnmanager wil ik nieuwe bestellingen kunnen aanmaken, voorraadniveaus bijhouden en productdetails bekijken, zodat ik tijdig kan bijbestellen wanneer de voorraad laag is en ervoor kan zorgen dat medewerkers de bestellingen kunnen picken en verpakken.**

### Acceptatiecriteria:

- Gebruiker kan succesvol nieuwe bestellingen aanmaken.
- Systeem toont actuele voorraadniveaus en productdetails.
- Bij lage voorraadniveaus verschijnt een melding voor herbestelling.

### US2: Magazijnmedewerker

**Als magazijnmedewerker wil ik producthoeveelheden kunnen bijwerken en een lijst van openstaande bestellingen kunnen bekijken, zodat de voorraadgegevens actueel blijven en ik weet welke artikelen ik moet picken en verpakken.**

### Acceptatiecriteria:

- Medewerker kan eenvoudig voorraadhoeveelheden aanpassen.
- Lijst met openstaande bestellingen wordt correct weergegeven.
- Pick- en verpakinformatie is duidelijk zichtbaar in de interface.

### US3: Verzendmedewerker

**Als verzendmedewerker wil ik de verzendstatus kunnen genereren en uitgaande bestellingen kunnen volgen, zodat ik ervoor kan zorgen dat de verzending op tijd aankomt.**

### Acceptatiecriteria:

- Verzendmedewerker kan voor elke bestelling een verzendstatus genereren.
- Trackinginformatie wordt correct gegenereerd en opgeslagen.
- De status van een bestelling kan eenvoudig worden bijgewerkt naar "verzonden".

### US4: Beheerder

**Als beheerder wil ik rollen kunnen toevoegen en het hele WMS-systeem beheren, CRUD-operaties uitvoeren, zodat ik de verschillende delen van het Simple WMS kan controleren.**

### Acceptatiecriteria:

- Beheerder kan eenvoudig nieuwe gebruikersrollen aanmaken.
- Alle CRUD-operaties (Aanmaken, Lezen, Bijwerken, Verwijderen) functioneren correct binnen het systeem.
- Beheerder heeft toegang tot alle delen van het systeem en kan rollen effectief toewijzen