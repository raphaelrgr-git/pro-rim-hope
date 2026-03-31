import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, User } from 'lucide-react';
import { currentPatient } from '@/data/mockData';

const PatientApadrinhamento = () => {
  const p = currentPatient;

  return (
    <div className="p-4 space-y-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-foreground">Apadrinhamento</h1>

      {p.hasGodparent ? (
        <>
          <Card className="border-primary bg-primary/5">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{p.godparentName}</p>
                  <p className="text-sm text-muted-foreground">Seu padrinho/madrinha de transplante</p>
                </div>
              </div>
              <Button className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" /> Enviar Mensagem
              </Button>
            </CardContent>
          </Card>

          {/* Success Story */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Heart className="h-4 w-4 text-accent" /> História de Sucesso</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{p.godparentName} realizou o transplante em 2023 e hoje vive uma vida plena e saudável.
                Quer compartilhar essa experiência com você e te ajudar nessa jornada! 💚"
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Aguardando apadrinhamento</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Em breve você será apadrinhado por alguém que já passou pelo transplante e quer te ajudar nessa jornada. 💚
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientApadrinhamento;
