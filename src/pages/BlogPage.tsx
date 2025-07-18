import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Heart,
  TrendingUp,
  Brain,
  Leaf,
  Activity
} from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      slug: "waarom-dieten-niet-werken",
      title: "Waarom Diëten Niet Werken",
      excerpt: "Ontdek waarom 95% van alle diëten faalt en wat je wel kunt doen voor duurzame gewichtsafname.",
      content: `
        <p>Elk jaar beginnen miljoenen mensen wereldwijd aan een dieet, vol goede moed en vastberadenheid. Maar statistieken tonen aan dat 95% van alle diëten uiteindelijk faalt. Waarom gebeurt dit steeds opnieuw?</p>
        
        <h3>Het Probleem met Restricties</h3>
        <p>De meeste diëten zijn gebaseerd op restrictie - het weglaten van bepaalde voedingsmiddelen of het drastisch verlagen van calorieën. Dit zorgt voor een aantal problemen:</p>
        
        <ul>
          <li><strong>Metabolische aanpassing:</strong> Je lichaam past zich aan door je stofwisseling te vertragen</li>
          <li><strong>Psychologische weerstand:</strong> Verboden voedsel wordt alleen maar aantrekkelijker</li>
          <li><strong>Sociale isolatie:</strong> Strikte regels maken sociale situaties moeilijk</li>
          <li><strong>Onhoudbare gewoonten:</strong> Extreme veranderingen zijn niet vol te houden</li>
        </ul>
        
        <h3>De Jojo-Effect</h3>
        <p>Wanneer je stopt met het dieet (wat bijna onvermijdelijk is), komt het gewicht er vaak harder aan dan voorheen. Dit komt doordat:</p>
        
        <ul>
          <li>Je stofwisseling nog steeds vertraagd is</li>
          <li>Je honger- en verzadigingssignalen verstoord zijn</li>
          <li>Je oude eetgewoonten terugkeren</li>
          <li>Je lichaam extra vet opslaat als 'bescherming'</li>
        </ul>
        
        <h3>Wat Wel Werkt</h3>
        <p>In plaats van diëten, focus op:</p>
        
        <ul>
          <li><strong>Gedragsverandering:</strong> Kleine, haalbare veranderingen in je dagelijkse routine</li>
          <li><strong>Mindful eating:</strong> Bewust eten en luisteren naar je lichaam</li>
          <li><strong>Balans:</strong> Alle voedingsmiddelen kunnen passen in een gezond patroon</li>
          <li><strong>Lifestyle:</strong> Focus op algehele gezondheid, niet alleen gewicht</li>
        </ul>
        
        <p>Duurzame gewichtsafname draait niet om perfecte discipline, maar om het creëren van een gezonde relatie met voeding die je een leven lang kunt volhouden.</p>
      `,
      category: "Gewichtsmanagement",
      readTime: "5 min",
      publishedAt: "2024-01-15",
      author: "Maria van der Berg",
      image: "/api/placeholder/600/400",
      icon: TrendingUp
    },
    {
      id: 2,
      slug: "5-simpele-tips-gezonder-eten",
      title: "5 Simpele Tips voor Gezonder Eten",
      excerpt: "Praktische en haalbare tips om vandaag nog gezonder te gaan eten, zonder drastische veranderingen.",
      content: `
        <p>Gezonder eten hoeft niet ingewikkeld te zijn. Met deze 5 simpele tips kun je vandaag nog beginnen met het verbeteren van je voeding, zonder je hele leven overhoop te gooien.</p>
        
        <h3>1. Begin Je Dag met Eiwit</h3>
        <p>Een eiwitrijk ontbijt helpt je:</p>
        <ul>
          <li>Langer verzadigd te blijven</li>
          <li>Bloedsuikerschommelingen te voorkomen</li>
          <li>Spiermassa te behouden</li>
          <li>Minder trek te hebben in snacks</li>
        </ul>
        <p><strong>Praktische tip:</strong> Voeg eieren, Griekse yoghurt, noten of zaden toe aan je ontbijt.</p>
        
        <h3>2. Vul de Helft van Je Bord met Groenten</h3>
        <p>Groenten zijn rijk aan vezels, vitamines en mineralen, en bevatten weinig calorieën. Door de helft van je bord te vullen met groenten:</p>
        <ul>
          <li>Krijg je automatisch meer voedingsstoffen binnen</li>
          <li>Voel je je sneller verzadigd</li>
          <li>Heb je minder ruimte voor minder gezonde opties</li>
        </ul>
        <p><strong>Praktische tip:</strong> Bereid groenten op verschillende manieren - rauw, gestoomd, geroosterd of in een salade.</p>
        
        <h3>3. Drink Meer Water</h3>
        <p>Voldoende water drinken is essentieel voor:</p>
        <ul>
          <li>Een goede stofwisseling</li>
          <li>Afvaltransport uit je lichaam</li>
          <li>Energieniveau en concentratie</li>
          <li>Huid en haar gezondheid</li>
        </ul>
        <p><strong>Praktische tip:</strong> Zet een fles water op je bureau en drink elke keer als je ernaar kijkt een slokje.</p>
        
        <h3>4. Kies Volkorenproducten</h3>
        <p>Volkoren producten bevatten meer vezels, vitamines en mineralen dan geraffineerde producten. Ze zorgen voor:</p>
        <ul>
          <li>Stabielere bloedsuikerspiegel</li>
          <li>Langer verzadigingsgevoel</li>
          <li>Betere darmgezondheid</li>
          <li>Meer energie</li>
        </ul>
        <p><strong>Praktische tip:</strong> Vervang wit brood, witte rijst en gewone pasta geleidelijk door volkoren varianten.</p>
        
        <h3>5. Eet Mindful</h3>
        <p>Mindful eten betekent bewust aandacht besteden aan je maaltijd:</p>
        <ul>
          <li>Eet zonder afleiding (tv, telefoon)</li>
          <li>Kauw langzaam en proef je eten</li>
          <li>Luister naar je honger- en verzadigingssignalen</li>
          <li>Geniet van elke hap</li>
        </ul>
        <p><strong>Praktische tip:</strong> Begin met één maaltijd per dag mindful eten en bouw dit langzaam uit.</p>
        
        <h3>Start Klein</h3>
        <p>Probeer niet alle tips tegelijk toe te passen. Kies er één uit en focus daar 2-3 weken op totdat het een gewoonte wordt. Daarna kun je de volgende tip toevoegen.</p>
        
        <p>Onthoud: kleine, consistente veranderingen leiden tot grote resultaten op de lange termijn!</p>
      `,
      category: "Voeding",
      readTime: "4 min",
      publishedAt: "2024-01-08",
      author: "Maria van der Berg",
      image: "/api/placeholder/600/400",
      icon: Heart
    },
    {
      id: 3,
      slug: "stress-en-gewicht-verband",
      title: "Stress en Gewicht: Het Verband",
      excerpt: "Hoe chronische stress je gewicht beïnvloedt en wat je eraan kunt doen voor een gezonder leven.",
      content: `
        <p>Wist je dat stress een van de grootste obstakels kan zijn voor gewichtsverlies? Het verband tussen stress en gewicht is complex, maar begrijpen hoe het werkt kan je helpen om effectiever af te vallen en gezonder te leven.</p>
        
        <h3>Hoe Stress je Gewicht Beïnvloedt</h3>
        
        <h4>1. Cortisol - Het Stresshormoon</h4>
        <p>Wanneer je stress ervaart, produceert je lichaam cortisol. Chronisch verhoogde cortisol niveaus kunnen leiden tot:</p>
        <ul>
          <li>Toename van buikvet</li>
          <li>Verhoogde eetlust, vooral naar zoete en vette voedingsmiddelen</li>
          <li>Vertraagde stofwisseling</li>
          <li>Insulineresistentie</li>
        </ul>
        
        <h4>2. Emotioneel Eten</h4>
        <p>Stress kan leiden tot emotioneel eten - het gebruik van voedsel om je beter te voelen in plaats van om honger te stillen. Dit resulteert vaak in:</p>
        <ul>
          <li>Overeating</li>
          <li>Keuze voor ongezonde 'comfort foods'</li>
          <li>Eten op momenten dat je niet hongerig bent</li>
          <li>Schuldgevoelens, wat weer meer stress veroorzaakt</li>
        </ul>
        
        <h4>3. Slaapverstoringen</h4>
        <p>Stress verstoort vaak je slaap, wat weer invloed heeft op:</p>
        <ul>
          <li>Hormonen die honger en verzadiging reguleren (ghreline en leptine)</li>
          <li>Je energie niveau de volgende dag</li>
          <li>Je vermogen om gezonde keuzes te maken</li>
          <li>Je motivatie om te bewegen</li>
        </ul>
        
        <h3>Signalen van Stress-gerelateerde Gewichtstoename</h3>
        <p>Herken je deze signalen?</p>
        <ul>
          <li>Plotselinge gewichtstoename, vooral rond de buik</li>
          <li>Oncontroleerbare trek in zoete of vette snacks</li>
          <li>Eten als reactie op emoties in plaats van honger</li>
          <li>Moeilijk afvallen ondanks dieet en beweging</li>
          <li>Vermoeidheid en energiegebrek</li>
        </ul>
        
        <h3>Strategieën om Stress te Beheersen</h3>
        
        <h4>1. Stressmanagement Technieken</h4>
        <ul>
          <li><strong>Ademhalingsoefeningen:</strong> 5 minuten diep ademhalen kan cortisol verlagen</li>
          <li><strong>Meditatie:</strong> Al 10 minuten per dag kan helpen</li>
          <li><strong>Yoga:</strong> Combineert beweging met ontspanning</li>
          <li><strong>Mindfulness:</strong> Bewust in het moment zijn</li>
        </ul>
        
        <h4>2. Gezonde Coping Strategieën</h4>
        <p>In plaats van eten als reactie op stress, probeer:</p>
        <ul>
          <li>Een wandeling maken</li>
          <li>Een vriend bellen</li>
          <li>Muziek luisteren</li>
          <li>Een warm bad nemen</li>
          <li>Journaling</li>
        </ul>
        
        <h4>3. Slaaphygiëne</h4>
        <ul>
          <li>Ga elke dag op hetzelfde tijdstip naar bed</li>
          <li>Creëer een rustige slaapomgeving</li>
          <li>Vermijd schermen 1 uur voor het slapen</li>
          <li>Probeer ontspanningstechnieken voor het slapen</li>
        </ul>
        
        <h4>4. Voeding voor Stressvermindering</h4>
        <p>Bepaalde voedingsmiddelen kunnen helpen stress te verminderen:</p>
        <ul>
          <li><strong>Omega-3 vetzuren:</strong> Vette vis, walnoten, lijnzaad</li>
          <li><strong>Magnesium:</strong> Donkere bladgroenten, noten, zaden</li>
          <li><strong>Probiotica:</strong> Yoghurt, kefir, zuurkool</li>
          <li><strong>Antioxidanten:</strong> Bessen, donkere chocolade, groene thee</li>
        </ul>
        
        <h3>Wanneer Professionele Hulp Zoeken?</h3>
        <p>Overweeg professionele hulp als:</p>
        <ul>
          <li>Stress je dagelijks leven beïnvloedt</li>
          <li>Je emotioneel eten niet onder controle kunt krijgen</li>
          <li>Je slaapproblemen hebt</li>
          <li>Je je overweldigd voelt</li>
        </ul>
        
        <p>Onthoud: stress is een normale reactie, maar chronische stress hoeft niet je gewicht en gezondheid te bepalen. Met de juiste strategieën kun je leren omgaan met stress en tegelijkertijd je gewichtsdoelen bereiken.</p>
      `,
      category: "Lifestyle",
      readTime: "6 min",
      publishedAt: "2024-01-01",
      author: "Maria van der Berg",
      image: "/api/placeholder/600/400",
      icon: Brain
    },
    {
      id: 4,
      slug: "seizoensgebonden-voeding",
      title: "Seizoensgebonden Voeding",
      excerpt: "Ontdek de voordelen van eten volgens de seizoenen en hoe je dit praktisch kunt toepassen.",
      content: `
        <p>Eten volgens de seizoenen is een van de meest natuurlijke manieren om je lichaam te voeden. Het biedt niet alleen voordelen voor je gezondheid, maar ook voor je portemonnee en het milieu.</p>
        
        <h3>Waarom Seizoensgebonden Eten?</h3>
        
        <h4>Gezondheidsvoordelen</h4>
        <ul>
          <li><strong>Optimale voedingswaarde:</strong> Seizoensproducten zijn op hun hoogtepunt qua vitamines en mineralen</li>
          <li><strong>Natuurlijke variatie:</strong> Je lichaam krijgt verschillende voedingsstoffen door het jaar heen</li>
          <li><strong>Betere smaak:</strong> Seizoensproducten smaken beter omdat ze rijp zijn geoogst</li>
          <li><strong>Minder pesticiden:</strong> Seizoensproducten hebben vaak minder chemische behandeling nodig</li>
        </ul>
        
        <h4>Economische Voordelen</h4>
        <ul>
          <li>Seizoensproducten zijn meestal goedkoper</li>
          <li>Minder transportkosten</li>
          <li>Ondersteunt lokale boeren</li>
        </ul>
        
        <h4>Milieu Voordelen</h4>
        <ul>
          <li>Minder CO2-uitstoot door transport</li>
          <li>Geen energie voor kassen buiten het seizoen</li>
          <li>Biodiversiteit wordt ondersteund</li>
        </ul>
        
        <h3>Seizoenskalender Nederland</h3>
        
        <h4>Lente (Maart - Mei)</h4>
        <p><strong>Groenten:</strong> Asperges, radijs, rucola, spinazie, prei, ui, wortels</p>
        <p><strong>Fruit:</strong> Rabarber, eerste aardbeien (mei)</p>
        <p><strong>Focus:</strong> Detox na de winter, lichte en frisse maaltijden</p>
        
        <h4>Zomer (Juni - Augustus)</h4>
        <p><strong>Groenten:</strong> Tomaten, komkommer, courgette, aubergine, paprika, sla, bonen</p>
        <p><strong>Fruit:</strong> Aardbeien, frambozen, bramen, kersen, perziken, pruimen</p>
        <p><strong>Focus:</strong> Hydratatie, rauwe voeding, lichte maaltijden</p>
        
        <h4>Herfst (September - November)</h4>
        <p><strong>Groenten:</strong> Pompoen, winterwortel, pastinaak, spruitjes, kool, biet</p>
        <p><strong>Fruit:</strong> Appels, peren, druiven, noten</p>
        <p><strong>Focus:</strong> Voorbereiding op winter, warmende voeding</p>
        
        <h4>Winter (December - Februari)</h4>
        <p><strong>Groenten:</strong> Kool, winterpeen, knolselderij, prei, witlof, spruitjes</p>
        <p><strong>Fruit:</strong> Appels, peren, citrusvruchten (geïmporteerd)</p>
        <p><strong>Focus:</strong> Warmende maaltijden, bewaren van energie</p>
        
        <h3>Praktische Tips</h3>
        
        <h4>1. Bezoek Lokale Markten</h4>
        <ul>
          <li>Wekelijkse boerenmarkten</li>
          <li>Directe verkoop bij boerderijen</li>
          <li>Abonnementen op groentepakketten</li>
        </ul>
        
        <h4>2. Bewaren en Conserveren</h4>
        <ul>
          <li><strong>Invriezen:</strong> Bessen, doperwten, bonen</li>
          <li><strong>Inmaken:</strong> Jam, chutney, ingelegde groenten</li>
          <li><strong>Drogen:</strong> Kruiden, tomaten, fruit</li>
          <li><strong>Fermenteren:</strong> Zuurkool, kimchi</li>
        </ul>
        
        <h4>3. Maaltijdplanning</h4>
        <ul>
          <li>Plan maaltijden rond seizoensproducten</li>
          <li>Experimenteer met nieuwe recepten</li>
          <li>Maak grote porties en vries in</li>
          <li>Gebruik seizoensproducten als basis voor je menu</li>
        </ul>
        
        <h3>Seizoensrecepten Ideeën</h3>
        
        <h4>Lente</h4>
        <ul>
          <li>Aspergesoep met verse kruiden</li>
          <li>Spinazie salade met radijs</li>
          <li>Rucola pesto</li>
        </ul>
        
        <h4>Zomer</h4>
        <ul>
          <li>Gazpacho (koude tomatensoep)</li>
          <li>Gegrilde groenten</li>
          <li>Verse fruit salades</li>
        </ul>
        
        <h4>Herfst</h4>
        <ul>
          <li>Pompoensoep</li>
          <li>Geroosterde wortelgroenten</li>
          <li>Appel-kaneel havermout</li>
        </ul>
        
        <h4>Winter</h4>
        <ul>
          <li>Hartige stamppotten</li>
          <li>Warme groentestoofpotten</li>
          <li>Citrus smoothies voor vitamine C</li>
        </ul>
        
        <h3>Uitdagingen en Oplossingen</h3>
        
        <h4>Uitdaging: Beperkte Variatie in Winter</h4>
        <p><strong>Oplossing:</strong> Gebruik bevroren groenten en fruit, experimenteer met verschillende bereidingswijzen van dezelfde groenten</p>
        
        <h4>Uitdaging: Hogere Kosten voor Biologisch</h4>
        <p><strong>Oplossing:</strong> Focus op de 'Dirty Dozen' (groenten/fruit met meeste pesticiden) voor biologisch, de rest conventioneel</p>
        
        <h4>Uitdaging: Tijd voor Voorbereiding</h4>
        <p><strong>Oplossing:</strong> Batch cooking, meal prep, simpele recepten</p>
        
        <p>Seizoensgebonden eten is een reis van ontdekking. Begin klein door elke week één nieuw seizoensproduct uit te proberen, en bouw langzaam je repertoire op. Je lichaam, portemonnee en de planeet zullen je dankbaar zijn!</p>
      `,
      category: "Voeding",
      readTime: "7 min",
      publishedAt: "2023-12-20",
      author: "Maria van der Berg",
      image: "/api/placeholder/600/400",
      icon: Leaf
    },
    {
      id: 5,
      slug: "beweging-en-voeding-combineren",
      title: "Beweging en Voeding Combineren",
      excerpt: "Leer hoe je beweging en voeding optimaal kunt combineren voor maximale gezondheidsvoordelen.",
      content: `
        <p>Beweging en voeding zijn als twee handen op één buik - ze werken het beste samen. Het combineren van de juiste voeding met beweging kan je resultaten versnellen en je algehele gezondheid verbeteren.</p>
        
        <h3>Waarom Beweging en Voeding Samenhangen</h3>
        
        <h4>Energie Systemen</h4>
        <p>Je lichaam heeft verschillende energiesystemen:</p>
        <ul>
          <li><strong>Koolhydraten:</strong> Snelle energie voor intensieve activiteiten</li>
          <li><strong>Vetten:</strong> Langzame energie voor duuractiviteiten</li>
          <li><strong>Eiwitten:</strong> Herstel en opbouw van spieren</li>
        </ul>
        
        <h4>Timing is Belangrijk</h4>
        <p>Wanneer je eet in relatie tot je training beïnvloedt:</p>
        <ul>
          <li>Je energieniveau tijdens training</li>
          <li>Je herstel na training</li>
          <li>Je vetverbranding</li>
          <li>Je spiermassa</li>
        </ul>
        
        <h3>Voeding Rond Training</h3>
        
        <h4>Voor de Training (1-3 uur)</h4>
        <p><strong>Doel:</strong> Energie leveren zonder maagklachten</p>
        <ul>
          <li><strong>Koolhydraten:</strong> Havermout, banaan, volkorentoast</li>
          <li><strong>Beetje eiwit:</strong> Yoghurt, noten</li>
          <li><strong>Weinig vet en vezel:</strong> Voorkom maagklachten</li>
          <li><strong>Hydratatie:</strong> 500ml water 2-3 uur voor training</li>
        </ul>
        
        <h4>Tijdens de Training</h4>
        <p><strong>Voor trainingen langer dan 60 minuten:</strong></p>
        <ul>
          <li>Sportdrank met koolhydraten</li>
          <li>Banaan of dadels</li>
          <li>Regelmatig kleine slokjes water</li>
        </ul>
        
        <h4>Na de Training (binnen 30-60 minuten)</h4>
        <p><strong>Doel:</strong> Herstel en spieropbouw</p>
        <ul>
          <li><strong>Eiwit:</strong> 20-30g voor spierherste (kip, vis, eieren, proteineshake)</li>
          <li><strong>Koolhydraten:</strong> Glycogeenvoorraden aanvullen (rijst, pasta, fruit)</li>
          <li><strong>Ratio:</strong> 3:1 of 4:1 koolhydraten:eiwit</li>
          <li><strong>Hydratatie:</strong> 150% van gewichtsverlies tijdens training</li>
        </ul>
        
        <h3>Beweging voor Verschillende Doelen</h3>
        
        <h4>Gewichtsverlies</h4>
        <p><strong>Beweging:</strong></p>
        <ul>
          <li>Combinatie van cardio en krachttraining</li>
          <li>HIIT (High Intensity Interval Training)</li>
          <li>Dagelijkse wandelingen</li>
          <li>3-5x per week, 30-60 minuten</li>
        </ul>
        
        <p><strong>Voeding:</strong></p>
        <ul>
          <li>Caloriedeficit van 300-500 calorieën per dag</li>
          <li>Hoog eiwitgehalte (1.6-2.2g per kg lichaamsgewicht)</li>
          <li>Veel groenten en vezels</li>
          <li>Regelmatige maaltijden</li>
        </ul>
        
        <h4>Spieropbouw</h4>
        <p><strong>Beweging:</strong></p>
        <ul>
          <li>Krachttraining 3-4x per week</li>
          <li>Progressieve overbelasting</li>
          <li>Samengestelde oefeningen</li>
          <li>Voldoende rust tussen sessies</li>
        </ul>
        
        <p><strong>Voeding:</strong></p>
        <ul>
          <li>Calorieoverschot van 200-500 calorieën</li>
          <li>Hoog eiwitgehalte (2.2-2.5g per kg)</li>
          <li>Koolhydraten rond training</li>
          <li>Gezonde vetten voor hormoonproductie</li>
        </ul>
        
        <h4>Uithoudingsvermogen</h4>
        <p><strong>Beweging:</strong></p>
        <ul>
          <li>Geleidelijke opbouw van duur en intensiteit</li>
          <li>Lange, gematigde trainingen</li>
          <li>Intervaltraining</li>
          <li>Cross-training</li>
        </ul>
        
        <p><strong>Voeding:</strong></p>
        <ul>
          <li>Hoog koolhydraatgehalte (6-10g per kg)</li>
          <li>Matig eiwitgehalte (1.2-1.6g per kg)</li>
          <li>Goede hydratatie</li>
          <li>Elektrolyten bij lange trainingen</li>
        </ul>
        
        <h3>Praktische Combinatie Tips</h3>
        
        <h4>1. Plan je Week</h4>
        <ul>
          <li>Maak een trainingsschema</li>
          <li>Plan maaltijden rond trainingen</li>
          <li>Bereid post-workout snacks voor</li>
          <li>Zorg voor voldoende rust</li>
        </ul>
        
        <h4>2. Luister naar je Lichaam</h4>
        <ul>
          <li>Pas voeding aan op basis van hoe je je voelt</li>
          <li>Meer koolhydraten op trainingsdag</li>
          <li>Extra eiwit na zware krachttraining</li>
          <li>Meer water bij warm weer</li>
        </ul>
        
        <h4>3. Houd het Simpel</h4>
        <ul>
          <li>Basis voeding: echte, onbewerkte voedingsmiddelen</li>
          <li>Timing: eet iets voor en na training</li>
          <li>Hydratatie: drink regelmatig water</li>
          <li>Rust: zorg voor voldoende slaap</li>
        </ul>
        
        <h3>Veel Voorkomende Fouten</h3>
        
        <h4>1. Te Weinig Eten</h4>
        <p>Ondervoeding leidt tot:</p>
        <ul>
          <li>Verlies van spiermassa</li>
          <li>Vermoeidheid</li>
          <li>Slechte prestaties</li>
          <li>Verhoogd blessurerisico</li>
        </ul>
        
        <h4>2. Verkeerde Timing</h4>
        <p>Eten vlak voor training kan leiden tot:</p>
        <ul>
          <li>Maagklachten</li>
          <li>Verminderde prestaties</li>
          <li>Misselijkheid</li>
        </ul>
        
        <h4>3. Te Veel Focus op Supplementen</h4>
        <p>Supplementen zijn aanvulling, niet vervanging van goede voeding</p>
        
        <h3>Voorbeelddag</h3>
        
        <h4>Ochtendtraining (7:00)</h4>
        <ul>
          <li><strong>6:00:</strong> Banaan + koffie</li>
          <li><strong>7:00-8:00:</strong> Training</li>
          <li><strong>8:15:</strong> Proteineshake + havermout</li>
          <li><strong>10:00:</strong> Volledige ontbijt</li>
        </ul>
        
        <h4>Avondtraining (18:00)</h4>
        <ul>
          <li><strong>15:00:</strong> Snack met koolhydraten</li>
          <li><strong>18:00-19:00:</strong> Training</li>
          <li><strong>19:15:</strong> Post-workout snack</li>
          <li><strong>20:00:</strong> Volledige maaltijd</li>
        </ul>
        
        <p>Onthoud: de perfecte combinatie is persoonlijk. Experimenteer met verschillende aanpakken en vind wat het beste werkt voor jouw lichaam, schema en doelen. Consistentie is belangrijker dan perfectie!</p>
      `,
      category: "Beweging",
      readTime: "8 min",
      publishedAt: "2023-12-10",
      author: "Maria van der Berg",
      image: "/api/placeholder/600/400",
      icon: Activity
    }
  ];

  const categories = ["Alle", "Voeding", "Gewichtsmanagement", "Lifestyle", "Beweging"];
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const filteredPosts = selectedCategory === "Alle" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50] to-[#2196F3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
              Kennis & Inspiratie
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Gezondheid <span className="text-[#FF9800]">Blog</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Ontdek praktische tips, wetenschappelijke inzichten en inspirerende verhalen 
              voor een gezonder leven. Geschreven door voedingsdeskundige Maria van der Berg.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[#4CAF50] hover:bg-[#45a049] text-white"
                    : "border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const IconComponent = post.icon;
              return (
                <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-[#4CAF50] text-white">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-[#333333] line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishedAt).toLocaleDateString('nl-NL', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                    
                    <Button asChild className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                      <Link to={`/blog/${post.slug}`}>
                        Lees Meer
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[#4CAF50] to-[#2196F3] rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Blijf op de Hoogte
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Ontvang wekelijks nieuwe blog posts, tips en recepten direct in je inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Je e-mailadres"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
              />
              <Button className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-6 py-3">
                Aanmelden
              </Button>
            </div>
            
            <p className="text-sm text-white/70 mt-4">
              Geen spam, alleen waardevolle content. Uitschrijven kan altijd.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Heart className="w-16 h-16 mx-auto mb-4 text-[#4CAF50]" />
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Persoonlijke Begeleiding Nodig?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Lezen is leuk, maar persoonlijke begeleiding brengt je sneller naar je doel. 
              Boek een gratis intake gesprek en ontdek hoe ik jou kan helpen.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-[#4CAF50] hover:bg-[#45a049] text-white text-lg px-8 py-6"
            >
              <Link to="/contact">
                Gratis Intake Gesprek
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white text-lg px-8 py-6"
            >
              <Link to="/diensten">Bekijk Diensten</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;