import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Calendar, ClipboardCheck, Heart } from 'lucide-react';
import { currentPatient } from '@/data/mockData';

const badges = [
  { id: 'nunca-faltei', name: 'Nunca Faltei', description: 'Compareça a todas as sessões por 30 dias consecutivos', icon: Calendar, target: 100, color: 'text-success' },
  { id: 'checklist-completo', name: 'Checklist Completo', description: 'Complete todos os exames e avaliações do checklist', icon: ClipboardCheck, target: 100, color: 'text-primary' },
  { id: 'campeao-saude', name: 'Campeão de Saúde', description: '3 meses com aderência perfeita e checklist em dia', icon: Heart, target: 100, color: 'text-accent' },
];

const PatientJornada = () => {
  const p = currentPatient;

  const getBadgeProgress = (badgeId: string) => {
    if (p.badges.includes(badges.find(b => b.id === badgeId)?.name || '')) return 100;
    switch (badgeId) {
      case 'nunca-faltei': return Math.min(p.attendanceRate, 99);
      case 'checklist-completo': return p.transplantProgress;
      case 'campeao-saude': return Math.min(Math.round(p.attendanceRate * 0.7 + p.transplantProgress * 0.3), 99);
      default: return 0;
    }
  };

  return (
    <div className="p-4 space-y-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-foreground">Minha Jornada</h1>

      {/* Points */}
      <Card className="bg-primary text-primary-foreground text-center">
        <CardContent className="pt-6 pb-6 space-y-1">
          <Trophy className="h-8 w-8 mx-auto" />
          <p className="text-3xl font-bold">{p.points}</p>
          <p className="text-sm opacity-80">pontos acumulados</p>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground text-center">Acumule pontos e troque por benefícios! 🎁</p>

      {/* Badges */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Conquistas</h2>
        {badges.map(badge => {
          const progress = getBadgeProgress(badge.id);
          const earned = progress >= 100;
          return (
            <Card key={badge.id} className={earned ? 'border-primary bg-primary/5' : ''}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${earned ? 'bg-primary/10' : 'bg-muted'}`}>
                    <badge.icon className={`h-6 w-6 ${earned ? badge.color : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{badge.name}</p>
                      {earned && <span className="text-xs">✅</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    {!earned && (
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={progress} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground">{progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PatientJornada;
