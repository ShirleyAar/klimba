import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Edit, TrendingDown, Shield, Zap, ChevronLeft, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/AppContext";

const DebtDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { debts, updateDebt, deleteDebt } = useApp();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [editingDebt, setEditingDebt] = useState<typeof debts[0] | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    rate: "",
    dueDate: "",
  });

  const strategies = [
    { id: "interest", name: "Reducir Intereses", icon: TrendingDown, description: "Enfócate primero en deudas con tasas altas" },
    { id: "late", name: "Evitar Pagos Tardíos", icon: Shield, description: "Prioriza fechas de vencimiento próximas" },
    { id: "simplify", name: "Simplificar Cuentas", icon: Zap, description: "Consolida múltiples deudas" },
  ];

  const handleSimulate = (strategyId: string) => {
    setSelectedStrategy(strategyId);
    toast({
      title: "Estrategia Simulada",
      description: `Mostrando resultados para ${strategies.find(s => s.id === strategyId)?.name}`,
    });
  };

  const handleApplyStrategy = () => {
    if (!selectedStrategy) {
      toast({
        title: "Ninguna Estrategia Seleccionada",
        description: "Por favor simula una estrategia primero",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Estrategia Aplicada",
      description: "Tu plan de deudas ha sido actualizado exitosamente",
    });
    navigate("/dashboard");
  };

  const handleEditDebt = (debt: typeof debts[0]) => {
    setEditingDebt(debt);
    setFormData({
      name: debt.name,
      amount: debt.amount.toString(),
      rate: debt.rate.toString(),
      dueDate: debt.dueDate,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveDebt = () => {
    if (editingDebt) {
      updateDebt(editingDebt.id, {
        name: formData.name,
        amount: parseFloat(formData.amount),
        rate: parseFloat(formData.rate),
        dueDate: formData.dueDate,
      });
      toast({
        title: "Deuda Actualizada",
        description: "Los cambios han sido guardados",
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteDebt = (id: string) => {
    deleteDebt(id);
    toast({
      title: "Deuda Eliminada",
      description: "La deuda y su recordatorio han sido eliminados",
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

        <h1 className="text-3xl font-bold text-foreground mb-8">Detalles de Deudas y Estrategias</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Debt List */}
          <div className="lg:col-span-2 space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Tus Deudas</h2>
            
            {debts.map((debt) => {
              const debtProgress = Math.round((debt.paid / debt.amount) * 100);
              
              return (
                <Card key={debt.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{debt.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                        <div>
                          <span className="text-muted-foreground">Monto Total</span>
                          <p className="font-medium text-foreground">${debt.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pagado</span>
                          <p className="font-medium text-growth">${debt.paid.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tasa</span>
                          <p className="font-medium text-foreground">{debt.rate}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Vencimiento</span>
                          <p className="font-medium text-foreground">{new Date(debt.dueDate).toLocaleDateString('es-ES')}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-semibold text-growth">{debtProgress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-growth transition-all" 
                            style={{ width: `${debtProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditDebt(debt)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteDebt(debt.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Right: Simulate Strategy */}
          <div className="space-y-4 animate-scale-in">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-foreground mb-4">Simular Estrategia</h3>
              
              <div className="space-y-3 mb-6">
                {strategies.map((strategy) => {
                  const Icon = strategy.icon;
                  const isSelected = selectedStrategy === strategy.id;
                  
                  return (
                    <button
                      key={strategy.id}
                      onClick={() => handleSimulate(strategy.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-growth bg-growth/10"
                          : "border-border hover:border-growth/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-growth/20" : "bg-muted"}`}>
                          <Icon className={`h-5 w-5 ${isSelected ? "text-growth" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{strategy.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedStrategy && (
                <div className="p-4 bg-muted/50 rounded-lg mb-4">
                  <h4 className="font-semibold text-foreground mb-3">Antes vs Después</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pago Mensual Actual</span>
                      <span className="font-medium">$850</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Con Estrategia</span>
                      <span className="font-medium text-growth">$720</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ahorro</span>
                      <span className="font-semibold text-growth">$130/mes</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Button 
                  onClick={handleApplyStrategy} 
                  className="w-full bg-growth hover:bg-growth/90 text-white"
                  disabled={!selectedStrategy}
                >
                  Aplicar Estrategia
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/dashboard")}
                  className="w-full"
                >
                  Volver al Panel
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Edit Debt Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Deuda</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre de la Deuda</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Monto Total</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Tasa de Interés (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha Límite</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSaveDebt}
                  className="flex-1 bg-growth hover:bg-growth/90 text-white"
                >
                  Guardar Cambios
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
};

export default DebtDetails;
