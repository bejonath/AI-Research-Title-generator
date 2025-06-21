
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-amber-50 to-orange-50" style={{ background: 'linear-gradient(135deg, #fefcf3 0%, #fdf8f0 50%, #fcf5ed 100%)' }}>
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            
            <span className="text-2xl font-bold text-gray-800">TitleAI</span>
          </div>
          <Link to="/generator">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-amber-50 bg-white">
              Try Generator
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight mb-8">
              AI-Powered
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
                Research Title
              </span>
              Generator
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Turn your research abstracts into impactful paper titles with AI.
              <span className="block mt-2">
                Powered by fine-tuned Mistral technology for academic excellence.
              </span>
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/generator">
              <Button 
                size="lg" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-amber-100">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">AI-Powered Generation</h3>
              <p className="text-gray-600">
                Leverage advanced Mistral AI technology fine-tuned specifically for academic research titles.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-amber-100">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Precision Control</h3>
              <p className="text-gray-600">
                Fine-tune creativity with temperature controls to generate titles that match your style.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-amber-100">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Excellence</h3>
              <p className="text-gray-600">
                Generate publication-ready titles that enhance the impact of your research work.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 py-8 text-center text-gray-500">
        <p>&copy; 2025 TitleAI. Empowering researchers with AI-driven title generation.</p>
      </footer>
    </div>
  );
};

export default HomePage;
