import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Heart, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  Video,
  Users,
  Star
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    preferredContact: "",
    preferredTime: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#4CAF50]" />
            <h1 className="text-4xl font-bold text-[#333333] mb-4">Bedankt voor je Bericht!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Ik heb je bericht ontvangen en neem binnen 24 uur contact met je op om een 
              gratis intake gesprek in te plannen. Check ook je spam folder voor zekerheid.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#4CAF50] hover:bg-[#45a049]">
              <Link to="/">Terug naar Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white">
              <Link to="/blog">Lees Onze Blog</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50] to-[#2196F3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
              Laten We Kennismaken
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Neem <span className="text-[#FF9800]">Contact</span> Op
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Klaar om je gezondheidsreis te beginnen? Boek een gratis intake gesprek van 30 minuten 
              en ontdek hoe ik jou kan helpen bij het bereiken van je doelen.
            </p>
            <div className="flex items-center justify-center space-x-6 text-white/90">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-[#FF9800]" />
                <span>Gratis intake gesprek</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-[#FF9800]" />
                <span>Geen verplichtingen</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-[#FF9800]" />
                <span>Persoonlijk advies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">
                  Boek je Gratis Intake Gesprek
                </h2>
                <p className="text-lg text-gray-600">
                  Vul het formulier in en ik neem binnen 24 uur contact met je op om een 
                  afspraak in te plannen die past bij jouw agenda.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Naam *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Je volledige naam"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mailadres *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="je@email.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefoonnummer
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06 12 34 56 78"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Waar ben je in geïnteresseerd? *
                  </label>
                  <Select onValueChange={(value) => handleSelectChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kies een dienst" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="voedingsadvies">Voedingsadvies</SelectItem>
                      <SelectItem value="afvalcoaching">Afvalcoaching</SelectItem>
                      <SelectItem value="lifestyle-coaching">Lifestyle Coaching</SelectItem>
                      <SelectItem value="online-begeleiding">Online Begeleiding</SelectItem>
                      <SelectItem value="groepssessies">Groepssessies</SelectItem>
                      <SelectItem value="weet-nog-niet">Weet ik nog niet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                      Voorkeur contact
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("preferredContact", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Hoe wil je contact?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="telefoon">Telefonisch</SelectItem>
                        <SelectItem value="email">Per e-mail</SelectItem>
                        <SelectItem value="video">Video-oproep</SelectItem>
                        <SelectItem value="geen-voorkeur">Geen voorkeur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Voorkeur tijdstip
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("preferredTime", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wanneer past het?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ochtend">Ochtend (9:00-12:00)</SelectItem>
                        <SelectItem value="middag">Middag (12:00-17:00)</SelectItem>
                        <SelectItem value="avond">Avond (17:00-20:00)</SelectItem>
                        <SelectItem value="flexibel">Flexibel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Vertel me over je situatie
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Wat zijn je doelen? Waar worstel je mee? Hoe kan ik je helpen?"
                    rows={4}
                    className="w-full"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white text-lg py-6"
                >
                  {isSubmitting ? (
                    "Bericht wordt verzonden..."
                  ) : (
                    <>
                      Verstuur Bericht
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Door dit formulier te verzenden ga je akkoord met onze privacy policy. 
                  Je gegevens worden vertrouwelijk behandeld.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#333333] mb-6">
                  Andere Manieren om Contact Op Te Nemen
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333] mb-1">Telefonisch</h4>
                      <p className="text-gray-600 mb-2">06 12 34 56 78</p>
                      <p className="text-sm text-gray-500">
                        Ma-Vr: 9:00-17:00 | Za: 9:00-13:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#FF9800] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333] mb-1">E-mail</h4>
                      <p className="text-gray-600 mb-2">info@vitallifecoaching.nl</p>
                      <p className="text-sm text-gray-500">
                        Reactie binnen 24 uur
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333] mb-1">Praktijk Adres</h4>
                      <p className="text-gray-600 mb-2">
                        Prinsengracht 123<br />
                        1015 Amsterdam
                      </p>
                      <p className="text-sm text-gray-500">
                        Op afspraak | Gratis parkeren
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#333333]">
                    <Clock className="w-5 h-5 mr-2 text-[#4CAF50]" />
                    Openingstijden
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maandag - Vrijdag</span>
                      <span className="font-medium">9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zaterdag</span>
                      <span className="font-medium">9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zondag</span>
                      <span className="font-medium text-gray-400">Gesloten</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Avond- en weekendafspraken mogelijk op verzoek
                  </p>
                </CardContent>
              </Card>

              {/* What to Expect */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#333333]">
                    <Heart className="w-5 h-5 mr-2 text-[#4CAF50]" />
                    Wat kun je verwachten?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        30 minuten persoonlijk gesprek over jouw doelen
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        Advies over welke aanpak het beste bij jou past
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        Praktische tips die je direct kunt toepassen
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        Geen druk of verplichtingen om verder te gaan
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Options */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Kies Jouw Voorkeur
            </h2>
            <p className="text-lg text-gray-600">
              Het intake gesprek kan op verschillende manieren plaatsvinden
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-[#333333]">In de Praktijk</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Kom langs in mijn praktijk in Amsterdam voor een persoonlijk gesprek 
                  in een rustige, professionele omgeving.
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📍 Prinsengracht 123, Amsterdam</p>
                  <p>🚇 2 minuten van metrostation</p>
                  <p>🅿️ Gratis parkeren beschikbaar</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-[#333333]">Online Video</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Videogesprek vanuit je eigen huis via een veilig platform. 
                  Ideaal als je ver weg woont of een drukke agenda hebt.
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>💻 Veilig video platform</p>
                  <p>📱 Werkt op alle apparaten</p>
                  <p>🏠 Vanuit je eigen huis</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-[#333333]">Telefonisch</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Een persoonlijk telefoongesprek op een moment dat jou uitkomt. 
                  Flexibel en zonder reistijd.
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 Bel op afgesproken tijd</p>
                  <p>⏰ Flexibele tijdstippen</p>
                  <p>🚗 Geen reistijd nodig</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Praktijk Locatie
            </h2>
            <p className="text-lg text-gray-600">
              Gemakkelijk bereikbaar in het hart van Amsterdam
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">
                Makkelijk Te Bereiken
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">🚇</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333]">Openbaar Vervoer</h4>
                    <p className="text-gray-600 text-sm">
                      2 minuten lopen van metrostation Nieuwmarkt. 
                      Tram 4, 14 stoppen vlakbij.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">🚗</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333]">Met de Auto</h4>
                    <p className="text-gray-600 text-sm">
                      Betaald parkeren in de straat. Garage Q-Park Nieuwmarkt 
                      op 3 minuten lopen.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#2196F3] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">🚲</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333]">Met de Fiets</h4>
                    <p className="text-gray-600 text-sm">
                      Fietsenstalling beschikbaar. Centraal gelegen in 
                      het centrum van Amsterdam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#4CAF50] to-[#2196F3] rounded-lg p-8 text-white text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Praktijk VitalLife</h3>
              <p className="text-lg mb-4">
                Prinsengracht 123<br />
                1015 Amsterdam
              </p>
              <p className="text-sm opacity-90 mb-6">
                Een rustige, professionele omgeving waar je je op je gemak voelt 
                om open te zijn over je doelen en uitdagingen.
              </p>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#4CAF50]"
              >
                Bekijk op Google Maps
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Wat Klanten Zeggen
            </h2>
            <p className="text-lg text-gray-600">
              Ervaringen van mensen die de stap hebben gezet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FF9800] fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Het intake gesprek was zo waardevol! Maria luisterde echt naar mijn verhaal 
                  en gaf me direct praktische tips. Ik voelde me begrepen en gemotiveerd om 
                  te starten met haar programma."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">Anna M.</p>
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
                  "Ik was nerveus voor het gesprek, maar Maria maakte me direct op mijn gemak. 
                  Ze stelde de juiste vragen en ik kreeg een helder beeld van wat mogelijk is. 
                  Geen druk, alleen begrip."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#FF9800] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">Peter K.</p>
                    <p className="text-sm text-gray-500">Haarlem</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-lg text-gray-600">
              Antwoorden op vragen over het intake gesprek
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-[#4CAF50] pl-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">
                Is het intake gesprek echt gratis?
              </h3>
              <p className="text-gray-600">
                Ja, het intake gesprek is 100% gratis en zonder verplichtingen. Het is een 
                kennismakingsgesprek waar we kijken of we een goede match zijn en hoe ik jou 
                het beste kan helpen.
              </p>
            </div>
            
            <div className="border-l-4 border-[#FF9800] pl-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">
                Hoe lang duurt het gesprek?
              </h3>
              <p className="text-gray-600">
                Het gesprek duurt ongeveer 30 minuten. Genoeg tijd om je verhaal te delen, 
                vragen te stellen en een eerste advies te krijgen, maar niet zo lang dat 
                het overweldigend wordt.
              </p>
            </div>
            
            <div className="border-l-4 border-[#2196F3] pl-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">
                Moet ik me voorbereiden op het gesprek?
              </h3>
              <p className="text-gray-600">
                Nee, je hoeft je niet voor te bereiden. Kom gewoon zoals je bent. Het is 
                wel handig om na te denken over je doelen en wat je wilt bereiken, maar 
                dat bespreken we samen tijdens het gesprek.
              </p>
            </div>
            
            <div className="border-l-4 border-[#4CAF50] pl-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">
                Wat gebeurt er na het gesprek?
              </h3>
              <p className="text-gray-600">
                Na het gesprek krijg je een samenvatting per e-mail met de besproken punten 
                en eventuele vervolgstappen. Er is geen druk om direct te beslissen - neem 
                de tijd die je nodig hebt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;