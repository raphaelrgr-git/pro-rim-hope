import { Card, CardContent } from '@/components/ui/card';
import { Calendar, AlertTriangle, MessageCircle, Star, Pill } from 'lucide-react';
import { patientNotifications } from '@/data/mockData';

const iconMap: Record<string, typeof Calendar> = {
  calendar: Calendar,
  alert: AlertTriangle,
  message: MessageCircle,
  star: Star,
  pill: Pill,
};

const PatientNotificacoes = () => {
  return (
    <div className="p-4 space-y-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-foreground">Notificações</h1>

      <div className="space-y-2">
        {patientNotifications.map(n => {
          const Icon = iconMap[n.icon] || Calendar;
          const date = new Date(n.timestamp);
          const timeStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' às ' +
            date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          return (
            <Card key={n.id} className={!n.read ? 'border-primary/30 bg-primary/5' : ''}>
              <CardContent className="pt-4 pb-4">
                <div className="flex gap-3">
                  <div className={`p-2 rounded-full shrink-0 ${!n.read ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon className={`h-4 w-4 ${!n.read ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'}`}>{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{timeStr}</p>
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

export default PatientNotificacoes;
