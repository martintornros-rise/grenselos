import type { Itinerary } from "./models"

export const itineraryTestData =
{
  "title": "Sommaräventyr i Västsverige & Østfold – Familjeroadtrip",
  "days": [
    {
      "title": "Dag 1 – Vita Sannar, Mellerud",
      "location": {
        "name": "Vita Sannar",
        "coordinates": [58.7026, 12.4466],
        "country_code": "SE",
        "description": "Barnvänlig badstrand vid Vänern med aktiviteter som minigolf, cykling och lekplatser.",
        "url": "https://www.vitasannar.se"
      },
      "description": "Starta resan med bad och lek vid Vänerns strand – perfekt för barn och avkoppling."
    },
    {
      "title": "Dag 2 – Akvedukten i Håverud & Dalslands kanal",
      "location": {
        "name": "Håverud",
        "coordinates": [58.8072, 12.4132],
        "country_code": "SE",
        "description": "Se den unika akvedukten där båtar passerar över en bro med vatten, och ta en tur på Dalslands kanal.",
        "url": "https://www.vastsverige.com/dalsland/produkter/akvedukten-i-haverud/"
      },
      "description": "Utforska ett tekniskt underverk och åk kanalbåt bland slussar och sjöar."
    },
    {
      "title": "Dag 3 – Tresticklans nationalpark",
      "location": {
        "name": "Tresticklan Nationalpark",
        "coordinates": [59.1173, 11.7410],
        "country_code": "SE",
        "description": "Orörd vildmark i norra Dalsland med sjöar och lättillgängliga vandringsleder.",
        "url": "https://www.sverigesnationalparker.se/park/tresticklan-nationalpark/"
      },
      "description": "Paddla lugnt på småsjöar, vandra bland skogar och upplev stillheten i vildmarken."
    },
    {
      "title": "Dag 4 – Vitlycke museum, Tanum",
      "location": {
        "name": "Vitlycke museum",
        "coordinates": [58.7043, 11.3273],
        "country_code": "SE",
        "description": "Världsarvsområde med bronsåldershällristningar och familjevänligt museum.",
        "url": "https://www.vitlyckemuseum.se"
      },
      "description": "Lär er om bronsåldern, vandra bland hällristningar och delta i aktiviteter på museet."
    },
    {
      "title": "Dag 5 – Fjällbacka",
      "location": {
        "name": "Fjällbacka",
        "coordinates": [58.5991, 11.2840],
        "country_code": "SE",
        "description": "Skärgårdsidyll med båtturer, små butiker och promenader vid havet.",
        "url": "https://www.vastsverige.com/fjallbacka/"
      },
      "description": "Upplev västkustens charm med båttur till öar, havsbad och glass i hamnen."
    },
    {
      "title": "Dag 6 – Fredriksten fästning, Halden",
      "location": {
        "name": "Fredriksten festning",
        "coordinates": [59.1230, 11.3874],
        "country_code": "NO",
        "description": "Historisk fästning med utsikt över Halden och lätt att utforska utan branta höjder.",
        "url": "https://www.visitoestfold.com/no/halden/artikler/fredriksten-festning/"
      },
      "description": "Vandra bland historiska byggnader och koppla av vid strandpromenaden i Halden."
    },
    {
      "title": "Dag 7 – Rød Herregård & Iddefjorden",
      "location": {
        "name": "Rød Herregård",
        "coordinates": [59.1212, 11.3836],
        "country_code": "NO",
        "description": "Historisk herrgårdspark i Halden samt närhet till natur- och vattenupplevelser vid Iddefjorden.",
        "url": "https://ostfoldmuseene.no/avdeling/halden/historiske-halden/rod-herregard"
      },
      "description": "Avsluta med en rofylld promenad i herrgårdsparken eller paddla vid fjorden – ett lugnt och naturnära slut på resan."
    }
  ]
} as Itinerary
