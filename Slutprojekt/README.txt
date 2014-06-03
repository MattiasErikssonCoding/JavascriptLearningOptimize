

Välkommen!

Installation:
För att installera paketet och börja koda så behöver du en textredigerare och en webserver. Ifall du använder
Windows så rekommenderas textredigeraren Notepad++ och webservern WampServer för lätt och smidig operation. Ifall
du använder Linux eller Mac så rekommenderas webservern Apache2. Ifall du använder terminalen ofta så
rekommenderas VIM, ifall du är mer van vid att använda grafiska interface så rekommenderas Gedit. 
Du väljer förstås själv vilken textredigerare och webserver du vill använda, rekommendationer är endast 
rekommendationer.


Exempeluppgifter:

Steg 1 - Bekanta dig med koden:
Se över koden i filen main.js och se ifall du förstår den koden som redan är skriven. Ifall du känner att du 
förstår allt som står skrivet så kan du gå vidare. Om du inte känner att du förstår det som står skrivet i koden 
så finns det flera sätt att få en bättre förståelse för vad det är som händer. Gå till rad 376 i main.js, här
hittar du huvudfunktionen för programmet. Det som händer när main.js körs är just det som står i den här 
funktionen. Använd Google för hitta information om termer du inte förstår, här kan du testa att söka på termen
$(function() {}); och läsa om varför funktionen är uppgbyggd på följande sätt, eller så kan du testa att söka
på 'use strict'; och se varför detta är med. Att kunna hitta information om termer som du inte förstår i koden
du läser är viktigt, det är på det sättet som du kan hitta variationer på lösningarna i den existerande koden.
Nu när du är bekant med hur du hittar information om koden, försök följa den röda tråden genom funktionerna.
Sitt med penna och papper ifall du behöver hjälp att komma ihåg vart du varit. Vi börjar i huvudfunktionen.
Lokalisera funktionen Asteroids.init();. Asteroids.init(); betyder att metoden Asteroids har en funktion som 
heter init i sig, och det är då funktionen init i metoden Asteroids som vi kallar här. Fortsätt så, och bekanta
dig med innehållet i main.js.

Steg 2 - Dokumentera
Nu borde du veta hur den röda tråden går genom koden och vilka funktioner som kallas från vilka platser. Nu är 
det dags att förstå vad funktionerna gör. Börja med att dokumentera varje funktion, skriv ner exakt vad 
funktionen gör. Det här kommer hjälpa dig att dels förstå alla funktioner som är med i koden, men det kommer 
också hjälpa dig att komma ihåg vad och hur funktionen gör det den gör. Det finns redan viss dokumentation i 
koden, men du kan inte lita på att den här dokumentationen är korrekt. Detta ska föreställa vara ett projekt
där flera olika personer redan vart inne och arbetat. Var säker på att allt är som det ska.

Steg 3 - Börja programmera
Nu borde du vara bekant med koden och förstå exakt vad det är som händer. Nu är det dags att börja programmera.
Se över dom funktioner som finns en gång till. Det finns flera funktioner i koden som använder simpla och
ineffektiva algoritmer för att räkna ut exempelvis kollisionshantering. Det finns flera platser på internet där 
du kan läsa om simpel och avancerad kollisionshantering. Ett inbyggt problem i koden är att bollen hoppar över
paddeln ifall hastigheten på bollen blir för hög. Kan du hitta en lösning på problemet?

Efter dessa tre steg så borde du vara på rätt väg. Var inte rädd att ändra i koden, och var inte rädd för att 
testa något helt nytt. Kan du hitta ett bättre sätt att repsentera objekten i spelen? Kan du komma på ett sätt 
att lägga till en bakgrund om rör sig oberoende av andra objekt? Testa spelet i olika webläsare, kan du komma 
på varför spelet ger olika fps beroende på vilken webbläsare den använder?

Musiken är skapad av 2NEO8OT och är hämtad från freemusicarchive.org. 
Ljudeffekterna är hämtade från freesound.org.
Koden är skriven av Mattias Eriksson.

Allt material är licensfritt under Creative Commons.
