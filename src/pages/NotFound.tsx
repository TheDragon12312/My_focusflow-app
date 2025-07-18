import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Home, ArrowLeft, Heart } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-[#333333] mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">
              Pagina Niet Gevonden
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sorry, de pagina die je zoekt bestaat niet of is verplaatst. 
              Laten we je terugbrengen naar een plek waar je wel kunt vinden wat je zoekt.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              asChild 
              className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
            >
              <Link to="/">
                <Home className="mr-2 w-4 h-4" />
                Terug naar Home
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="w-full border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
            >
              <Link to="/blog">
                Lees Onze Blog
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Of neem <Link to="/contact" className="text-[#4CAF50] hover:underline">contact met ons op</Link> als je hulp nodig hebt.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
