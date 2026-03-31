

# Pró-Link — Fundação Pró-Rim

A dual-experience web app connecting clinical teams and patients to reduce hemodialysis absences and accelerate kidney transplant enrollment.

## Design System
- **Primary**: Dark green (#1a5c2a), **Accent**: Red (#cc0000), **Background**: White
- Brazilian Portuguese throughout
- Clinical view: formal, data-dense with sidebar navigation
- Patient view: warm, mobile-first with bottom tab bar

---

## Pages & Features

### 1. Login Page
- Pró-Link logo (kidney icon + brand text) with subtitle "Acelerador de Esperança"
- Toggle between "Sou Paciente" (CPF + date of birth) and "Equipe Clínica" (email + password)
- Demo shortcut buttons for instant access to either experience

### 2. Clinical Team Experience (Sidebar nav)

**Dashboard** — 4 KPI cards (Total Pacientes, Faltas, Pendências, Inscritos na Lista) + two panels: Alertas de Faltas (contact list) and Fila do Transplante (progress bars)

**Pacientes** — Full table with attendance rate, pending exams, transplant status, filter tabs (Todos / Alerta de Falta / Pendência Transplante / Na Lista)

**Patient Detail** — Two tabs:
- *Aderência*: 30-day attendance heatmap, contact log, "Registrar Contato" modal
- *Transplante*: Eligibility progress bar, exam checklist with status badges, accelerator toggles

**Alertas** — Prioritized alert list with severity badges and action buttons

### 3. Patient Experience (Bottom tab bar)

**Dashboard** — Greeting header, 4 info cards (next session, meds, exams done, points), transplant progress bar with motivational message, upcoming appointments

**Meu Checklist** — Read-only exam checklist with expandable sections, progress ring, friendly explanations for pending items

**Minha Jornada** — Gamification: points balance, achievement badges (Nunca Faltei, Checklist Completo, Campeão de Saúde), progress toward next badge

**Apadrinhamento** — Godparent pairing: show matched transplanted patient or waiting message with warm placeholder

**Notificações** — Reminder list with icons and timestamps

### 4. Mock Data
- Realistic Brazilian patient names, CPFs, exam dates, attendance records
- Pre-populated dashboard metrics, checklist items, contact logs, and alerts

