import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { ChevronLeft, Bell, CheckCircle2, Calendar } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const Payments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { payments, markPaymentAsPaid } = useApp();

  const handleMarkAsPaid = (id: string) => {
    markPaymentAsPaid(id);
    toast({
      title: "Pago Marcado",
      description: "El pago ha sido marcado como completado",
    });
  };

  const upcomingPayments = payments.filter(p => !p.paid);
  const completedPayments = payments.filter(p => p.paid);

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

        <h1 className="text-3xl font-bold text-foreground mb-2">Próximos Pagos y Recordatorios</h1>
        <p className="text-muted-foreground mb-8">Gestiona tus pagos pendientes</p>

        {/* Upcoming Payments */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent" />
            Pagos Pendientes
          </h2>
          
          {upcomingPayments.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-growth mx-auto mb-4" />
              <p className="text-muted-foreground">¡No tienes pagos pendientes!</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <Card 
                  key={payment.id} 
                  className="p-6 border-2 border-accent/30 bg-gradient-to-r from-card to-accent/5 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 rounded-full bg-accent/20">
                        <Bell className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg">{payment.debtName}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Vence: {new Date(payment.dueDate).toLocaleDateString('es-ES')}</span>
                          </div>
                          <div className="h-4 w-px bg-border"></div>
                          <span className="font-bold text-foreground text-lg">
                            ${payment.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleMarkAsPaid(payment.id)}
                      className="bg-growth hover:bg-growth/90 text-white font-semibold px-6"
                    >
                      Marcar como Pagado
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Payments */}
        {completedPayments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-growth" />
              Pagos Completados
            </h2>
            
            <div className="space-y-3">
              {completedPayments.map((payment) => (
                <Card key={payment.id} className="p-4 bg-growth/5 border-growth/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-growth" />
                      <div>
                        <h4 className="font-medium text-foreground">{payment.debtName}</h4>
                        <span className="text-sm text-muted-foreground">
                          ${payment.amount.toFixed(2)} • {new Date(payment.dueDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-growth">Pagado ✓</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Payments;
