# **Full-Stack Software Development**

## **Projectachtergrond**

Simple WMS (Warehouse Management System) is ontworpen om een eenvoudige maar uitgebreide magazijnbeheeroplossing te bieden voor MKB-bedrijven. 

Dit systeem helpt bedrijven hun operationele efficiëntie te verhogen en menselijke fouten te verminderen door het beheer van voorraden, orderverwerking en verzendprocessen te stroomlijnen.

## **Versie-informatie**

- **Documentversie**: 1.1
- **Status**: In beoordeling
- **Laatst bijgewerkt**: 2024-10-07

## **Projectbeschrijving**

### **Projecttitel**: Simple WMS

### **Beschrijving**:

De Simple WMS-app biedt een gebruiksvriendelijke oplossing voor magazijnbeheer, waardoor gebruikers effectief kunnen:

- **Voorraad bijhouden**: Houdt de huidige voorraadniveaus bij en volgt de locatie van producten.
- **Zendingen beheren**: Volgt zendingen vanaf het moment van bestelling tot levering.
- **Bestellingen beheren**: Gebruikers kunnen eenvoudig bestellingen aanmaken en volgen.

## **Rollen en verantwoordelijkheden**

### **Administrator (Admin)**

De beheerder heeft volledige controle over het WMS-systeem.

**Verantwoordelijkheden**:

- Gebruikersaccounts aanmaken, beheren en verwijderen.
- Rollen toewijzen aan andere gebruikers (bijvoorbeeld Magazijnmanager, Medewerker).
- Volledige toegang tot alle delen van het systeem, inclusief voorraad, bestellingen en verzendingen.

### **Magazijnmanager**

Verantwoordelijk voor de dagelijkse magazijnoperaties en zorgt voor een soepele uitvoering van het voorraad- en orderbeheer.

**Verantwoordelijkheden**:

- Beheer van voorraad: voorraadniveaus bijwerken, itemlocaties bijhouden en productdetails bekijken.
- Bestellingen maken en toewijzen aan magazijnmedewerkers voor het picken en verpakken.
- De orderstatus monitoren van creatie tot verzending.

### **Magazijnmedewerker**

Verantwoordelijk voor fysieke taken in het magazijn, zoals het picken, verpakken en aanvullen van voorraden.

**Verantwoordelijkheden**:

- Artikelen uit het magazijn halen op basis van bestelgegevens.
- Artikelen verpakken voor verzending en de orderstatus in het systeem bijwerken.
- Schappen aanvullen en de producthoeveelheden in het systeem bijwerken met behulp van barcodescanners of handmatige invoer.
- Toegewezen taken/orders bekijken met beperkte toegang tot systeeminstellingen of gebruikersbeheer.

### **Verzendmedewerker**

Beheert de verzending van uitgaande bestellingen en verwerkt inkomende zendingen.

**Verantwoordelijkheden**:

- Verzendlabels voorbereiden en genereren voor uitgaande bestellingen.
- Vervoerders toewijzen en trackingnummers verstrekken.
- De orderstatus bijwerken naar "verzonden" en trackinginformatie aan klanten doorgeven.
- Inkomende zendingen volgen en het systeem bijwerken met nieuwe voorraadinformatie.


## **Technologiestack**:

- **Backend**:
    - **Talen en frameworks**: NodeJS, Express
    - **Database**: Gebruik van Prisma voor object-relational mapping, het uitvoeren van transactionele queries
    - **Beveiliging**: Implementatie van op tokens gebaseerde authenticatie en autorisatie met JWT, beveiliging tegen SQL-injectie en andere veiligheidsrisico's
    - **Testen**: Testen met Jest, volgens de principes van testgedreven ontwikkeling (TDD)
- **Frontend**:
    - **Technologische frameworks**: React, Next.js
    - **CSS-framework**: Tailwind CSS
    - **Internationalisatie**: Implementatie van meertalige ondersteuning (i18n) in de applicatie
    - **Opslag**: Veilig gebruik van cookies en browser local/session storage voor het opslaan van cliëntzijde informatie/MongoDb
    - **Testen**: Testen met Jest en React Testing Library

**Ontwikkelingsprincipes**:

- Volgen van RESTful API ontwerp principes
- Gebruik van functionele componenten en Hooks in frontend-ontwikkeling
- Databaseontwerp in de backend volgt ACID-principes en passende isolatieniveaus