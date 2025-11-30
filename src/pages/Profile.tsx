import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { ChevronLeft, User, Mail, Camera, LogOut } from "lucide-react"; // Importamos LogOut
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Traemos user, setUser y handleLogout del contexto
  const { user, setUser, handleLogout } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setUser({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
    });

    toast({
      title: "Perfil Actualizado",
      description: "Tus cambios han sido guardados exitosamente",
    });
    
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    // Llamamos a la función de logout del contexto
    handleLogout();
    // Forzamos navegación al home por si acaso (aunque App.tsx debería encargarse)
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="text-muted-foreground hover:text-foreground p-0"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver al Panel
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Mi Perfil</h1>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 animate-fade-in">
            {/* --- SECCIÓN DE AVATAR --- */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-growth-light to-growth flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                  {formData.avatar ? (
                    <img 
                      src={formData.avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                {isEditing && (
                  <button 
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-growth text-white hover:bg-growth/90 transition-colors shadow-md"
                    onClick={() => {
                      const url = prompt("Ingresa la URL de tu avatar (imagen):");
                      if (url) setFormData({ ...formData, avatar: url });
                    }}
                    title="Cambiar foto"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                {formData.name || "Usuario"}
              </h2>
              <p className="text-muted-foreground">{formData.email || "Sin correo"}</p>
            </div>

            {/* --- FORMULARIO DE DATOS --- */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  required
                  className={!isEditing ? "bg-muted/50 border-transparent" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    required
                    className={`flex-1 ${!isEditing ? "bg-muted/50 border-transparent" : ""}`}
                  />
                </div>
              </div>

              {/* BOTONES DE EDICIÓN */}
              <div className="flex gap-4 pt-2">
                {!isEditing ? (
                  <Button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-growth hover:bg-growth/90 text-white"
                  >
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button 
                      type="submit"
                      className="flex-1 bg-growth hover:bg-growth/90 text-white"
                    >
                      Guardar
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || "",
                          email: user?.email || "",
                          avatar: user?.avatar || "",
                        });
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </form>

            {/* --- BOTÓN DE CERRAR SESIÓN --- */}
            <div className="pt-8 border-t mt-8">
              <Button 
                variant="destructive" 
                className="w-full flex items-center justify-center gap-2 py-6 text-lg hover:bg-destructive/90 transition-colors shadow-sm"
                onClick={handleLogoutClick}
              >
                <LogOut className="h-5 w-5" />
                Cerrar Sesión
              </Button>
            </div>

          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;