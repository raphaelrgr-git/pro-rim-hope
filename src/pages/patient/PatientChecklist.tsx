import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CheckCircle2, Circle, AlertTriangle, ChevronDown } from 'lucide-react';
import { currentPatient } from '@/data/mockData';

const PatientChecklist = () => {
  const p = currentPatient;
  const allItems = p.checklist.flatMap(s => s.items);
  const done = allItems.filter(i => i.status === 'Realizado').length;
  const total = allItems.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="p-4 space-y-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-foreground">Meu Checklist</h1>

      {/* Progress Ring (simplified) */}
      <Card className="text-center">
        <CardContent className="pt-6 space-y-2">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
              <circle cx="48" cy="48" r="40" stroke="hsl(var(--primary))" strokeWidth="8" fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-lg font-bold text-primary">{pct}%</span>
          </div>
          <p className="text-sm text-muted-foreground">{done} de {total} itens concluídos</p>
        </CardContent>
      </Card>

      {/* Sections */}
      {p.checklist.map(section => (
        <Collapsible key={section.title}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">{section.title}</CardTitle>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-2 pt-0">
                {section.items.map(item => (
                  <div key={item.id} className="flex items-start gap-3 p-2 rounded-lg bg-secondary">
                    {item.status === 'Realizado' ? (
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    ) : item.status === 'Vencido' ? (
                      <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${item.status === 'Realizado' ? 'line-through text-muted-foreground' : ''}`}>
                        {item.name}
                      </p>
                      {item.status === 'Realizado' && item.date && (
                        <p className="text-xs text-success">Concluído em {item.date}</p>
                      )}
                      {item.status !== 'Realizado' && item.description && (
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
};

export default PatientChecklist;
