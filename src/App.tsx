import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import ClinicalLayout from "./pages/clinical/ClinicalLayout";
import ClinicalDashboard from "./pages/clinical/ClinicalDashboard";
import ClinicalPacientes from "./pages/clinical/ClinicalPacientes";
import ClinicalPatientDetail from "./pages/clinical/ClinicalPatientDetail";
import ClinicalAlertas from "./pages/clinical/ClinicalAlertas";
import PatientLayout from "./pages/patient/PatientLayout";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientChecklist from "./pages/patient/PatientChecklist";
import PatientJornada from "./pages/patient/PatientJornada";
import PatientApadrinhamento from "./pages/patient/PatientApadrinhamento";
import PatientNotificacoes from "./pages/patient/PatientNotificacoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Clinical */}
          <Route path="/clinica" element={<ClinicalLayout />}>
            <Route index element={<ClinicalDashboard />} />
            <Route path="pacientes" element={<ClinicalPacientes />} />
            <Route path="pacientes/:id" element={<ClinicalPatientDetail />} />
            <Route path="alertas" element={<ClinicalAlertas />} />
          </Route>

          {/* Patient */}
          <Route path="/paciente" element={<PatientLayout />}>
            <Route index element={<PatientDashboard />} />
            <Route path="checklist" element={<PatientChecklist />} />
            <Route path="jornada" element={<PatientJornada />} />
            <Route path="apadrinhamento" element={<PatientApadrinhamento />} />
            <Route path="notificacoes" element={<PatientNotificacoes />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
