import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Trophy, Users, Bell } from 'lucide-react';

const tabs = [
  { label: 'Início', icon: Home, path: '/paciente' },
  { label: 'Checklist', icon: ClipboardList, path: '/paciente/checklist' },
  { label: 'Jornada', icon: Trophy, path: '/paciente/jornada' },
  { label: 'Padrinho', icon: Users, path: '/paciente/apadrinhamento' },
  { label: 'Avisos', icon: Bell, path: '/paciente/notificacoes' },
];

const PatientLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <main className="flex-1 overflow-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {tabs.map(tab => {
            const active = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center gap-1 px-2 py-1 text-xs transition-colors ${
                  active ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                <tab.icon className={`h-5 w-5 ${active ? 'text-primary' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default PatientLayout;
