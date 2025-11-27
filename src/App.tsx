import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { useState, useEffect } from "react"; 


import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DebtDetails from "./pages/DebtDetails";
import Lessons from "./pages/Lessons";
import Progress from "./pages/Progress";
import Badges from "./pages/Badges";
import Challenges from "./pages/Challenges";
import Payments from "./pages/Payments";
import Income from "./pages/Income";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Streaks from "./pages/Streaks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // === ESTADO CORREGIDO PARA EVITAR ERROR DE TYPESCRIPT ===
  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // 1. Lógica para generar un ID de usuario único (simulación de sesión)
    let currentUserId = localStorage.getItem('guest_user_id');
    if (!currentUserId) {
      currentUserId = crypto.randomUUID();
      localStorage.setItem('guest_user_id', currentUserId);
      // Simulación: forzar a ir al registro la primera vez
      localStorage.setItem('is_logged_in', 'false'); 
    }
    
    // 2. Establecer el ID de usuario
    setUserId(currentUserId);
    setAuthReady(true);
  }, []);

  const handleLogin = (id: string) => {
    // Simular inicio de sesión guardando la bandera
    localStorage.setItem('is_logged_in', 'true');
    setUserId(id); 
  };
  
  const handleLogout = () => {
    // Simular cierre de sesión
    localStorage.setItem('is_logged_in', 'false');
    // Esto fuerza al usuario a ver la pantalla de registro
    window.location.reload(); 
  };


  if (!authReady) {
    // Muestra un loader mientras genera el ID
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-growth">Cargando aplicación...</p>
      </div>
    );
  }

  // Define si el usuario está 'autenticado' (usando la bandera de localStorage)
  const isAuthenticated = localStorage.getItem('is_logged_in') === 'true' && !!userId;

  return (
  <QueryClientProvider client={queryClient}>
    <AppProvider userId={userId} handleLogin={handleLogin} handleLogout={handleLogout}> 
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/debts" element={<DebtDetails />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/income" element={<Income />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/streaks" element={<Streaks />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);
};
export default App;
