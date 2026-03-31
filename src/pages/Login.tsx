import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import logoProRim from '@/assets/logo-pro-rim.jpg';

const Login = () => {
  const [mode, setMode] = useState<'patient' | 'clinical'>('patient');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-3">
          <img src={logoProRim} alt="Fundação Pró-Rim" className="h-24 mx-auto object-contain" />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-primary tracking-tight">Pró-Link</h1>
            <p className="text-muted-foreground text-sm">Acelerador de Esperança — Fundação Pró-Rim</p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex rounded-lg border bg-muted p-1">
          <button
            onClick={() => setMode('patient')}
            className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all ${
              mode === 'patient' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sou Paciente
          </button>
          <button
            onClick={() => setMode('clinical')}
            className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all ${
              mode === 'clinical' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Equipe Clínica
          </button>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6 space-y-4">
            {mode === 'patient' ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">CPF</label>
                  <Input placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Data de Nascimento</label>
                  <Input type="date" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">E-mail</label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Senha</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </>
            )}
            <Button className="w-full" size="lg">Entrar</Button>
          </CardContent>
        </Card>

        {/* Demo shortcuts */}
        <div className="space-y-2">
          <p className="text-center text-xs text-muted-foreground">Acesso rápido para demonstração</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => navigate('/paciente')}
            >
              Entrar como Paciente (Demo)
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => navigate('/clinica')}
            >
              Entrar como Clínica (Demo)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
