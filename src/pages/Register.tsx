import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/AppContext";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Traemos las funciones del contexto (que creamos antes)
  const { setUser, handleLogin, userId } = useApp();
  
  // Estado para saber si estamos en modo "Login" (true) o "Registro" (false)
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  // Función para cambiar entre Login y Registro
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- MODO LOGIN (INICIAR SESIÓN) ---
    if (isLoginMode) {
        if (!formData.email || !formData.password) {
            toast({ 
                title: "Datos incompletos", 
                description: "Por favor ingresa tu correo y contraseña.", 
                variant: "destructive" 
            });
            return;
        }
        
        // Simulamos que el login es exitoso usando el userId que ya tenemos
        if (userId) {
            handleLogin(userId);
            toast({ title: "¡Hola de nuevo!", description: "Has iniciado sesión correctamente." });
            // La redirección la maneja App.tsx automáticamente al cambiar el estado,
            // pero por seguridad forzamos la navegación.
            navigate("/dashboard");
        } else {
             toast({ title: "Error", description: "No se pudo iniciar sesión. Intenta registrarte.", variant: "destructive" });
        }
        return;
    }

    // --- MODO REGISTRO (CREAR CUENTA) ---
    if (!formData.termsAccepted) {
      toast({ title: "Términos Requeridos", description: "Por favor acepta los términos.", variant: "destructive" });
      return;
    }

    if (!formData.email || !formData.password || !formData.name) {
      toast({ title: "Información Incompleta", description: "Por favor completa todos los campos.", variant: "destructive" });
      return;
    }

    // Guardamos el nombre del usuario
    setUser({
      name: formData.name,
      email: formData.email,
    });

    // Activamos la sesión
    if (userId) {
        handleLogin(userId);
    }

    toast({
      title: "¡Bienvenido a FinMate!",
      description: "Tu cuenta ha sido creada exitosamente.",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          
          {/* Tarjeta del Formulario */}
          <Card className="p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-2">
                {isLoginMode ? "Iniciar Sesión" : "Crea tu Cuenta"}
            </h2>
            <p className="text-muted-foreground mb-6">
                {isLoginMode ? "Accede a tu jardín financiero" : "Comienza tu viaje financiero hoy"}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo Nombre: Solo aparece si NO estamos en modo Login */}
              {!isLoginMode && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Label htmlFor="name">Nombre</Label>
                    <Input 
                        id="name" 
                        type="text" 
                        placeholder="Tu nombre completo" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        required={!isLoginMode} // Solo es requerido en registro
                    />
                  </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="tu@correo.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    {isLoginMode && <a href="#" className="text-xs text-growth hover:underline">¿Olvidaste tu contraseña?</a>}
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    placeholder={isLoginMode ? "Tu contraseña" : "Crea una contraseña segura"} 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    required 
                />
              </div>
              
              {/* Checkbox Términos: Solo aparece si NO estamos en modo Login */}
              {!isLoginMode && (
                  <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Checkbox 
                        id="terms" 
                        checked={formData.termsAccepted} 
                        onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })} 
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                        Acepto los términos y condiciones
                    </label>
                  </div>
              )}
              
              <Button type="submit" className="w-full bg-growth hover:bg-growth/90 text-white" size="lg">
                {isLoginMode ? "Ingresar" : "Entrar a mi Jardín Financiero"}
              </Button>
            </form>
            
            {/* Enlace para cambiar de modo */}
            <div className="text-center text-sm text-muted-foreground mt-6">
                {isLoginMode ? "¿No tienes cuenta? " : "¿Ya tienes una cuenta? "}
                <button 
                    type="button" 
                    onClick={toggleMode}
                    className="text-growth hover:underline font-medium focus:outline-none"
                >
                    {isLoginMode ? "Crear cuenta" : "Iniciar sesión"}
                </button>
            </div>

          </Card>
          
          {/* Tarjeta Informativa (Lado Derecho) */}
          <Card className="p-8 bg-gradient-to-br from-trust-light to-card border-trust/20 animate-scale-in">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-trust/20">
                <Lock className="h-12 w-12 text-trust" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Tu Privacidad es Importante</h3>
              <p className="text-muted-foreground">
                No solicitamos datos bancarios ni información financiera sensible. 
                FinMate te ayuda a organizar y estrategizar sin comprometer tu seguridad.
              </p>
              <div className="pt-4 space-y-2 text-sm text-muted-foreground w-full text-left pl-4">
                <p className="flex items-center gap-2"><span className="text-growth">✓</span> Sin vinculación bancaria</p>
                <p className="flex items-center gap-2"><span className="text-growth">✓</span> Almacenamiento seguro</p>
                <p className="flex items-center gap-2"><span className="text-growth">✓</span> Gratis y fácil de usar</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;