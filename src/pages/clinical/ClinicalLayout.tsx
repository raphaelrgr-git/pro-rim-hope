import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ClinicalSidebar } from '@/components/ClinicalSidebar';
import logoProRim from '@/assets/logo-pro-rim.jpg';

const ClinicalLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ClinicalSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b px-4 gap-3 bg-background">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <img src={logoProRim} alt="Pró-Rim" className="h-8 object-contain" />
              <span className="font-semibold text-primary text-sm">Pró-Link</span>
            </div>
            <span className="text-xs text-muted-foreground">Painel Clínico</span>
          </header>
          <main className="flex-1 p-6 bg-secondary/30 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ClinicalLayout;
