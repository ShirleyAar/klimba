import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, Sprout, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Left: Metric Card */}
            <Card className="p-6 bg-gradient-to-br from-trust-light to-card border-trust/20 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-trust/20">
                  <TrendingUp className="h-8 w-8 text-trust" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">35%</div>
                  <div className="text-sm text-muted-foreground">Reducción de Deuda</div>
                </div>
              </div>
            </Card>

            {/* Right: Plant Illustration */}
            <div className="flex justify-center md:justify-end animate-scale-in">
              <div className="p-8 rounded-2xl bg-growth-light/30">
                <Sprout className="h-32 w-32 text-growth" />
              </div>
            </div>
          </div>

          {/* Central Card */}
          <Card className="p-8 md:p-12 text-center max-w-2xl mx-auto animate-slide-up shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              FinMate — Tu Compañero Financiero
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Haz crecer tu jardín financiero con herramientas simples para gestionar deudas, seguir tu progreso y aprender estrategias inteligentes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-growth hover:bg-growth/90 text-white">
                  Crear Cuenta
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-growth text-growth hover:bg-growth/10">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </Card>

          {/* Testimonials Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Lo Que Dicen Nuestros Usuarios
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-growth text-growth" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "El servicio es excelente. Me ayudó a organizar mis deudas de manera simple."
                </p>
                <p className="text-sm font-medium text-muted-foreground">— María G.</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-growth text-growth" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "Me ayudó a organizar mis deudas. Muy fácil de usar y sin complicaciones."
                </p>
                <p className="text-sm font-medium text-muted-foreground">— Carlos R.</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-growth text-growth" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "Muy fácil de usar. La planta que crece me motiva a seguir pagando mis deudas."
                </p>
                <p className="text-sm font-medium text-muted-foreground">— Ana L.</p>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
