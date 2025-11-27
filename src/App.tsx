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
  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  // Estado local para forzar la actualización visual inmediata
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 1. ID DEL USUARIO (PERSISTENTE):
    // Lo guardamos en localStorage para que NO pierda sus datos (lecciones, deudas)
    // aunque cierre la pestaña.
    let currentUserId = localStorage.getItem('guest_user_id');
    if (!currentUserId) {
      currentUserId = crypto.randomUUID();
      localStorage.setItem('guest_user_id', currentUserId);
    }
    setUserId(currentUserId);

    // 2. ESTADO DE LA SESIÓN (VOLÁTIL):
    // Usamos sessionStorage. Si cierra la pestaña, esto se borra y pedirá registro de nuevo.
    const sessionStatus = sessionStorage.getItem('is_logged_in') === 'true';
    setIsLoggedIn(sessionStatus);

    setAuthReady(true);
  }, []);

  const handleLogin = (id: string) => {
    // Guardamos en SESIÓN (se borra al cerrar pestaña)
    sessionStorage.setItem('is_logged_in', 'true');
    setIsLoggedIn(true);
    // No recargamos la página, dejamos que React haga la redirección suave
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('is_logged_in');
    setIsLoggedIn(false);
    window.location.reload(); 
  };

  if (!authReady) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-growth">Cargando...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider userId={userId} handleLogin={handleLogin} handleLogout={handleLogout}> 
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              {/* 1. REDIRECCIÓN AUTOMÁTICA */}
              {/* Si ya entró, va al Dashboard. Si no, al Registro */}
              <Route 
                  path="/" 
                  element={
                      isLoggedIn ? 
                      <Navigate to="/dashboard" replace /> : 
                      <Navigate to="/register" replace />
                  } 
              />

              {/* 2. PROTECCIÓN DE RUTA DE REGISTRO */}
              {/* Si ya está logueado, no le dejamos ver el registro, lo mandamos al dashboard */}
              <Route 
                  path="/register" 
                  element={
                      isLoggedIn ? 
                      <Navigate to="/dashboard" replace /> : 
                      <Register />
                  } 
              />
              
              <Route path="/home" element={<Home />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;