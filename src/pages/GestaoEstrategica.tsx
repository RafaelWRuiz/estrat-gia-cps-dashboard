import { useState, useMemo } from "react";
import { useGestao } from "@/context/GestaoContext";
import { eixos } from "@/data/problems";
import {
  calcularEstagio,
  prioridadeLabels,
  situacaoLabels,
  tipoEvidenciaLabels,
  statusAcaoLabels,
  resultadoLabels,
  estagioLabels,
  type ProblemaGestao,
  type Prioridade,
  type SituacaoProblema,
  type TipoEvidencia,
  type StatusAcao,
  type ResultadoAlcancado,
  type EstagioProblema,
} from "@/data/gestao-types";
import { Link } from "react-router-dom";
import {
  Search, FileText, Target, Play, GraduationCap, ArrowRight, ArrowLeft,
  Plus, ChevronRight, AlertTriangle, CheckCircle2, Clock, CircleDot,
  Moon, Sun, Home,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const schoolsByRegional: Record<string, string[]> = {
  "São Paulo": ["ETEC Paulistano", "ETEC Martin Luther King", "ETEC Albert Einstein", "ETEC Mandaqui"],
  Campinas: ["ETEC Bento Quirino", "ETEC Cons. Antônio Prado", "ETEC Polivalente"],
  Sorocaba: ["ETEC Rubens de Faria", "ETEC Fernando Prestes", "ETEC Botucatu"],
};
const allSchools = Object.values(schoolsByRegional).flat();

const prioridadeColors: Record<Prioridade, string> = {
  baixo: "bg-muted text-muted-foreground",
  medio: "bg-warning/15 text-warning",
  alto: "bg-destructive/15 text-destructive",
  critico: "bg-destructive/25 text-destructive font-bold",
};

const estagioIcons = [Search, FileText, Target, Play, GraduationCap];
const estagioKeys: EstagioProblema[] = [
  "problema_identificado", "com_evidencia", "meta_definida", "acoes_em_execucao", "resultado_avaliado",
];

// ────────────────────── Main Page ──────────────────────
const GestaoEstrategica = () => {
  const [selectedProblemaId, setSelectedProblemaId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [filterUnidade, setFilterUnidade] = useState("Todas");
  const [filterEixo, setFilterEixo] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [filterPrioridade, setFilterPrioridade] = useState("Todos");
  const [filterEstagio, setFilterEstagio] = useState("Todos");

  const ctx = useGestao();

  const filteredProblemas = useMemo(() => {
    return ctx.problemas.filter((p) => {
      if (filterUnidade !== "Todas" && p.unidadeEscolar !== filterUnidade) return false;
      if (filterEixo !== "Todos" && p.eixoEstrategico !== filterEixo) return false;
      if (filterStatus !== "Todos" && p.situacao !== filterStatus) return false;
      if (filterPrioridade !== "Todos" && p.prioridade !== filterPrioridade) return false;
      if (filterEstagio !== "Todos") {
        const estagio = calcularEstagio(p.id, ctx.evidencias, ctx.metas, ctx.acoes, ctx.avaliacoes);
        if (estagio !== filterEstagio) return false;
      }
      return true;
    });
  }, [ctx.problemas, ctx.evidencias, ctx.metas, ctx.acoes, ctx.avaliacoes, filterUnidade, filterEixo, filterStatus, filterPrioridade, filterEstagio]);

  const selectedProblema = selectedProblemaId
    ? ctx.problemas.find((p) => p.id === selectedProblemaId) || null
    : null;

  if (selectedProblema) {
    return (
      <PageShell>
        <ProblemaDetail
          problema={selectedProblema}
          onBack={() => { setSelectedProblemaId(null); setActiveTab("overview"); }}
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Gestão Estratégica — Alimentação do PPG</h2>
          <p className="text-xs text-muted-foreground">Ciclo: Realidade → Problema → Evidência → Meta SMART → Ações → Aprendizagem</p>
        </div>
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <Home className="h-3.5 w-3.5" /> Dashboard
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="text-xs">Visão Geral</TabsTrigger>
          <TabsTrigger value="problemas" className="text-xs">Problemas</TabsTrigger>
          <TabsTrigger value="metas-acoes" className="text-xs">Metas e Ações</TabsTrigger>
          <TabsTrigger value="avaliacao" className="text-xs">Avaliação e Aprendizagem</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewSection
            problemas={filteredProblemas}
            filterUnidade={filterUnidade}
            setFilterUnidade={setFilterUnidade}
            onAddProblema={() => setActiveTab("novo")}
          />
        </TabsContent>

        <TabsContent value="problemas">
          <ProblemasListSection
            problemas={filteredProblemas}
            filterUnidade={filterUnidade} setFilterUnidade={setFilterUnidade}
            filterEixo={filterEixo} setFilterEixo={setFilterEixo}
            filterStatus={filterStatus} setFilterStatus={setFilterStatus}
            filterPrioridade={filterPrioridade} setFilterPrioridade={setFilterPrioridade}
            filterEstagio={filterEstagio} setFilterEstagio={setFilterEstagio}
            onSelect={(id) => setSelectedProblemaId(id)}
            onAddProblema={() => setActiveTab("novo")}
          />
        </TabsContent>

        <TabsContent value="metas-acoes">
          <MetasAcoesSection
            problemas={filteredProblemas}
            filterUnidade={filterUnidade}
            setFilterUnidade={setFilterUnidade}
          />
        </TabsContent>

        <TabsContent value="avaliacao">
          <AvaliacaoSection
            problemas={filteredProblemas}
            filterUnidade={filterUnidade}
            setFilterUnidade={setFilterUnidade}
          />
        </TabsContent>

        <TabsContent value="novo">
          <CadastroProblemaForm
            onSaved={(id) => { setSelectedProblemaId(id); setActiveTab("overview"); }}
            onCancel={() => setActiveTab("overview")}
          />
        </TabsContent>
      </Tabs>
    </PageShell>
  );
};

// ────────────────────── Page Shell ──────────────────────
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header>
        <div className="h-1.5" style={{ background: 'linear-gradient(90deg, hsl(0, 100%, 35%) 0%, hsl(0, 70%, 50%) 50%, hsl(0, 45%, 60%) 100%)' }} />
        <div className="bg-card/80 backdrop-blur-sm border-b px-6 py-3 flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div className="flex-1">
            <h1 className="text-sm font-bold text-foreground leading-tight">PPG Estratégico CPS</h1>
            <span className="text-[10px] text-muted-foreground">Módulo de Gestão Estratégica</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-muted-foreground shrink-0">
            <span className="font-semibold">Ciclo PPG</span>
            <span>2024</span>
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary/60 w-[60%]" />
            </div>
            <span>2028</span>
            <span className="text-muted-foreground/70">Ano 3 de 5</span>
          </div>
          <button
            onClick={() => {
              const isDark = document.documentElement.classList.toggle("dark");
              localStorage.setItem("theme", isDark ? "dark" : "light");
            }}
            className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Sun className="h-4 w-4 text-muted-foreground dark:hidden" />
            <Moon className="h-4 w-4 text-muted-foreground hidden dark:block" />
          </button>
        </div>
      </header>
      <main className="flex-1 px-6 py-6 max-w-[1440px] w-full mx-auto view-transition">
        {children}
      </main>
      <footer className="px-6 py-4 text-center text-[10px] text-muted-foreground border-t bg-card/60 space-y-0.5">
        <p className="font-semibold">Centro Paula Souza — PPG Estratégico © 2026</p>
        <p>Proposta de dashboard desenvolvida pelo Prof. Rafael William Ruiz — ETEC Botucatu.</p>
        <p>Dados fictícios, utilizados exclusivamente para fins de estudo e simulação.</p>
      </footer>
    </div>
  );
}

// ────────────────────── Overview ──────────────────────
function OverviewSection({
  problemas,
  filterUnidade,
  setFilterUnidade,
  onAddProblema,
}: {
  problemas: ProblemaGestao[];
  filterUnidade: string;
  setFilterUnidade: (v: string) => void;
  onAddProblema: () => void;
}) {
  const ctx = useGestao();

  const stats = useMemo(() => {
    const ids = problemas.map((p) => p.id);
    const comEvidencia = ids.filter((id) => ctx.evidencias.some((e) => e.problemaId === id)).length;
    const comMeta = ids.filter((id) => ctx.metas.some((m) => m.problemaId === id)).length;
    const comAcao = ids.filter((id) =>
      ctx.acoes.some((a) => a.problemaId === id && (a.status === "em_execucao" || a.status === "concluida"))
    ).length;
    const comAvaliacao = ids.filter((id) => ctx.avaliacoes.some((a) => a.problemaId === id)).length;
    return { total: problemas.length, comEvidencia, comMeta, comAcao, comAvaliacao };
  }, [problemas, ctx.evidencias, ctx.metas, ctx.acoes, ctx.avaliacoes]);

  const steps = [
    { label: "Problemas registrados", value: stats.total, icon: Search },
    { label: "Com evidência", value: stats.comEvidencia, icon: FileText },
    { label: "Meta SMART definida", value: stats.comMeta, icon: Target },
    { label: "Ações em execução", value: stats.comAcao, icon: Play },
    { label: "Resultado avaliado", value: stats.comAvaliacao, icon: GraduationCap },
  ];

  return (
    <div className="space-y-6">
      {/* Filter + Add */}
      <div className="flex items-end gap-3 flex-wrap">
        <div className="space-y-1">
          <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Unidade</Label>
          <Select value={filterUnidade} onValueChange={setFilterUnidade}>
            <SelectTrigger className="h-8 text-xs w-48 bg-muted border-0"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="Todas" className="text-xs">Todas</SelectItem>
              {allSchools.map((s) => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" className="gap-1.5 text-xs" onClick={onAddProblema}>
          <Plus className="h-3.5 w-3.5" /> Adicionar novo problema
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 stagger-children">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Card key={step.label} className="card-hover">
              <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{step.value}</p>
                <p className="text-[10px] text-muted-foreground leading-tight font-medium">{step.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cycle flow */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Fluxo do Ciclo de Gestão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-0 overflow-x-auto py-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const pct = stats.total > 0 ? Math.round((step.value / stats.total) * 100) : 0;
              return (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5 min-w-[110px]">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${pct >= 100 ? "bg-success/15" : pct > 0 ? "bg-warning/15" : "bg-muted"}`}>
                      <Icon className={`h-5 w-5 ${pct >= 100 ? "text-success" : pct > 0 ? "text-warning" : "text-muted-foreground"}`} />
                    </div>
                    <span className="text-lg font-bold text-foreground">{step.value}</span>
                    <span className="text-[9px] text-muted-foreground text-center leading-tight">{step.label}</span>
                    <Progress value={pct} className="h-1 w-16" />
                  </div>
                  {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground/40 mx-1 shrink-0" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ────────────────────── Metas e Ações Section ──────────────────────
function MetasAcoesSection({
  problemas,
  filterUnidade,
  setFilterUnidade,
}: {
  problemas: ProblemaGestao[];
  filterUnidade: string;
  setFilterUnidade: (v: string) => void;
}) {
  const ctx = useGestao();
  const problemasComMeta = problemas.filter((p) =>
    ctx.metas.some((m) => m.problemaId === p.id)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3 flex-wrap">
        <FilterSelect label="Unidade" value={filterUnidade} onChange={setFilterUnidade}
          options={[{ value: "Todas", label: "Todas" }, ...allSchools.map((s) => ({ value: s, label: s }))]} />
      </div>

      {problemasComMeta.length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">Nenhuma meta definida com os filtros aplicados.</p>
      )}

      {problemasComMeta.map((p) => {
        const metas = ctx.metas.filter((m) => m.problemaId === p.id);
        const acoes = ctx.acoes.filter((a) => a.problemaId === p.id);
        return (
          <Card key={p.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`text-[10px] px-1.5 py-0 ${prioridadeColors[p.prioridade]}`}>
                  {prioridadeLabels[p.prioridade]}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{p.unidadeEscolar}</span>
              </div>
              <CardTitle className="text-sm">{p.descricao}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {metas.map((m) => {
                const metaAcoes = acoes.filter((a) => a.metaId === m.id);
                const pct = m.valorAlvo !== 0 ? Math.min(100, Math.round((m.valorAtual / m.valorAlvo) * 100)) : 0;
                return (
                  <div key={m.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">{m.descricao}</p>
                        <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-muted-foreground">
                          <span>Atual: {m.valorAtual}</span>
                          <span>Alvo: {m.valorAlvo}</span>
                          <span>Prazo: {m.prazoFinal}</span>
                          <span>Resp: {m.responsavel}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-foreground">{pct}%</span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                    {metaAcoes.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Ações ({metaAcoes.length})</p>
                        {metaAcoes.map((a) => (
                          <div key={a.id} className="flex items-center justify-between gap-2 p-2 bg-background rounded">
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-foreground">{a.descricao}</p>
                              <p className="text-[10px] text-muted-foreground">{a.responsavel} · {a.dataInicio} → {a.dataTermino}</p>
                            </div>
                            <Badge variant="outline" className="text-[10px] shrink-0">{statusAcaoLabels[a.status]}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// ────────────────────── Avaliação e Aprendizagem Section ──────────────────────
function AvaliacaoSection({
  problemas,
  filterUnidade,
  setFilterUnidade,
}: {
  problemas: ProblemaGestao[];
  filterUnidade: string;
  setFilterUnidade: (v: string) => void;
}) {
  const ctx = useGestao();
  const problemasComAvaliacao = problemas.filter((p) =>
    ctx.avaliacoes.some((a) => a.problemaId === p.id)
  );
  const problemasComAcoes = problemas.filter((p) =>
    ctx.acoes.some((a) => a.problemaId === p.id && (a.status === "concluida" || a.status === "em_execucao"))
  );
  const semAvaliacao = problemasComAcoes.filter(
    (p) => !ctx.avaliacoes.some((a) => a.problemaId === p.id)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3 flex-wrap">
        <FilterSelect label="Unidade" value={filterUnidade} onChange={setFilterUnidade}
          options={[{ value: "Todas", label: "Todas" }, ...allSchools.map((s) => ({ value: s, label: s }))]} />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{problemasComAvaliacao.length}</p>
            <p className="text-[10px] text-muted-foreground font-medium">Avaliações registradas</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{semAvaliacao.length}</p>
            <p className="text-[10px] text-muted-foreground font-medium">Pendentes de avaliação</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {ctx.avaliacoes.filter((a) => a.resultadoAlcancado === "sim").length}
            </p>
            <p className="text-[10px] text-muted-foreground font-medium">Resultados alcançados</p>
          </CardContent>
        </Card>
      </div>

      {problemasComAvaliacao.length === 0 && semAvaliacao.length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">Nenhum problema com ações concluídas para avaliar.</p>
      )}

      {problemasComAvaliacao.map((p) => {
        const avs = ctx.avaliacoes.filter((a) => a.problemaId === p.id);
        return (
          <Card key={p.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`text-[10px] px-1.5 py-0 ${prioridadeColors[p.prioridade]}`}>
                  {prioridadeLabels[p.prioridade]}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{p.unidadeEscolar}</span>
              </div>
              <CardTitle className="text-sm">{p.descricao}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {avs.map((a) => (
                <div key={a.id} className="p-3 bg-muted/50 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      Resultado: {resultadoLabels[a.resultadoAlcancado]}
                    </Badge>
                    {a.valorFinalIndicador != null && (
                      <span className="text-[10px] text-muted-foreground">Valor final: {a.valorFinalIndicador}</span>
                    )}
                  </div>
                  <p className="text-xs"><strong>Funcionou:</strong> {a.oqueFuncionou}</p>
                  <p className="text-xs"><strong>Não funcionou:</strong> {a.oqueNaoFuncionou}</p>
                  <p className="text-xs"><strong>Aprendizagem:</strong> {a.aprendizagemInstitucional}</p>
                  <p className="text-xs"><strong>Recomendações:</strong> {a.recomendacoes}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// ────────────────────── Problems List ──────────────────────
function ProblemasListSection({
  problemas,
  filterUnidade, setFilterUnidade,
  filterEixo, setFilterEixo,
  filterStatus, setFilterStatus,
  filterPrioridade, setFilterPrioridade,
  filterEstagio, setFilterEstagio,
  onSelect, onAddProblema,
}: {
  problemas: ProblemaGestao[];
  filterUnidade: string; setFilterUnidade: (v: string) => void;
  filterEixo: string; setFilterEixo: (v: string) => void;
  filterStatus: string; setFilterStatus: (v: string) => void;
  filterPrioridade: string; setFilterPrioridade: (v: string) => void;
  filterEstagio: string; setFilterEstagio: (v: string) => void;
  onSelect: (id: string) => void;
  onAddProblema: () => void;
}) {
  const ctx = useGestao();

  return (
    <div className="space-y-4">
      {/* Header + button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Problemas Registrados</h3>
        <Button size="sm" className="gap-1.5 text-xs" onClick={onAddProblema}>
          <Plus className="h-3.5 w-3.5" /> Novo Problema
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-end gap-3 flex-wrap">
        <FilterSelect label="Unidade" value={filterUnidade} onChange={setFilterUnidade}
          options={[{ value: "Todas", label: "Todas" }, ...allSchools.map((s) => ({ value: s, label: s }))]} />
        <FilterSelect label="Eixo" value={filterEixo} onChange={setFilterEixo}
          options={[{ value: "Todos", label: "Todos" }, ...eixos.map((e) => ({ value: e, label: e }))]} />
        <FilterSelect label="Situação" value={filterStatus} onChange={setFilterStatus}
          options={[
            { value: "Todos", label: "Todos" },
            ...Object.entries(situacaoLabels).map(([k, v]) => ({ value: k, label: v })),
          ]} />
        <FilterSelect label="Prioridade" value={filterPrioridade} onChange={setFilterPrioridade}
          options={[
            { value: "Todos", label: "Todos" },
            ...Object.entries(prioridadeLabels).map(([k, v]) => ({ value: k, label: v })),
          ]} />
        <FilterSelect label="Estágio" value={filterEstagio} onChange={setFilterEstagio}
          options={[
            { value: "Todos", label: "Todos" },
            ...Object.entries(estagioLabels).map(([k, v]) => ({ value: k, label: v })),
          ]} />
      </div>

      {problemas.length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">Nenhum problema encontrado com os filtros aplicados.</p>
      )}

      {/* Table-style list */}
      {problemas.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Descrição</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Eixo Estratégico</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Prioridade</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Estágio do Ciclo</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {problemas.map((p) => {
                    const estagio = calcularEstagio(p.id, ctx.evidencias, ctx.metas, ctx.acoes, ctx.avaliacoes);
                    const estagioIdx = estagioKeys.indexOf(estagio);
                    return (
                      <tr
                        key={p.id}
                        className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => onSelect(p.id)}
                      >
                        <td className="px-4 py-3">
                          <p className="text-xs font-semibold text-foreground">{p.descricao}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{p.unidadeEscolar}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-foreground">{p.eixoEstrategico}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`text-[10px] px-1.5 py-0 ${prioridadeColors[p.prioridade]}`}>
                            {prioridadeLabels[p.prioridade]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {situacaoLabels[p.situacao]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {estagioKeys.map((_, i) => (
                                <div key={i} className={`h-1.5 w-3 rounded-full ${i <= estagioIdx ? "bg-primary" : "bg-muted"}`} />
                              ))}
                            </div>
                            <span className="text-[9px] text-muted-foreground whitespace-nowrap">{estagioLabels[estagio]}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ────────────────────── Problem Detail (all stages) ──────────────────────
function ProblemaDetail({ problema, onBack }: { problema: ProblemaGestao; onBack: () => void }) {
  const ctx = useGestao();
  const estagio = calcularEstagio(problema.id, ctx.evidencias, ctx.metas, ctx.acoes, ctx.avaliacoes);
  const estagioIdx = estagioKeys.indexOf(estagio);

  const evidencias = ctx.evidencias.filter((e) => e.problemaId === problema.id);
  const metas = ctx.metas.filter((m) => m.problemaId === problema.id);
  const acoes = ctx.acoes.filter((a) => a.problemaId === problema.id);
  const avaliacoes = ctx.avaliacoes.filter((a) => a.problemaId === problema.id);

  const [showEvidDialog, setShowEvidDialog] = useState(false);
  const [showMetaDialog, setShowMetaDialog] = useState(false);
  const [showAcaoDialog, setShowAcaoDialog] = useState(false);
  const [showAvalDialog, setShowAvalDialog] = useState(false);

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 text-xs">
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`text-[10px] px-1.5 py-0 ${prioridadeColors[problema.prioridade]}`}>
              {prioridadeLabels[problema.prioridade]}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {situacaoLabels[problema.situacao]}
            </Badge>
          </div>
          <h3 className="text-base font-bold text-foreground">{problema.descricao}</h3>
          <p className="text-xs text-muted-foreground">{problema.unidadeEscolar} · {problema.eixoEstrategico}</p>
          {problema.indicadorRelacionado && (
            <p className="text-[10px] text-muted-foreground mt-1">Indicador: {problema.indicadorRelacionado}</p>
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {estagioKeys.map((key, i) => {
            const Icon = estagioIcons[i];
            return (
              <div key={key} className={`flex flex-col items-center gap-0.5 mx-1`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  i <= estagioIdx ? "bg-primary/15" : "bg-muted"
                }`}>
                  <Icon className={`h-4 w-4 ${i <= estagioIdx ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                {i < estagioKeys.length - 1 && <div className={`h-0.5 w-6 ${i < estagioIdx ? "bg-primary" : "bg-muted"} -mx-1 hidden md:block`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Progress value={((estagioIdx + 1) / estagioKeys.length) * 100} className="h-2 flex-1" />
            <span className="text-xs font-medium text-foreground">{estagioLabels[estagio]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Evidências */}
      <SectionCard title="Evidências" count={evidencias.length} onAdd={() => setShowEvidDialog(true)}>
        {evidencias.map((e) => (
          <div key={e.id} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px]">{tipoEvidenciaLabels[e.tipo]}</Badge>
              <span className="text-[10px] text-muted-foreground">{e.data}</span>
            </div>
            <p className="text-xs text-foreground">{e.descricao}</p>
            {e.valorIndicador != null && <p className="text-[10px] text-muted-foreground mt-0.5">Valor: {e.valorIndicador}</p>}
            {e.anexo && <p className="text-[10px] text-muted-foreground mt-0.5">📎 {e.anexo}</p>}
          </div>
        ))}
      </SectionCard>

      {/* Metas SMART */}
      <SectionCard title="Metas SMART" count={metas.length} onAdd={() => setShowMetaDialog(true)}>
        {metas.map((m) => (
          <div key={m.id} className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-semibold text-foreground">{m.descricao}</p>
            <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-muted-foreground">
              <span>Indicador: {m.indicadorResultado}</span>
              <span>Atual: {m.valorAtual}</span>
              <span>Alvo: {m.valorAlvo}</span>
              <span>Prazo: {m.prazoFinal}</span>
              <span>Resp: {m.responsavel}</span>
            </div>
            <div className="mt-2">
              <Progress value={m.valorAlvo !== 0 ? Math.min(100, (m.valorAtual / m.valorAlvo) * 100) : 0} className="h-1" />
            </div>
          </div>
        ))}
      </SectionCard>

      {/* Ações */}
      <SectionCard title="Plano de Ações" count={acoes.length} onAdd={() => setShowAcaoDialog(true)}>
        {acoes.map((a) => (
          <div key={a.id} className="p-3 bg-muted/50 rounded-lg flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">{a.descricao}</p>
              <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-muted-foreground">
                <span>Resp: {a.responsavel}</span>
                <span>{a.dataInicio} → {a.dataTermino}</span>
              </div>
              {a.observacoes && <p className="text-[10px] text-muted-foreground mt-1 italic">{a.observacoes}</p>}
            </div>
            <Badge variant="outline" className="text-[10px] shrink-0">{statusAcaoLabels[a.status]}</Badge>
          </div>
        ))}
      </SectionCard>

      {/* Avaliação */}
      <SectionCard title="Avaliação e Aprendizagem" count={avaliacoes.length} onAdd={() => setShowAvalDialog(true)}>
        {avaliacoes.map((a) => (
          <div key={a.id} className="p-3 bg-muted/50 rounded-lg space-y-1">
            <Badge variant="outline" className="text-[10px]">Resultado: {resultadoLabels[a.resultadoAlcancado]}</Badge>
            {a.valorFinalIndicador != null && <p className="text-[10px] text-muted-foreground">Valor final: {a.valorFinalIndicador}</p>}
            <p className="text-xs"><strong>Funcionou:</strong> {a.oqueFuncionou}</p>
            <p className="text-xs"><strong>Não funcionou:</strong> {a.oqueNaoFuncionou}</p>
            <p className="text-xs"><strong>Aprendizagem:</strong> {a.aprendizagemInstitucional}</p>
            <p className="text-xs"><strong>Recomendações:</strong> {a.recomendacoes}</p>
          </div>
        ))}
      </SectionCard>

      {/* Dialogs */}
      <EvidenciaDialog problemaId={problema.id} open={showEvidDialog} onClose={() => setShowEvidDialog(false)} />
      <MetaSmartDialog problemaId={problema.id} open={showMetaDialog} onClose={() => setShowMetaDialog(false)} />
      <AcaoDialog problemaId={problema.id} open={showAcaoDialog} onClose={() => setShowAcaoDialog(false)} />
      <AvaliacaoDialog problemaId={problema.id} open={showAvalDialog} onClose={() => setShowAvalDialog(false)} />
    </div>
  );
}

// ────────────────────── Cadastro Problema ──────────────────────
function CadastroProblemaForm({ onSaved, onCancel }: { onSaved: (id: string) => void; onCancel: () => void }) {
  const ctx = useGestao();
  const [unidade, setUnidade] = useState(allSchools[0]);
  const [eixo, setEixo] = useState(eixos[0]);
  const [descricao, setDescricao] = useState("");
  const [indicador, setIndicador] = useState("");
  const [prioridade, setPrioridade] = useState<Prioridade>("medio");
  const [situacao, setSituacao] = useState<SituacaoProblema>("aberto");

  const handleSave = () => {
    if (!descricao.trim()) return;
    const id = ctx.addProblema({
      unidadeEscolar: unidade,
      eixoEstrategico: eixo,
      descricao: descricao.trim(),
      indicadorRelacionado: indicador.trim() || undefined,
      prioridade,
      situacao,
    });
    onSaved(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Cadastrar Novo Problema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Unidade Escolar">
            <Select value={unidade} onValueChange={setUnidade}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {allSchools.map((s) => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Eixo Estratégico">
            <Select value={eixo} onValueChange={setEixo}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {eixos.map((e) => <SelectItem key={e} value={e} className="text-xs">{e}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <FormField label="Descrição do Problema">
          <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="text-xs min-h-[80px]" placeholder="Descreva o problema identificado..." />
        </FormField>
        <FormField label="Indicador Relacionado (opcional)">
          <Input value={indicador} onChange={(e) => setIndicador(e.target.value)} className="h-9 text-xs" placeholder="Ex: Taxa de evasão" />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Prioridade">
            <Select value={prioridade} onValueChange={(v) => setPrioridade(v as Prioridade)}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {Object.entries(prioridadeLabels).map(([k, v]) => <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Situação">
            <Select value={situacao} onValueChange={(v) => setSituacao(v as SituacaoProblema)}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {Object.entries(situacaoLabels).map(([k, v]) => <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={handleSave} disabled={!descricao.trim()} className="text-xs">Salvar Problema</Button>
          <Button size="sm" variant="ghost" onClick={onCancel} className="text-xs">Cancelar</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ────────────────────── Dialogs ──────────────────────
function EvidenciaDialog({ problemaId, open, onClose }: { problemaId: string; open: boolean; onClose: () => void }) {
  const ctx = useGestao();
  const [tipo, setTipo] = useState<TipoEvidencia>("indicador");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [anexo, setAnexo] = useState("");

  const handleSave = () => {
    if (!descricao.trim()) return;
    ctx.addEvidencia({
      problemaId,
      tipo,
      descricao: descricao.trim(),
      valorIndicador: valor ? Number(valor) : undefined,
      data,
      anexo: anexo.trim() || undefined,
    });
    setDescricao(""); setValor(""); setAnexo("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="text-sm">Adicionar Evidência</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <FormField label="Tipo de Evidência">
            <Select value={tipo} onValueChange={(v) => setTipo(v as TipoEvidencia)}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {Object.entries(tipoEvidenciaLabels).map(([k, v]) => <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Descrição">
            <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="text-xs min-h-[60px]" />
          </FormField>
          <FormField label="Valor do Indicador (opcional)">
            <Input type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="h-9 text-xs" />
          </FormField>
          <FormField label="Data">
            <Input type="date" value={data} onChange={(e) => setData(e.target.value)} className="h-9 text-xs" />
          </FormField>
          <FormField label="Anexo (opcional)">
            <Input value={anexo} onChange={(e) => setAnexo(e.target.value)} className="h-9 text-xs" placeholder="Nome do arquivo ou link do documento" />
          </FormField>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleSave} disabled={!descricao.trim()} className="text-xs">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MetaSmartDialog({ problemaId, open, onClose }: { problemaId: string; open: boolean; onClose: () => void }) {
  const ctx = useGestao();
  const [descricao, setDescricao] = useState("");
  const [indicador, setIndicador] = useState("");
  const [valorAtual, setValorAtual] = useState("");
  const [valorAlvo, setValorAlvo] = useState("");
  const [prazo, setPrazo] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = () => {
    const errs: string[] = [];
    if (!descricao.trim()) errs.push("Descrição obrigatória (Específica)");
    if (!indicador.trim() || !valorAtual || !valorAlvo) errs.push("Indicador + valores obrigatórios (Mensurável)");
    if (!prazo) errs.push("Prazo obrigatório (Temporal)");
    if (errs.length) { setErrors(errs); return; }
    ctx.addMeta({
      problemaId,
      descricao: descricao.trim(),
      indicadorResultado: indicador.trim(),
      valorAtual: Number(valorAtual),
      valorAlvo: Number(valorAlvo),
      prazoFinal: prazo,
      responsavel: responsavel.trim(),
    });
    setDescricao(""); setIndicador(""); setValorAtual(""); setValorAlvo(""); setPrazo(""); setResponsavel("");
    setErrors([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="text-sm">Definir Meta SMART</DialogTitle></DialogHeader>
        {errors.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-2 space-y-0.5">
            {errors.map((e, i) => <p key={i} className="text-[10px] text-destructive">⚠ {e}</p>)}
          </div>
        )}
        <div className="space-y-3">
          <FormField label="Descrição da Meta (Específica)">
            <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="text-xs min-h-[60px]" />
          </FormField>
          <FormField label="Indicador de Resultado (Mensurável)">
            <Input value={indicador} onChange={(e) => setIndicador(e.target.value)} className="h-9 text-xs" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Valor Atual">
              <Input type="number" value={valorAtual} onChange={(e) => setValorAtual(e.target.value)} className="h-9 text-xs" />
            </FormField>
            <FormField label="Valor Alvo">
              <Input type="number" value={valorAlvo} onChange={(e) => setValorAlvo(e.target.value)} className="h-9 text-xs" />
            </FormField>
          </div>
          <FormField label="Prazo Final (Temporal)">
            <Input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} className="h-9 text-xs" />
          </FormField>
          <FormField label="Responsável">
            <Input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} className="h-9 text-xs" />
          </FormField>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleSave} className="text-xs">Salvar Meta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AcaoDialog({ problemaId, open, onClose }: { problemaId: string; open: boolean; onClose: () => void }) {
  const ctx = useGestao();
  const metas = ctx.metas.filter((m) => m.problemaId === problemaId);
  const [metaId, setMetaId] = useState(metas[0]?.id || "");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [status, setStatus] = useState<StatusAcao>("planejada");
  const [observacoes, setObservacoes] = useState("");

  const handleSave = () => {
    if (!descricao.trim() || !metaId) return;
    ctx.addAcao({
      metaId,
      problemaId,
      descricao: descricao.trim(),
      responsavel: responsavel.trim(),
      dataInicio,
      dataTermino,
      status,
      observacoes: observacoes.trim(),
    });
    setDescricao(""); setResponsavel(""); setDataInicio(""); setDataTermino(""); setObservacoes("");
    onClose();
  };

  if (metas.length === 0) {
    return (
      <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="text-sm">Plano de Ações</DialogTitle></DialogHeader>
          <p className="text-xs text-muted-foreground py-4">Defina uma Meta SMART antes de cadastrar ações.</p>
          <DialogFooter><Button size="sm" variant="ghost" onClick={onClose} className="text-xs">Fechar</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="text-sm">Cadastrar Ação</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <FormField label="Meta vinculada">
            <Select value={metaId} onValueChange={setMetaId}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {metas.map((m) => <SelectItem key={m.id} value={m.id} className="text-xs">{m.descricao.slice(0, 60)}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Descrição da Ação">
            <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="text-xs min-h-[60px]" />
          </FormField>
          <FormField label="Responsável">
            <Input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} className="h-9 text-xs" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Data Início">
              <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="h-9 text-xs" />
            </FormField>
            <FormField label="Data Término">
              <Input type="date" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} className="h-9 text-xs" />
            </FormField>
          </div>
          <FormField label="Status">
            <Select value={status} onValueChange={(v) => setStatus(v as StatusAcao)}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {Object.entries(statusAcaoLabels).map(([k, v]) => <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Observações">
            <Textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} className="text-xs min-h-[40px]" />
          </FormField>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleSave} disabled={!descricao.trim()} className="text-xs">Salvar Ação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AvaliacaoDialog({ problemaId, open, onClose }: { problemaId: string; open: boolean; onClose: () => void }) {
  const ctx = useGestao();
  const [resultado, setResultado] = useState<ResultadoAlcancado>("parcial");
  const [valorFinal, setValorFinal] = useState("");
  const [funcionou, setFuncionou] = useState("");
  const [naoFuncionou, setNaoFuncionou] = useState("");
  const [aprendizagem, setAprendizagem] = useState("");
  const [recomendacoes, setRecomendacoes] = useState("");

  const handleSave = () => {
    if (!funcionou.trim() || !aprendizagem.trim()) return;
    ctx.addAvaliacao({
      problemaId,
      resultadoAlcancado: resultado,
      valorFinalIndicador: valorFinal ? Number(valorFinal) : undefined,
      oqueFuncionou: funcionou.trim(),
      oqueNaoFuncionou: naoFuncionou.trim(),
      aprendizagemInstitucional: aprendizagem.trim(),
      recomendacoes: recomendacoes.trim(),
    });
    setFuncionou(""); setNaoFuncionou(""); setAprendizagem(""); setRecomendacoes(""); setValorFinal("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle className="text-sm">Avaliação e Aprendizagem</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <FormField label="Resultado Alcançado">
            <Select value={resultado} onValueChange={(v) => setResultado(v as ResultadoAlcancado)}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {Object.entries(resultadoLabels).map(([k, v]) => <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Valor Final do Indicador (opcional)">
            <Input type="number" value={valorFinal} onChange={(e) => setValorFinal(e.target.value)} className="h-9 text-xs" />
          </FormField>
          <FormField label="O que funcionou">
            <Textarea value={funcionou} onChange={(e) => setFuncionou(e.target.value)} className="text-xs min-h-[50px]" />
          </FormField>
          <FormField label="O que não funcionou">
            <Textarea value={naoFuncionou} onChange={(e) => setNaoFuncionou(e.target.value)} className="text-xs min-h-[50px]" />
          </FormField>
          <FormField label="Aprendizagem Institucional">
            <Textarea value={aprendizagem} onChange={(e) => setAprendizagem(e.target.value)} className="text-xs min-h-[50px]" />
          </FormField>
          <FormField label="Recomendações para o próximo ciclo">
            <Textarea value={recomendacoes} onChange={(e) => setRecomendacoes(e.target.value)} className="text-xs min-h-[50px]" />
          </FormField>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleSave} disabled={!funcionou.trim() || !aprendizagem.trim()} className="text-xs">Salvar Avaliação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ────────────────────── Shared UI ──────────────────────
function SectionCard({ title, count, onAdd, children }: { title: string; count: number; onAdd: () => void; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-2 flex-row items-center justify-between">
        <CardTitle className="text-sm">{title} ({count})</CardTitle>
        <Button size="sm" variant="outline" className="gap-1 text-xs h-7" onClick={onAdd}>
          <Plus className="h-3 w-3" /> Adicionar
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {count === 0 && <p className="text-xs text-muted-foreground py-2">Nenhum registro.</p>}
        {children}
      </CardContent>
    </Card>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</Label>
      {children}
    </div>
  );
}

function FilterSelect({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-8 text-xs w-40 bg-muted border-0"><SelectValue /></SelectTrigger>
        <SelectContent className="bg-popover z-50">
          {options.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

export default GestaoEstrategica;
