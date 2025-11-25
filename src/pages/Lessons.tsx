import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { TrendingUp, Calendar, MessageCircle, PiggyBank, CreditCard, FileText, ChevronLeft, Play } from "lucide-react";

type LessonCategory = "savings" | "payments" | "negotiation";

interface Lesson {
  id: number;
  title: string;
  description: string;
  category: LessonCategory;
  icon: any;
  content: string;
}

const Lessons = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory | "all">("all");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Estrategias Inteligentes de Ahorro",
      description: "Aprende a ahorrar de manera más efectiva con métodos comprobados",
      category: "savings",
      icon: TrendingUp,
      content: "Construir un fondo de emergencia es crucial para la estabilidad financiera. Comienza apartando el 10% de tus ingresos cada mes. Usa transferencias automáticas para hacer el ahorro sin esfuerzo. Rastrea tu progreso y celebra pequeños logros en el camino.",
    },
    {
      id: 2,
      title: "Fundamentos de Planificación de Pagos",
      description: "Domina tu calendario de pagos y nunca pierdas una fecha límite",
      category: "payments",
      icon: Calendar,
      content: "Crea un calendario de pagos para visualizar todas tus fechas de vencimiento. Configura pagos automáticos cuando sea posible. Siempre paga al menos el mínimo para evitar cargos por mora. Considera pagos quincenales para reducir intereses con el tiempo.",
    },
    {
      id: 3,
      title: "Tácticas de Negociación",
      description: "Reduce tus tasas de interés a través de comunicación efectiva",
      category: "negotiation",
      icon: MessageCircle,
      content: "Llama a tus acreedores y solicita tasas más bajas. Sé cortés pero persistente. Menciona tu historial de pagos y ofertas de la competencia. Considera opciones de transferencia de saldo para deudas con intereses altos.",
    },
    {
      id: 4,
      title: "Elementos Esenciales del Fondo de Emergencia",
      description: "Construye una red de seguridad para gastos inesperados",
      category: "savings",
      icon: PiggyBank,
      content: "Apunta a tener de 3 a 6 meses de gastos en tu fondo de emergencia. Mantenlo en una cuenta de ahorros de alto rendimiento. Úsalo solo para verdaderas emergencias. Repónlo lo antes posible después de retiros.",
    },
    {
      id: 5,
      title: "Mejora de Puntaje Crediticio",
      description: "Comprende e impulsa tu calificación crediticia",
      category: "payments",
      icon: CreditCard,
      content: "Paga todas las cuentas a tiempo. Mantén la utilización de crédito por debajo del 30%. No cierres cuentas de crédito antiguas. Monitorea tu reporte de crédito regularmente para detectar errores. Considera convertirte en usuario autorizado en una buena cuenta.",
    },
    {
      id: 6,
      title: "Guía de Consolidación de Deudas",
      description: "Simplifica múltiples deudas en un pago manejable",
      category: "negotiation",
      icon: FileText,
      content: "Evalúa préstamos de consolidación vs. transferencias de saldo. Calcula el ahorro total en intereses. Asegúrate de que la nueva tasa sea más baja que tu promedio actual. Evita acumular nueva deuda después de consolidar.",
    },
  ];

  const categories = [
    { id: "all" as const, label: "Todas" },
    { id: "savings" as const, label: "Ahorro" },
    { id: "payments" as const, label: "Pagos" },
    { id: "negotiation" as const, label: "Negociación" },
  ];

  const filteredLessons = selectedCategory === "all" 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

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

        <h1 className="text-3xl font-bold text-foreground mb-2">Micro-Lecciones</h1>
        <p className="text-muted-foreground mb-8">Lecciones breves para hacer crecer tu conocimiento financiero</p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-growth hover:bg-growth/90 text-white" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const Icon = lesson.icon;
            
            return (
              <Card 
                key={lesson.id} 
                className="p-6 hover:shadow-lg transition-all cursor-pointer group animate-fade-in"
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-growth/10 group-hover:bg-growth/20 transition-colors">
                    <Icon className="h-6 w-6 text-growth" />
                  </div>
                  <div className="p-2 rounded-full bg-muted group-hover:bg-growth/10 transition-colors">
                    <Play className="h-4 w-4 text-muted-foreground group-hover:text-growth" />
                  </div>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-growth transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-center text-growth hover:text-growth/80 hover:bg-growth/10"
                >
                  Ver Lección
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Lesson Modal */}
        <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
          <DialogContent className="max-w-2xl">
            {selectedLesson && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-growth/10">
                      <selectedLesson.icon className="h-6 w-6 text-growth" />
                    </div>
                    {selectedLesson.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{selectedLesson.description}</p>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-foreground leading-relaxed">{selectedLesson.content}</p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={() => setSelectedLesson(null)}
                      className="flex-1 bg-growth hover:bg-growth/90 text-white"
                    >
                      ¡Entendido!
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                      className="flex-1"
                    >
                      Volver al Panel
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
};

export default Lessons;
