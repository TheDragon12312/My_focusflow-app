import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { 
  Heart, 
  Award, 
  BookOpen, 
  Users, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star,
  Calendar
} from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50] to-[#2196F3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                Jouw Persoonlijke Coach
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Hoi, ik ben 
                <span className="text-[#FF9800]"> Maria van der Berg</span>
              </h1>
              <p className="text-xl text-white/90">
                Gecertificeerd voedingsdeskundige en lifestyle coach met een passie voor 
                duurzame gezondheidsverandering. Samen maken we jouw dromen werkelijkheid.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="w-48 h-48 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-6">
                  <div className="w-40 h-40 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <Heart className="w-20 h-20 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">15+ Jaar Ervaring</h3>
                  <p className="text-white/80">
                    Meer dan 500 mensen geholpen bij hun gezondheidsreis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Mijn Verhaal
            </h2>
            <p className="text-lg text-gray-600">
              Waarom ik doe wat ik doe, en hoe ik jou kan helpen
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              Mijn reis naar een gezonder leven begon niet als professional, maar als iemand die 
              zelf worstelde met gewicht, energie en zelfvertrouwen. Na jaren van jojo-diëten en 
              gefrustreerde pogingen om af te vallen, realiseerde ik me dat er een betere manier 
              moest zijn.
            </p>
            
            <p>
              Deze persoonlijke ervaring inspireerde me om voedingswetenschap te studeren en me 
              te specialiseren in gedragsverandering. Ik ontdekte dat duurzame gewichtsafname 
              niet draait om restricties en willekracht, maar om het begrijpen van jouw unieke 
              situatie en het creëren van haalbare, persoonlijke oplossingen.
            </p>
            
            <p>
              Vandaag de dag help ik mensen niet alleen met afvallen, maar met het opbouwen van 
              een gezonde relatie met voeding, hun lichaam en hun leven. Ik geloof dat iedereen 
              het recht heeft om zich energiek, zelfverzekerd en gelukkig te voelen in hun eigen 
              huid.
            </p>
            
            <p>
              Mijn aanpak is holistisch en persoonlijk. Ik kijk niet alleen naar wat je eet, 
              maar ook naar hoe je leeft, wat je motiveert, en welke obstakels je tegenkomt. 
              Samen creëren we een plan dat past bij jouw leven, niet andersom.
            </p>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Kwalificaties & Certificeringen
            </h2>
            <p className="text-lg text-gray-600">
              Professionele expertise gecombineerd met persoonlijke ervaring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Master Voedingswetenschap</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  Wageningen University & Research
                  <br />
                  Specialisatie: Humane Voeding & Gezondheid
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Gecertificeerd Lifestyle Coach</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  Nederlandse Vereniging voor Lifestyle Medicine
                  <br />
                  Erkend door BIG register
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Gedragstherapeut</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  Cognitieve Gedragstherapie
                  <br />
                  Specialisatie: Eetgedrag & Gewichtsmanagement
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Mindful Eating Trainer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  Center for Mindful Eating
                  <br />
                  Gecertificeerd in mindfulness-based interventies
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Stress & Burnout Coach</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  Nederlandse Stress & Burnout Academie
                  <br />
                  Holistische benadering van stress management
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Continue Educatie</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  Regelmatige bijscholing in voedingswetenschap
                  <br />
                  Lid van Nederlandse Vereniging van Diëtisten
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Mijn Filosofie
            </h2>
            <p className="text-lg text-gray-600">
              Hoe ik kijk naar gezondheid en welzijn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#333333] mb-2">Geen Diëten, Wel Lifestyle</h3>
                  <p className="text-gray-600">
                    Ik geloof niet in restrictieve diëten of snelle oplossingen. Echte verandering 
                    komt van het opbouwen van duurzame gewoonten die passen bij jouw leven.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#333333] mb-2">Persoonlijke Benadering</h3>
                  <p className="text-gray-600">
                    Ieder mens is uniek. Wat voor de een werkt, hoeft niet voor jou te werken. 
                    Daarom creëer ik altijd een persoonlijk plan afgestemd op jouw situatie.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2196F3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#333333] mb-2">Holistische Aanpak</h3>
                  <p className="text-gray-600">
                    Gezondheid gaat verder dan alleen voeding. Ik kijk naar je hele leven: 
                    stress, slaap, beweging, en emotioneel welzijn.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#333333] mb-2">Empathie & Begrip</h3>
                  <p className="text-gray-600">
                    Ik begrijp de uitdagingen omdat ik ze zelf heb ervaren. Geen oordeel, 
                    alleen begrip en ondersteuning op jouw reis.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#333333] mb-2">Wetenschappelijk Onderbouwd</h3>
                  <p className="text-gray-600">
                    Alle adviezen zijn gebaseerd op de nieuwste wetenschappelijke inzichten 
                    en bewezen effectieve methoden.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2196F3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#333333] mb-2">Duurzame Resultaten</h3>
                  <p className="text-gray-600">
                    Het doel is niet alleen om af te vallen, maar om een gezonde relatie 
                    met voeding en je lichaam op te bouwen die een leven lang meegaat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Section */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Mijn Praktijk
            </h2>
            <p className="text-lg text-gray-600">
              Een warme, professionele omgeving waar je je op je gemak voelt
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#333333] mb-4">Praktijk Locatie</h3>
                <p className="text-gray-600 mb-4">
                  Mijn praktijk is gevestigd in het hart van Amsterdam, gemakkelijk bereikbaar 
                  met het openbaar vervoer en met parkeermogelijkheden in de buurt.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📍 Prinsengracht 123, 1015 Amsterdam</p>
                  <p>🚇 2 minuten lopen van metrostation Nieuwmarkt</p>
                  <p>🅿️ Betaald parkeren beschikbaar</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#333333] mb-4">Online Consultaties</h3>
                <p className="text-gray-600 mb-4">
                  Voor wie niet naar Amsterdam kan reizen, bied ik ook online consultaties 
                  aan via video-oproep. Dezelfde persoonlijke aandacht, vanuit je eigen huis.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>💻 Veilige video-oproep platform</p>
                  <p>📱 Beschikbaar op computer, tablet of telefoon</p>
                  <p>🌍 Ideaal voor wie verder weg woont</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-full h-64 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] rounded-lg flex items-center justify-center mb-6">
                <div className="text-center text-white">
                  <Heart className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Praktijk Foto</p>
                  <p className="text-sm opacity-80">Komt binnenkort beschikbaar</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">
                  Een Veilige & Comfortabele Ruimte
                </h3>
                <p className="text-gray-600 text-sm">
                  Mijn praktijk is ingericht om je op je gemak te voelen. Een plek waar 
                  je open kunt zijn over je uitdagingen en doelen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Laten We Kennismaken
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Benieuwd of we een goede match zijn? Boek een gratis intake gesprek van 
              30 minuten en laten we kijken hoe ik jou kan helpen.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-[#FF9800] hover:bg-[#F57C00] text-white text-lg px-8 py-6"
            >
              <Link to="/contact">
                Boek Gratis Intake Gesprek
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-[#4CAF50] text-lg px-8 py-6"
            >
              <Link to="/diensten">Bekijk Mijn Diensten</Link>
            </Button>
          </div>
          
          <p className="text-sm text-white/80 mt-6">
            Geen verplichtingen • Persoonlijk advies • Volledig vrijblijvend
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;