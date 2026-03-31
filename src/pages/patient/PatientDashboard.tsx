import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Pill, FlaskConical, Star, HelpCircle, LogOut } from 'lucide-react';
import { currentPatient } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const p = currentPatient;
  const navigate = useNavigate();
  const pendingItems = p.checklist.flatMap(s => s.items).filter(i => i.status !== 'Realizado');
  const pendingCount = pendingItems.length;

  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="p-4 space-y-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Olá, {p.name.split(' ')[0]}! 👋</h1>
          <p className="text-xs text-muted-foreground capitalize">{dateStr}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-4 pb-4 space-y-1">
            <Calendar className="h-5 w-5" />
            <p className="text-xs opacity-80">Próxima Sessão HD</p>
            <p className="text-lg font-bold">{p.nextSession}</p>
            <p className="text-xs opacity-80">{p.nextSessionTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 space-y-1">
            <Pill className="h-5 w-5 text-primary" />
            <p className="text-xs text-muted-foreground">Medicamentos Ativos</p>
            <p className="text-2xl font-bold text-foreground">{p.activeMeds}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 space-y-1">
            <FlaskConical className="h-5 w-5 text-primary" />
            <p className="text-xs text-muted-foreground">Exames Realizados</p>
            <p className="text-2xl font-bold text-foreground">{p.examsCompleted}/{p.totalExams}</p>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/30">
          <CardContent className="pt-4 pb-4 space-y-1">
            <Star className="h-5 w-5 text-warning" />
            <p className="text-xs text-muted-foreground">Minha Pontuação</p>
            <p className="text-2xl font-bold text-foreground">{p.points} pts</p>
          </CardContent>
        </Card>
      </div>

      {/* Transplant Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Meu Progresso para o Transplante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Progress value={p.transplantProgress} className="flex-1 h-3" />
            <span className="text-lg font-bold text-primary">{p.transplantProgress}%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {pendingCount > 0
              ? `Você está a ${pendingCount} etapa${pendingCount > 1 ? 's' : ''} de completar sua elegibilidade! 💪`
              : 'Parabéns! Você completou todos os requisitos! 🎉'}
          </p>

          {/* Next 3 pending */}
          {pendingItems.slice(0, 3).map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary">
              <span className="text-sm">{item.name}</span>
              <Button size="sm" variant="ghost" className="text-xs text-primary">
                <HelpCircle className="h-3 w-3 mr-1" /> Como fazer?
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Próximos Agendamentos */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Próximos Agendamentos</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Hemodiálise</p>
              <p className="text-xs text-muted-foreground">{p.nextSession} às {p.nextSessionTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medicamentos */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Medicamentos Ativos</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Você possui <strong>{p.activeMeds}</strong> medicamentos ativos. Lembre-se de tomá-los nos horários corretos.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
