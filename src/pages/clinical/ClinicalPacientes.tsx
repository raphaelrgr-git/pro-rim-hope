import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { patients, type TransplantStatus } from '@/data/mockData';
import { Eye } from 'lucide-react';

const statusColor = (status: TransplantStatus) => {
  switch (status) {
    case 'Não iniciado': return 'bg-muted text-muted-foreground';
    case 'Em preparo': return 'bg-warning text-warning-foreground';
    case 'Inscrito': return 'bg-primary text-primary-foreground';
    case 'Na Lista': return 'bg-success text-success-foreground';
  }
};

const ClinicalPacientes = () => {
  const [tab, setTab] = useState('todos');
  const navigate = useNavigate();

  const filtered = patients.filter(p => {
    if (tab === 'todos') return true;
    if (tab === 'faltas') return p.absencesThisMonth >= 2;
    if (tab === 'pendencia') return p.transplantStatus === 'Em preparo' || p.transplantStatus === 'Não iniciado';
    if (tab === 'lista') return p.transplantStatus === 'Na Lista' || p.transplantStatus === 'Inscrito';
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Pacientes</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="faltas">Alerta de Falta</TabsTrigger>
          <TabsTrigger value="pendencia">Pendência Transplante</TabsTrigger>
          <TabsTrigger value="lista">Na Lista</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Aderência</TableHead>
                <TableHead>Exames Pend.</TableHead>
                <TableHead>Status Transplante</TableHead>
                <TableHead>Último Contato</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>
                    <span className={p.attendanceRate < 80 ? 'text-accent font-semibold' : ''}>{p.attendanceRate}%</span>
                  </TableCell>
                  <TableCell>{p.pendingExams}</TableCell>
                  <TableCell>
                    <Badge className={statusColor(p.transplantStatus)}>{p.transplantStatus}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{p.lastContact}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/clinica/pacientes/${p.id}`)}>
                      <Eye className="h-3 w-3 mr-1" /> Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalPacientes;
