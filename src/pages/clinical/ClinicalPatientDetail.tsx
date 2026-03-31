import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, Plus } from 'lucide-react';
import { patients, type ExamStatus } from '@/data/mockData';

const statusBadge = (status: ExamStatus) => {
  switch (status) {
    case 'Realizado': return <Badge className="bg-success text-success-foreground">Realizado</Badge>;
    case 'Pendente': return <Badge className="bg-warning text-warning-foreground">Pendente</Badge>;
    case 'Vencido': return <Badge className="bg-accent text-accent-foreground">Vencido</Badge>;
  }
};

const ClinicalPatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find(p => p.id === id);

  if (!patient) return <p>Paciente não encontrado.</p>;

  const today = new Date();
  const days: { date: string; day: number; status: 'present' | 'absent' | 'justified' | null }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    days.push({ date: key, day: d.getDate(), status: patient.attendance[key] || null });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
          <p className="text-sm text-muted-foreground">CPF: {patient.cpf} · Nascimento: {patient.dob}</p>
        </div>
      </div>

      <Tabs defaultValue="aderencia">
        <TabsList>
          <TabsTrigger value="aderencia">Aderência</TabsTrigger>
          <TabsTrigger value="transplante">Transplante</TabsTrigger>
        </TabsList>

        <TabsContent value="aderencia" className="space-y-6">
          {/* Heatmap */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Frequência — Últimos 30 dias</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-10 gap-1">
                {days.map(d => (
                  <div
                    key={d.date}
                    title={`${d.date}: ${d.status || 'Sem sessão'}`}
                    className={`h-8 w-full rounded text-xs flex items-center justify-center font-medium ${
                      d.status === 'present' ? 'bg-success text-success-foreground' :
                      d.status === 'absent' ? 'bg-accent text-accent-foreground' :
                      d.status === 'justified' ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}
                  >
                    {d.day}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-success" /> Presente</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent" /> Faltou</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-warning" /> Justificada</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted" /> Sem sessão</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Log */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Registro de Contatos</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-3 w-3 mr-1" /> Registrar Contato</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Registrar Contato</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Data</label>
                      <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Canal</label>
                      <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                          <SelectItem value="Telefone">Telefone</SelectItem>
                          <SelectItem value="Presencial">Presencial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Observações</label>
                      <Textarea placeholder="Descreva o contato..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Desfecho</label>
                      <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Compareceu">Compareceu</SelectItem>
                          <SelectItem value="Reagendou">Reagendou</SelectItem>
                          <SelectItem value="Sem retorno">Sem retorno</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Salvar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Observações</TableHead>
                    <TableHead>Desfecho</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.contactLog.map(c => (
                    <TableRow key={c.id}>
                      <TableCell>{c.date}</TableCell>
                      <TableCell>{c.channel}</TableCell>
                      <TableCell>{c.notes}</TableCell>
                      <TableCell><Badge variant="outline">{c.outcome}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transplante" className="space-y-6">
          {/* Progress */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Progresso para Elegibilidade</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Progress value={patient.transplantProgress} className="flex-1 h-3" />
                <span className="text-lg font-bold text-foreground">{patient.transplantProgress}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Status: <Badge className="ml-1">{patient.transplantStatus}</Badge></p>
            </CardContent>
          </Card>

          {/* Checklist */}
          {patient.checklist.map(section => (
            <Card key={section.title}>
              <CardHeader><CardTitle className="text-base">{section.title}</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {section.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {item.status === 'Realizado' ? <CheckCircle2 className="h-4 w-4 text-success" /> :
                       item.status === 'Vencido' ? <AlertTriangle className="h-4 w-4 text-accent" /> :
                       <Clock className="h-4 w-4 text-warning" />}
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        {item.date && <p className="text-xs text-muted-foreground">{item.date}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusBadge(item.status)}
                      {item.status !== 'Realizado' && (
                        <Button size="sm" variant="outline">Marcar Realizado</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Accelerators */}
          <Card>
            <CardHeader><CardTitle className="text-base">Aceleradores Ativos</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Apadrinhado por transplantado</span>
                <Switch defaultChecked={patient.accelerators.godparent} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Psicoeducação realizada</span>
                <Switch defaultChecked={patient.accelerators.psychoeducation} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicalPatientDetail;
