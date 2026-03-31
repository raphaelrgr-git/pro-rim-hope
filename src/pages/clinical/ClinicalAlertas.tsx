import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { alerts } from '@/data/mockData';

const ClinicalAlertas = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Alertas</h1>

      <div className="space-y-3">
        {alerts.map(a => (
          <Card key={a.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-5 w-5 ${a.priority === 'Alta' ? 'text-accent' : 'text-warning'}`} />
                  <div>
                    <p className="font-medium text-sm">{a.patientName}</p>
                    <p className="text-xs text-muted-foreground">{a.type}: {a.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={a.priority === 'Alta' ? 'bg-accent text-accent-foreground' : 'bg-warning text-warning-foreground'}>
                    {a.priority}
                  </Badge>
                  <Button size="sm" onClick={() => navigate(`/clinica/pacientes/${a.patientId}`)}>
                    Agir <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClinicalAlertas;
