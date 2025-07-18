import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VL</span>
                </div>
                <span className="text-xl font-bold text-[#333333]">VitalLife Coaching</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-[#4CAF50] ${
                  isActive("/") ? "text-[#4CAF50]" : "text-[#333333]"
                }`}
              >
                Home
              </Link>
              <Link
                to="/over-mij"
                className={`text-sm font-medium transition-colors hover:text-[#4CAF50] ${
                  isActive("/over-mij") ? "text-[#4CAF50]" : "text-[#333333]"
                }`}
              >
                Over Mij
              </Link>
              <Link
                to="/diensten"
                className={`text-sm font-medium transition-colors hover:text-[#4CAF50] ${
                  isActive("/diensten") ? "text-[#4CAF50]" : "text-[#333333]"
                }`}
              >
                Diensten
              </Link>
              <Link
                to="/blog"
                className={`text-sm font-medium transition-colors hover:text-[#4CAF50] ${
                  isActive("/blog") ? "text-[#4CAF50]" : "text-[#333333]"
                }`}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors hover:text-[#4CAF50] ${
                  isActive("/contact") ? "text-[#4CAF50]" : "text-[#333333]"
                }`}
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button asChild className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                <Link to="/contact">Gratis Intake</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#333333] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VL</span>
                </div>
                <span className="text-xl font-bold">VitalLife Coaching</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Jouw partner voor duurzame lifestyle verandering. Samen werken we aan een gezondere, 
                gelukkigere versie van jezelf door persoonlijke voedingsadvies en coaching.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Snelle Links</h3>
              <ul className="space-y-2">
                <li><Link to="/over-mij" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Over Mij</Link></li>
                <li><Link to="/diensten" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Diensten</Link></li>
                <li><Link to="/blog" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-gray-300">06 12 34 56 78</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-gray-300">info@vitallifecoaching.nl</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-gray-300">Amsterdam, Nederland</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 VitalLife Coaching. Alle rechten voorbehouden. | 
              <span className="ml-2">Privacy Policy | Cookie Beleid</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;