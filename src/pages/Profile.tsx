import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { ChevronLeft, User, LogOut } from "lucide-react"; // Importamos LogOut
import { useApp } from "@/contexts/AppContext";

const Profile = () => {
  const navigate = useNavigate();
  // Traemos la función handleLogout del contexto
  const { user, handleLogout } = useApp(); 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver al Panel
          </Button>

          {/* --- BOTÓN DE CERRAR SESIÓN --- */}
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Mi Perfil</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="h-24 w-24 rounded-full bg-growth flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-xl font-semibold">{user?.name || "Usuario Invitado"}</h2>
              <p className="text-muted-foreground">{user?.email || "correo@ejemplo.com"}</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                  id="name" 
                  value={user?.name || ""} 
                  readOnly 
                  className="bg-muted/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={user?.email || ""} 
                  readOnly 
                  className="bg-muted/50"
                />
              </div>

              <div className="pt-4 border-t mt-6">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  ¿Quieres salir de tu cuenta?
                </p>
                <Button 
                  variant="outline" 
                  className="w-full text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
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