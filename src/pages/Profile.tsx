import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { ChevronLeft, User, Mail, Camera, LogOut, Calendar, Save, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser, handleLogout } = useApp(); // Traemos handleLogout del contexto
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Inicializamos el formulario con valores vacíos por defecto para evitar 'undefined'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  
  // Guardamos los datos originales para poder cancelar
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  // Cuando carga el usuario, actualizamos el formulario
  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);

  // Detectar cambios
  const hasChanges = 
    formData.name !== originalData.name || 
    formData.avatar !== originalData.avatar;

  // Validar nombre
  const isNameValid = formData.name.trim().length > 0;

  const handleStartEditing = () => {
    // Aseguramos que originalData tenga los datos actuales antes de editar
    if (user) {
        setOriginalData({
            name: user.name || "",
            email: user.email || "",
            avatar: user.avatar || "",
        });
    }
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isNameValid) {
      toast({
        title: "Error",
        description: "El nombre no puede estar vacío",
        variant: "destructive",
      });
      return;
    }
    
    // Guardar cambios en el contexto global
    setUser({
      name: formData.name.trim(),
      email: user?.email || "", // El email no se edita aquí por seguridad
      avatar: formData.avatar,
    });

    // Actualizar datos originales
    setOriginalData({
      name: formData.name.trim(),
      email: user?.email || "",
      avatar: formData.avatar,
    });

    toast({
      title: "Perfil Actualizado",
      description: "Tus cambios han sido guardados exitosamente",
    });
    
    setIsEditing(false);
  };

  // Función para el botón de Cerrar Sesión
  const onLogoutConfirm = () => {
    handleLogout(); // Borra sesión y recarga
    navigate("/"); // Redirige al Home
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión exitosamente",
    });
  };

  const formatDate = () => {
    // Simulamos una fecha de registro o usamos la actual si no existe
    const date = new Date();
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Volver al Panel
        </Button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
          
          {/* BOTÓN DE CERRAR SESIÓN (ARRIBA DERECHA) */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                <AlertDialogDescription>
                  Estás a punto de cerrar tu sesión. ¿Deseas continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onLogoutConfirm} className="bg-destructive hover:bg-destructive/90">
                  Cerrar Sesión
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
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
                {/* Botón de cámara solo visible al editar */}
                {isEditing && (
                  <button 
                    type="button"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-growth text-white hover:bg-growth/90 transition-colors shadow-md cursor-pointer z-10"
                    onClick={() => {
                      const url = prompt("Ingresa la URL de tu avatar:");
                      if (url) setFormData({ ...formData, avatar: url });
                    }}
                    title="Cambiar foto"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Nombre visible si no se edita */}
              {!isEditing && (
                 <h2 className="text-2xl font-semibold text-foreground mt-4 text-center">
                    {user?.name || "Usuario"}
                 </h2>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CAMPO NOMBRE */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing} // Se habilita si isEditing es true
                  required
                  // Estilo visual claro: fondo blanco si se edita
                  className={!isEditing ? "bg-muted/30 border-transparent text-muted-foreground" : "bg-white border-input shadow-sm"}
                />
                {!isNameValid && isEditing && (
                  <p className="text-xs text-destructive">El nombre no puede estar vacío</p>
                )}
              </div>

              {/* CAMPO EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    // El email no se edita (readOnly)
                    readOnly
                    className="flex-1 bg-muted/30 cursor-not-allowed text-muted-foreground"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  El correo está vinculado a tu cuenta y no puede modificarse
                </p>
              </div>

              {/* FECHA REGISTRO */}
              <div className="space-y-2">
                <Label>Fecha de Registro</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md border border-transparent">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate()}
                  </span>
                </div>
              </div>

              {/* BOTONES DE EDICIÓN */}
              <div className="flex gap-4 pt-4">
                {!isEditing ? (
                  <Button 
                    type="button"
                    onClick={handleStartEditing}
                    className="flex-1 bg-growth hover:bg-growth/90 text-white"
                  >
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button 
                      type="submit"
                      disabled={!hasChanges || !isNameValid}
                      className="flex-1 bg-growth hover:bg-growth/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleCancelEditing}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;