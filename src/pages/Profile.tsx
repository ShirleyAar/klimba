import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { ChevronLeft, User } from "lucide-react";
import { useApp } from "@/contexts/AppContext"; // Usamos el contexto para sacar los datos

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useApp(); // Sacamos el usuario guardado

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver al Panel
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Mi Perfil</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="h-24 w-24 rounded-full bg-growth flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                  id="name" 
                  // Aquí mostramos el nombre guardado, o "Usuario" si no hay nada
                  value={user?.name || "Usuario Invitado"} 
                  readOnly 
                  className="bg-muted/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email"
                  // Aquí mostramos el email guardado
                  value={user?.email || "No registrado"} 
                  readOnly 
                  className="bg-muted/50"
                />
              </div>

              <div className="pt-4">
                <Button className="w-full bg-growth hover:bg-growth/90 text-white">
                  Editar Perfil
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;