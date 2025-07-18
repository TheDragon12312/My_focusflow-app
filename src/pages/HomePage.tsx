import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { 
  Heart, 
  Users, 
  Target, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Apple,
  Activity,
  Clock
} from "lucide-react";

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50] to-[#2196F3] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  Gecertificeerd Voedingsdeskundige
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Jouw Reis Naar Een 
                  <span className="text-[#FF9800]"> Gezonder Leven</span>
                </h1>
                <p className="text-xl text-white/90 max-w-lg">
                  Ontdek hoe je duurzaam kunt afvallen en een gezondere lifestyle kunt opbouwen 
                  met persoonlijke begeleiding en bewezen methoden.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
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
                  <Link to="/over-mij">Leer Mij Kennen</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#FF9800]" />
                  <span className="text-sm">Persoonlijke begeleiding</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#FF9800]" />
                  <span className="text-sm">Bewezen resultaten</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#FF9800]" />
                  <span className="text-sm">Duurzame verandering</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Maria van der Berg</h3>
                  <p className="text-white/80 mb-4">Gecertificeerd Voedingsdeskundige & Lifestyle Coach</p>
                  <p className="text-sm text-white/70">
                    "Samen bouwen we aan jouw gezondere toekomst. Stap voor stap, 
                    met respect voor jouw unieke situatie."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Waarom Professionele Begeleiding?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              De cijfers spreken voor zich. Professionele begeleiding maakt het verschil.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#4CAF50] mb-2">2,5M</h3>
              <p className="text-gray-600">Nederlanders proberen jaarlijks af te vallen</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#FF9800] mb-2">50%</h3>
              <p className="text-gray-600">Van Nederlandse volwassenen heeft overgewicht</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#2196F3] mb-2">85%</h3>
              <p className="text-gray-600">Succespercentage met professionele begeleiding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Mijn Diensten
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Persoonlijke begeleiding afgestemd op jouw unieke situatie en doelen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-[#333333]">Voedingsadvies</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6">
                  Persoonlijke voedingsplannen gebaseerd op jouw lifestyle, voorkeuren en doelen. 
                  Geen strikte diëten, maar duurzame veranderingen.
                </CardDescription>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Individuele voedingsanalyse</li>
                  <li>• Persoonlijk voedingsplan</li>
                  <li>• Wekelijkse begeleiding</li>
                  <li>• Recepten en maaltijdideeën</li>
                </ul>
                <Button asChild className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                  <Link to="/diensten">Meer Info</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-[#333333]">Afvalcoaching</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6">
                  Duurzame afvalcoaching zonder jojo-effect. Focus op gedragsverandering 
                  en het opbouwen van gezonde gewoonten.
                </CardDescription>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• 12-weken intensief programma</li>
                  <li>• Wekelijkse coaching sessies</li>
                  <li>• Voortgangsmonitoring</li>
                  <li>• Motivatie en ondersteuning</li>
                </ul>
                <Button asChild className="w-full bg-[#FF9800] hover:bg-[#F57C00]">
                  <Link to="/diensten">Meer Info</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-[#333333]">Lifestyle Coaching</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6">
                  Holistische begeleiding voor een gezondere lifestyle. Van stressmanagement 
                  tot beweging en slaap - alles komt aan bod.
                </CardDescription>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Stressmanagement technieken</li>
                  <li>• Bewegingsadvies</li>
                  <li>• Slaapoptimalisatie</li>
                  <li>• Work-life balance</li>
                </ul>
                <Button asChild className="w-full bg-[#2196F3] hover:bg-[#1976D2]">
                  <Link to="/diensten">Meer Info</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Wat Klanten Zeggen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Echte verhalen van mensen die hun leven hebben veranderd.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FF9800] fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Maria heeft mijn leven veranderd. Niet alleen ben ik 15 kilo afgevallen, 
                  maar ik voel me ook veel energieker en gelukkiger. Haar persoonlijke aanpak 
                  en begrip maakten het verschil."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">Sandra K.</p>
                    <p className="text-sm text-gray-500">Amsterdam</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FF9800] fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Eindelijk een coach die luistert en begrijpt. Maria's holistische aanpak 
                  heeft me geholpen om niet alleen af te vallen, maar ook om beter om te gaan 
                  met stress en meer balans te vinden."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#FF9800] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">Mark J.</p>
                    <p className="text-sm text-gray-500">Utrecht</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FF9800] fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Na jaren van jojo-diëten heb ik eindelijk geleerd hoe ik duurzaam gezond 
                  kan leven. Maria's begeleiding was precies wat ik nodig had. Ik kan het 
                  iedereen aanraden!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">Lisa M.</p>
                    <p className="text-sm text-gray-500">Rotterdam</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Clock className="w-16 h-16 mx-auto mb-4 text-[#FF9800]" />
            <h2 className="text-3xl font-bold mb-4">
              Klaar Om Te Starten?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Boek nu een gratis intake gesprek van 30 minuten en ontdek hoe ik jou kan helpen 
              bij het bereiken van jouw doelen.
            </p>
          </div>
          
          <div className="space-y-4">
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
            
            <p className="text-sm text-white/80">
              Geen verplichtingen • Persoonlijk advies • 30 minuten gratis
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;