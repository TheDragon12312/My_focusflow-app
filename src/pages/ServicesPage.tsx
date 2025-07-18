import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { 
  Apple, 
  Target, 
  Activity, 
  Users, 
  Video, 
  Calendar, 
  CheckCircle, 
  Euro, 
  Clock, 
  ArrowRight,
  Heart,
  TrendingUp,
  Shield,
  Star
} from "lucide-react";

const ServicesPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50] to-[#2196F3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
              Professionele Begeleiding
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Mijn <span className="text-[#FF9800]">Diensten</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Persoonlijke begeleiding afgestemd op jouw unieke situatie en doelen. 
              Kies de dienst die het beste bij jou past.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-[#FF9800] hover:bg-[#F57C00] text-white text-lg px-8 py-6"
              >
                <Link to="/contact">
                  Gratis Intake Gesprek
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="voeding" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12">
              <TabsTrigger value="voeding" className="text-sm md:text-base">
                <Apple className="w-4 h-4 mr-2" />
                Voedingsadvies
              </TabsTrigger>
              <TabsTrigger value="afvallen" className="text-sm md:text-base">
                <Target className="w-4 h-4 mr-2" />
                Afvalcoaching
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="text-sm md:text-base">
                <Activity className="w-4 h-4 mr-2" />
                Lifestyle Coaching
              </TabsTrigger>
            </TabsList>

            {/* Voedingsadvies Tab */}
            <TabsContent value="voeding" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center">
                    <Apple className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#333333]">
                    Persoonlijk Voedingsadvies
                  </h2>
                  <p className="text-lg text-gray-600">
                    Ontdek hoe je met de juiste voeding meer energie krijgt, gezonder wordt 
                    en je beter voelt. Geen strikte diëten, maar duurzame veranderingen die 
                    passen bij jouw leven.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Uitgebreide Voedingsanalyse</h3>
                        <p className="text-gray-600 text-sm">
                          We analyseren je huidige eetpatroon en identificeren verbeterpunten
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Persoonlijk Voedingsplan</h3>
                        <p className="text-gray-600 text-sm">
                          Op maat gemaakt plan rekening houdend met jouw voorkeuren en lifestyle
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Recepten & Maaltijdideeën</h3>
                        <p className="text-gray-600 text-sm">
                          Praktische recepten en tips voor gezonde, smakelijke maaltijden
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Voedingssupplementen Advies</h3>
                        <p className="text-gray-600 text-sm">
                          Advies over welke supplementen wel of niet zinvol zijn voor jou
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#FAFAFA] p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#333333] mb-6">Wat je krijgt:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#4CAF50]" />
                      <span className="text-gray-600">Intake gesprek (90 minuten)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#4CAF50]" />
                      <span className="text-gray-600">3 vervolgconsulten (60 minuten)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Apple className="w-5 h-5 text-[#4CAF50]" />
                      <span className="text-gray-600">Persoonlijk voedingsplan</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-[#4CAF50]" />
                      <span className="text-gray-600">Receptenboekje op maat</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Video className="w-5 h-5 text-[#4CAF50]" />
                      <span className="text-gray-600">WhatsApp ondersteuning</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-[#333333]">€297</span>
                      <Badge className="bg-[#4CAF50] text-white">Populair</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Eenmalig tarief voor complete begeleiding
                    </p>
                    <Button asChild className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                      <Link to="/contact">Boek Nu</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Afvalcoaching Tab */}
            <TabsContent value="afvallen" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#333333]">
                    Duurzame Afvalcoaching
                  </h2>
                  <p className="text-lg text-gray-600">
                    Bereik jouw ideale gewicht zonder jojo-effect. Ons 12-weken programma 
                    richt zich op gedragsverandering en het opbouwen van gezonde gewoonten 
                    die een leven lang meegaan.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Wekelijkse Coaching Sessies</h3>
                        <p className="text-gray-600 text-sm">
                          Persoonlijke begeleiding en motivatie elke week
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Voortgangsmonitoring</h3>
                        <p className="text-gray-600 text-sm">
                          Regelmatige metingen en bijstellingen van het plan
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Gedragsverandering</h3>
                        <p className="text-gray-600 text-sm">
                          Focus op het doorbreken van oude patronen en opbouwen van nieuwe
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">24/7 Ondersteuning</h3>
                        <p className="text-gray-600 text-sm">
                          WhatsApp ondersteuning voor vragen en motivatie
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#FAFAFA] p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#333333] mb-6">12-Weken Programma:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#FF9800]" />
                      <span className="text-gray-600">Intake & doelstelling (90 min)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#FF9800]" />
                      <span className="text-gray-600">12 wekelijkse sessies (60 min)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-[#FF9800]" />
                      <span className="text-gray-600">Voortgangsmetingen</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Apple className="w-5 h-5 text-[#FF9800]" />
                      <span className="text-gray-600">Persoonlijk voedingsplan</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-[#FF9800]" />
                      <span className="text-gray-600">Bewegingsadvies</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-[#FF9800]" />
                      <span className="text-gray-600">Nazorg programma (3 maanden)</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-[#333333]">€897</span>
                      <Badge className="bg-[#FF9800] text-white">Meest Effectief</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Of 3 termijnen van €299
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Inclusief 3 maanden nazorg
                    </p>
                    <Button asChild className="w-full bg-[#FF9800] hover:bg-[#F57C00]">
                      <Link to="/contact">Start Programma</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Lifestyle Coaching Tab */}
            <TabsContent value="lifestyle" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#333333]">
                    Holistische Lifestyle Coaching
                  </h2>
                  <p className="text-lg text-gray-600">
                    Verbeter je algehele welzijn door alle aspecten van je leven in balans 
                    te brengen. Van stressmanagement tot beweging en slaap - we kijken naar 
                    het complete plaatje.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#2196F3] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Stressmanagement</h3>
                        <p className="text-gray-600 text-sm">
                          Technieken om stress te herkennen en gezond te beheren
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#2196F3] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Bewegingsadvies</h3>
                        <p className="text-gray-600 text-sm">
                          Persoonlijk bewegingsplan dat past bij jouw leven
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#2196F3] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Slaapoptimalisatie</h3>
                        <p className="text-gray-600 text-sm">
                          Verbeter je slaapkwaliteit voor meer energie en welzijn
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#2196F3] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#333333]">Work-Life Balance</h3>
                        <p className="text-gray-600 text-sm">
                          Vind de juiste balans tussen werk, familie en persoonlijke tijd
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#FAFAFA] p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#333333] mb-6">Lifestyle Pakket:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#2196F3]" />
                      <span className="text-gray-600">Uitgebreide lifestyle analyse</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#2196F3]" />
                      <span className="text-gray-600">6 coaching sessies (75 min)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-[#2196F3]" />
                      <span className="text-gray-600">Persoonlijk lifestyle plan</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-[#2196F3]" />
                      <span className="text-gray-600">Stress & mindfulness technieken</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-[#2196F3]" />
                      <span className="text-gray-600">Slaap optimalisatie plan</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Video className="w-5 h-5 text-[#2196F3]" />
                      <span className="text-gray-600">Online ondersteuning</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-[#333333]">€597</span>
                      <Badge className="bg-[#2196F3] text-white">Compleet</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      6 maanden begeleiding
                    </p>
                    <Button asChild className="w-full bg-[#2196F3] hover:bg-[#1976D2]">
                      <Link to="/contact">Begin Reis</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Aanvullende Diensten
            </h2>
            <p className="text-lg text-gray-600">
              Extra ondersteuning voor jouw gezondheidsreis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Groepssessies</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-4">
                  Leer samen met anderen in kleine groepen van maximaal 6 personen.
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>• 4 wekelijkse sessies</p>
                  <p>• Maximaal 6 deelnemers</p>
                  <p>• Interactieve workshops</p>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Euro className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-xl font-bold text-[#333333]">€149</span>
                </div>
                <Button asChild className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                  <Link to="/contact">Aanmelden</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Online Begeleiding</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-4">
                  Volledig online coaching via video-oproep, ideaal voor drukke agenda's.
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>• Flexibele tijden</p>
                  <p>• Vanuit je eigen huis</p>
                  <p>• Dezelfde kwaliteit</p>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Euro className="w-4 h-4 text-[#FF9800]" />
                  <span className="text-xl font-bold text-[#333333]">€89</span>
                  <span className="text-sm text-gray-500">per sessie</span>
                </div>
                <Button asChild className="w-full bg-[#FF9800] hover:bg-[#F57C00]">
                  <Link to="/contact">Boek Sessie</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-[#333333]">Eenmalig Consult</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-4">
                  Krijg direct advies voor een specifieke vraag of uitdaging.
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>• 60 minuten consult</p>
                  <p>• Specifiek advies</p>
                  <p>• Praktische tips</p>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Euro className="w-4 h-4 text-[#2196F3]" />
                  <span className="text-xl font-bold text-[#333333]">€109</span>
                </div>
                <Button asChild className="w-full bg-[#2196F3] hover:bg-[#1976D2]">
                  <Link to="/contact">Boek Consult</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-lg text-gray-600">
              Antwoorden op de meest gestelde vragen over mijn diensten
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-[#4CAF50] pl-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">
                Hoe weet ik welke dienst het beste bij mij past?
              </h3>
              <p className="text-gray-600">
                Tijdens het gratis intake gesprek bespreken we jouw doelen, situatie en voorkeuren. 
                Op basis daarvan adviseer ik welke dienst het beste aansluit bij jouw behoeften.
              </p>
            </div>
            
            <div className="border-l-4 border-[#FF9800] pl-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">
                Zijn de sessies ook online mogelijk?
              </h3>
              <p className="text-gray-600">
                Ja, alle diensten zijn zowel fysiek in mijn praktijk in Amsterdam als online 
                beschikbaar. Online sessies zijn net zo effectief als fysieke consultaties.
              </p>
            </div>
            
            <div className="border-l-4 border-[#2196F3] pl-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">
                Wat als ik niet tevreden ben met de begeleiding?
              </h3>
              <p className="text-gray-600">
                Jouw tevredenheid staat centraal. Als je binnen 2 weken niet tevreden bent, 
                krijg je je geld terug. Geen vragen, geen gedoe.
              </p>
            </div>
            
            <div className="border-l-4 border-[#4CAF50] pl-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">
                Worden de kosten vergoed door de zorgverzekering?
              </h3>
              <p className="text-gray-600">
                Veel zorgverzekeraars vergoeden voedingsadvies uit de aanvullende verzekering. 
                Ik ben BIG-geregistreerd, dus je kunt de kosten vaak declareren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Star className="w-16 h-16 mx-auto mb-4 text-[#FF9800]" />
            <h2 className="text-3xl font-bold mb-4">
              Begin Jouw Gezonde Reis Vandaag
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Boek een gratis intake gesprek en ontdek welke dienst het beste bij jou past. 
              Geen verplichtingen, alleen persoonlijk advies.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-[#FF9800] hover:bg-[#F57C00] text-white text-lg px-8 py-6"
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
              className="border-white text-white hover:bg-white hover:text-[#4CAF50] text-lg px-8 py-6"
            >
              <Link to="/over-mij">Leer Mij Kennen</Link>
            </Button>
          </div>
          
          <p className="text-sm text-white/80 mt-6">
            Gratis • 30 minuten • Persoonlijk advies • Geen verplichtingen
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;