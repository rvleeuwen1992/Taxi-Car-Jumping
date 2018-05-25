# Taxi Car Jumping

## Besturing

- Met SPATIE is het mogelijk om te springen (voor het ontwijken van de rotsen en het pakken van de muntjes).
- Met A kan je de auto langzamer laten rijden.
- Met D kan je de auto sneller laten rijden.

## Het doel

Het doel is om zoveel mogelijk punten te verzamelen zonder dat je auto laat crashen op de rotsen die op de weg staan. Wanneer je de muntjes raakt krijg je per keer 5 extra punten.

## Code

- In game.ts worden de objecten gemaakt en de loops gemaakt. Ook wordt hier gekeken of er een collision is tussen de auto en de objecten. Ook wordt hier de score op het eind weergegeven.
- In car.ts vind je alle dingen die de auto doet. Bij het sneller of langzamer gaan van de auto en bij het springen wordt de Strategy Pattern gebruikt (behavior.ts, driving.ts, jumping.ts en crashing.ts). Deze werkt op het moment nog niet helemaal perfect.
- In Block.ts en longBlock.ts vind je de code voor de blokken die op je weg staan. Deze krijgen zo snel mogelijk een overerving, omdat nu dubbele code wordt gebruikt.
- In Coin.ts vind je de code voor de muntjes.