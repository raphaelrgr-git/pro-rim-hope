export type TransplantStatus = 'Não iniciado' | 'Em preparo' | 'Inscrito' | 'Na Lista';
export type ExamStatus = 'Pendente' | 'Realizado' | 'Vencido';
export type ContactChannel = 'WhatsApp' | 'Telefone' | 'Presencial';
export type ContactOutcome = 'Compareceu' | 'Reagendou' | 'Sem retorno';
export type AlertPriority = 'Alta' | 'Média';

export interface ChecklistItem {
  id: string;
  name: string;
  status: ExamStatus;
  date?: string;
  description?: string;
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface ContactLog {
  id: string;
  date: string;
  channel: ContactChannel;
  notes: string;
  outcome: ContactOutcome;
}

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  dob: string;
  attendanceRate: number;
  absencesThisMonth: number;
  pendingExams: number;
  transplantStatus: TransplantStatus;
  transplantProgress: number;
  lastContact: string;
  nextSession: string;
  nextSessionTime: string;
  activeMeds: number;
  examsCompleted: number;
  totalExams: number;
  points: number;
  hasGodparent: boolean;
  godparentName?: string;
  contactLog: ContactLog[];
  checklist: ChecklistSection[];
  attendance: Record<string, 'present' | 'absent' | 'justified' | null>;
  badges: string[];
  accelerators: { godparent: boolean; psychoeducation: boolean };
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  description: string;
  priority: AlertPriority;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  icon: string;
  timestamp: string;
  read: boolean;
}

const buildChecklist = (progress: number): ChecklistSection[] => {
  const done: ExamStatus = 'Realizado';
  const pending: ExamStatus = 'Pendente';
  const expired: ExamStatus = 'Vencido';

  return [
    {
      title: 'Exames de Imagem',
      items: [
        { id: 'img1', name: 'Radiografia de Tórax', status: progress > 20 ? done : pending, date: progress > 20 ? '2025-11-10' : undefined, description: 'Avalia a saúde dos pulmões e do coração.' },
        { id: 'img2', name: 'Ultrassonografia Abdominal', status: progress > 40 ? done : pending, date: progress > 40 ? '2025-10-22' : undefined, description: 'Examina os órgãos abdominais para garantir que estão saudáveis.' },
        { id: 'img3', name: 'Eletrocardiograma', status: progress > 60 ? done : expired, date: progress > 60 ? '2024-08-15' : undefined, description: 'Verifica o ritmo e a atividade elétrica do coração.' },
      ],
    },
    {
      title: 'Exames Laboratoriais',
      items: [
        { id: 'lab1', name: 'Tipagem Sanguínea', status: progress > 10 ? done : pending, date: progress > 10 ? '2025-09-01' : undefined, description: 'Identifica seu tipo sanguíneo para compatibilidade.' },
        { id: 'lab2', name: 'Sorologias', status: progress > 30 ? done : pending, date: progress > 30 ? '2025-10-05' : undefined, description: 'Detecta infecções que podem afetar o transplante.' },
        { id: 'lab3', name: 'Hemograma Completo', status: progress > 50 ? done : pending, date: progress > 50 ? '2025-11-20' : undefined, description: 'Avalia as células do sangue e a saúde geral.' },
      ],
    },
    {
      title: 'Avaliações Clínicas',
      items: [
        { id: 'clin1', name: 'Avaliação Cardiológica', status: progress > 55 ? done : pending, date: progress > 55 ? '2025-10-18' : undefined, description: 'Consulta com cardiologista para avaliar o coração.' },
        { id: 'clin2', name: 'Avaliação Odontológica', status: progress > 65 ? done : pending, date: progress > 65 ? '2025-09-25' : undefined, description: 'Exame dentário para eliminar focos de infecção.' },
        { id: 'clin3', name: 'Avaliação Psicológica', status: progress > 75 ? done : pending, date: progress > 75 ? '2025-11-05' : undefined, description: 'Preparo emocional para a jornada do transplante.' },
      ],
    },
    {
      title: 'Documentação',
      items: [
        { id: 'doc1', name: 'Documentos Pessoais', status: progress > 15 ? done : pending, date: progress > 15 ? '2025-08-20' : undefined, description: 'RG, CPF e comprovante de residência atualizados.' },
        { id: 'doc2', name: 'Laudo Médico Atualizado', status: progress > 80 ? done : pending, date: progress > 80 ? '2025-11-15' : undefined, description: 'Relatório médico detalhando sua condição renal.' },
      ],
    },
  ];
};

const buildAttendance = (rate: number): Record<string, 'present' | 'absent' | 'justified' | null> => {
  const att: Record<string, 'present' | 'absent' | 'justified' | null> = {};
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      att[key] = null;
    } else {
      const rand = Math.random();
      att[key] = rand < rate / 100 ? 'present' : rand < (rate + 5) / 100 ? 'justified' : 'absent';
    }
  }
  return att;
};

export const patients: Patient[] = [
  {
    id: '1', name: 'Maria da Silva Santos', cpf: '123.456.789-00', dob: '1965-03-12',
    attendanceRate: 92, absencesThisMonth: 1, pendingExams: 3, transplantStatus: 'Em preparo',
    transplantProgress: 65, lastContact: '2026-03-28', nextSession: '2026-04-01', nextSessionTime: '07:30',
    activeMeds: 5, examsCompleted: 8, totalExams: 11, points: 340, hasGodparent: true, godparentName: 'Carlos',
    contactLog: [
      { id: 'c1', date: '2026-03-28', channel: 'WhatsApp', notes: 'Lembrete de sessão', outcome: 'Compareceu' },
      { id: 'c2', date: '2026-03-20', channel: 'Telefone', notes: 'Orientação sobre exames pendentes', outcome: 'Reagendou' },
    ],
    checklist: buildChecklist(65), attendance: buildAttendance(92),
    badges: ['Nunca Faltei'], accelerators: { godparent: true, psychoeducation: true },
  },
  {
    id: '2', name: 'José Carlos Oliveira', cpf: '234.567.890-11', dob: '1958-07-25',
    attendanceRate: 75, absencesThisMonth: 4, pendingExams: 6, transplantStatus: 'Em preparo',
    transplantProgress: 35, lastContact: '2026-03-15', nextSession: '2026-04-02', nextSessionTime: '13:00',
    activeMeds: 7, examsCompleted: 5, totalExams: 11, points: 120, hasGodparent: false,
    contactLog: [
      { id: 'c3', date: '2026-03-15', channel: 'Telefone', notes: 'Paciente relatou dificuldade de transporte', outcome: 'Sem retorno' },
    ],
    checklist: buildChecklist(35), attendance: buildAttendance(75),
    badges: [], accelerators: { godparent: false, psychoeducation: false },
  },
  {
    id: '3', name: 'Ana Beatriz Costa', cpf: '345.678.901-22', dob: '1972-11-08',
    attendanceRate: 98, absencesThisMonth: 0, pendingExams: 1, transplantStatus: 'Inscrito',
    transplantProgress: 90, lastContact: '2026-03-30', nextSession: '2026-04-01', nextSessionTime: '10:00',
    activeMeds: 4, examsCompleted: 10, totalExams: 11, points: 580, hasGodparent: true, godparentName: 'Fernanda',
    contactLog: [
      { id: 'c4', date: '2026-03-30', channel: 'Presencial', notes: 'Acompanhamento pré-inscrição na lista', outcome: 'Compareceu' },
      { id: 'c5', date: '2026-03-22', channel: 'WhatsApp', notes: 'Confirmação de laudo médico', outcome: 'Compareceu' },
    ],
    checklist: buildChecklist(90), attendance: buildAttendance(98),
    badges: ['Nunca Faltei', 'Campeão de Saúde'], accelerators: { godparent: true, psychoeducation: true },
  },
  {
    id: '4', name: 'Francisco Almeida Souza', cpf: '456.789.012-33', dob: '1980-01-30',
    attendanceRate: 60, absencesThisMonth: 6, pendingExams: 8, transplantStatus: 'Não iniciado',
    transplantProgress: 10, lastContact: '2026-03-10', nextSession: '2026-04-01', nextSessionTime: '15:30',
    activeMeds: 6, examsCompleted: 2, totalExams: 11, points: 45, hasGodparent: false,
    contactLog: [
      { id: 'c6', date: '2026-03-10', channel: 'Telefone', notes: 'Tentativa de contato sem sucesso', outcome: 'Sem retorno' },
    ],
    checklist: buildChecklist(10), attendance: buildAttendance(60),
    badges: [], accelerators: { godparent: false, psychoeducation: false },
  },
  {
    id: '5', name: 'Lúcia Fernandes Pereira', cpf: '567.890.123-44', dob: '1969-05-17',
    attendanceRate: 88, absencesThisMonth: 2, pendingExams: 4, transplantStatus: 'Em preparo',
    transplantProgress: 55, lastContact: '2026-03-25', nextSession: '2026-04-03', nextSessionTime: '08:00',
    activeMeds: 3, examsCompleted: 7, totalExams: 11, points: 260, hasGodparent: true, godparentName: 'Roberto',
    contactLog: [
      { id: 'c7', date: '2026-03-25', channel: 'WhatsApp', notes: 'Lembrete de exame cardiológico', outcome: 'Reagendou' },
    ],
    checklist: buildChecklist(55), attendance: buildAttendance(88),
    badges: ['Nunca Faltei'], accelerators: { godparent: true, psychoeducation: false },
  },
  {
    id: '6', name: 'Roberto Nascimento Lima', cpf: '678.901.234-55', dob: '1975-09-03',
    attendanceRate: 95, absencesThisMonth: 0, pendingExams: 0, transplantStatus: 'Na Lista',
    transplantProgress: 100, lastContact: '2026-03-29', nextSession: '2026-04-02', nextSessionTime: '07:30',
    activeMeds: 4, examsCompleted: 11, totalExams: 11, points: 720, hasGodparent: true, godparentName: 'Mariana',
    contactLog: [
      { id: 'c8', date: '2026-03-29', channel: 'Presencial', notes: 'Acompanhamento pós-inscrição', outcome: 'Compareceu' },
    ],
    checklist: buildChecklist(100), attendance: buildAttendance(95),
    badges: ['Nunca Faltei', 'Checklist Completo', 'Campeão de Saúde'], accelerators: { godparent: true, psychoeducation: true },
  },
  {
    id: '7', name: 'Antônia Ribeiro Gomes', cpf: '789.012.345-66', dob: '1962-12-20',
    attendanceRate: 70, absencesThisMonth: 5, pendingExams: 7, transplantStatus: 'Não iniciado',
    transplantProgress: 15, lastContact: '2026-03-12', nextSession: '2026-04-01', nextSessionTime: '11:00',
    activeMeds: 8, examsCompleted: 3, totalExams: 11, points: 80, hasGodparent: false,
    contactLog: [],
    checklist: buildChecklist(15), attendance: buildAttendance(70),
    badges: [], accelerators: { godparent: false, psychoeducation: false },
  },
  {
    id: '8', name: 'Pedro Henrique Martins', cpf: '890.123.456-77', dob: '1983-04-14',
    attendanceRate: 85, absencesThisMonth: 2, pendingExams: 5, transplantStatus: 'Em preparo',
    transplantProgress: 45, lastContact: '2026-03-27', nextSession: '2026-04-03', nextSessionTime: '14:00',
    activeMeds: 5, examsCompleted: 6, totalExams: 11, points: 190, hasGodparent: false,
    contactLog: [
      { id: 'c9', date: '2026-03-27', channel: 'WhatsApp', notes: 'Orientação sobre sorologias', outcome: 'Compareceu' },
    ],
    checklist: buildChecklist(45), attendance: buildAttendance(85),
    badges: [], accelerators: { godparent: false, psychoeducation: true },
  },
];

export const alerts: Alert[] = [
  { id: 'a1', patientId: '4', patientName: 'Francisco Almeida Souza', type: 'Faltas frequentes', description: '6 faltas nos últimos 14 dias', priority: 'Alta', date: '2026-03-31' },
  { id: 'a2', patientId: '7', patientName: 'Antônia Ribeiro Gomes', type: 'Faltas frequentes', description: '5 faltas nos últimos 14 dias', priority: 'Alta', date: '2026-03-31' },
  { id: 'a3', patientId: '2', patientName: 'José Carlos Oliveira', type: 'Faltas frequentes', description: '4 faltas nos últimos 14 dias', priority: 'Alta', date: '2026-03-31' },
  { id: 'a4', patientId: '3', patientName: 'Ana Beatriz Costa', type: 'Exame vencendo', description: 'Eletrocardiograma vence em 15 dias', priority: 'Média', date: '2026-03-31' },
  { id: 'a5', patientId: '2', patientName: 'José Carlos Oliveira', type: 'Preparo prolongado', description: '8 meses em preparo sem inscrição na lista', priority: 'Média', date: '2026-03-31' },
  { id: 'a6', patientId: '5', patientName: 'Lúcia Fernandes Pereira', type: 'Exame vencendo', description: 'Sorologias vencem em 25 dias', priority: 'Média', date: '2026-03-31' },
];

export const patientNotifications: Notification[] = [
  { id: 'n1', title: 'Próxima sessão de hemodiálise', description: 'Amanhã às 07:30 — não esqueça!', icon: 'calendar', timestamp: '2026-03-31T08:00:00', read: false },
  { id: 'n2', title: 'Exame pendente', description: 'Sua avaliação odontológica precisa ser agendada.', icon: 'alert', timestamp: '2026-03-30T14:00:00', read: false },
  { id: 'n3', title: 'Mensagem da equipe', description: 'A enfermeira Ana deixou um recado para você.', icon: 'message', timestamp: '2026-03-29T10:30:00', read: true },
  { id: 'n4', title: 'Parabéns! 🎉', description: 'Você ganhou 50 pontos por comparecer a todas as sessões esta semana!', icon: 'star', timestamp: '2026-03-28T16:00:00', read: true },
  { id: 'n5', title: 'Lembrete de medicamento', description: 'Não esqueça de tomar seu medicamento às 20h.', icon: 'pill', timestamp: '2026-03-28T09:00:00', read: true },
];

export const kpis = {
  totalPatients: patients.length,
  absencesThisMonth: patients.reduce((sum, p) => sum + p.absencesThisMonth, 0),
  pendingTransplant: patients.filter(p => p.transplantStatus === 'Em preparo').length,
  onList: patients.filter(p => p.transplantStatus === 'Na Lista' || p.transplantStatus === 'Inscrito').length,
};

export const currentPatient = patients[0]; // Maria da Silva Santos for demo
