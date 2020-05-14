Api filters

http://<ip>/ophalen/zoekfilter/<zoekquery>/<filterstring>


http://<ip>/ophalen/zoeken/<zoekquery>


http://<ip>/ophalen/filter/<filterstring>

Category's:
*//todo

Value's:
*//todo



LET OP
Vervang <Value.Category;> in zijn geheel met de string. In het eindresultaat zitten dus geen < of andersgenoemd pijltjes.
EINDIGEN GEBEURT OOK MET EEN ; OF ANDERSGENOEMD EEN PUNT-KOMMA.



<zoekquery>
string na '/' die de zoekvraag bevat. 
/<zoekquery>

<filterstring>
Bevat alle geselecteerde filters in de volgende format:
<value.category;value.category;value.category;>
Komma's worden genegeerd.
 
 
Bij ons is dat dus:
<UX designer.Rol;Front-end Developer.Rol;Vakbekwaam, juiste kennis ontwikkelen.Competentie;>
Voor HBO-I geldt dus:
<value.category> voor ieder Architectuurlaag, Activiteit, Niveau
<Gebruikersinteractie.Architectuurlaag;Ontwerpen.Activiteit;2.Niveau;>
Hierdoor kunnen gebruikers op enkele van deze dingen afzonderlijk filteren.
