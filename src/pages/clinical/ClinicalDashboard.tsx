import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, AlertTriangle, Clock, CheckCircle2, Phone } from 'lucide-react';
import { patients, kpis } from '@/data/mockData';

const ClinicalDashboard = () => {
  const navigate = useNavigate();
  const absenceAlerts = patients.filter(p => p.absencesThisMonth >= 2).sort((a, b) => b.absencesThisMonth - a.absencesThisMonth);
  const transplantQueue = patients.filter(p => p.transplantStatus === 'Em preparo' || p.transplantStatus === 'Inscrito').sort((a, b) => b.transplantProgress - a.transplantProgress);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pacientes em HD</p>
                <p className="text-3xl font-bold text-foreground">{kpis.totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faltas este mês</p>
                <p className="text-3xl font-bold text-foreground">{kpis.absencesThisMonth}</p>
              </div>
              <Badge className="bg-accent text-accent-foreground">{kpis.absencesThisMonth}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendências para Transplante</p>
                <p className="text-3xl font-bold text-foreground">{kpis.pendingTransplant}</p>
              </div>
              <Badge className="bg-warning text-warning-foreground">{kpis.pendingTransplant}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inscritos na Lista</p>
                <p className="text-3xl font-bold text-foreground">{kpis.onList}</p>
              </div>
              <Badge className="bg-success text-success-foreground">{kpis.onList}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas de Faltas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Alertas de Faltas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {absenceAlerts.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border bg-background">
                <div>
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.absencesThisMonth} faltas · Último contato: {p.lastContact}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate(`/clinica/pacientes/${p.id}`)}>
                  <Phone className="h-3 w-3 mr-1" /> Contatar
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Fila do Transplante */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Fila do Transplante
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transplantQueue.map(p => (
              <div key={p.id} className="p-3 rounded-lg border bg-background space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{p.name}</p>
                  <span className="text-xs text-muted-foreground">{p.pendingExams} exames pendentes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={p.transplantProgress} className="flex-1 h-2" />
                  <span className="text-xs font-medium text-foreground">{p.transplantProgress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicalDashboard;
