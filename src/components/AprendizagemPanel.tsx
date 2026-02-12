import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface Learning {
  titulo: string;
  descricao: string;
  impacto: string;
  tipo: "positivo" | "atencao";
  escola: string;
  regional: string;
}

const learnings: Learning[] = [
  { titulo: "Reorganização de horários reduziu atrasos em 30%", descricao: "A redistribuição das aulas práticas para o início do turno diminuiu significativamente os atrasos dos alunos.", impacto: "Atrasos: 42% → 12%", tipo: "positivo", escola: "ETEC Paulistano", regional: "São Paulo" },
  { titulo: "Projeto de monitoria aumentou aprovação em Matemática", descricao: "Monitores voluntários do 3º módulo atuaram com alunos do 1º módulo, elevando a taxa de aprovação.", impacto: "Aprovação: 52% → 74%", tipo: "positivo", escola: "ETEC Martin Luther King", regional: "São Paulo" },
  { titulo: "Canal com responsáveis reduziu evasão", descricao: "Implantação de grupo de comunicação com pais e responsáveis permitiu intervenção precoce em casos de risco.", impacto: "Evasão: 18% → 11%", tipo: "positivo", escola: "ETEC Fernando Prestes", regional: "Sorocaba" },
  { titulo: "Necessidade de reforço administrativo em duas unidades", descricao: "Sobrecarga da equipe administrativa resultou em atrasos na emissão de documentos e falhas no controle de frequência.", impacto: "Prazo médio: 5 → 15 dias", tipo: "atencao", escola: "ETEC Bento Quirino", regional: "Campinas" },
  { titulo: "Capacitação docente em metodologias ativas elevou engajamento", descricao: "Oficinas de aprendizagem baseada em projetos aumentaram a participação ativa dos alunos em sala.", impacto: "Engajamento: +35%", tipo: "positivo", escola: "FATEC Sorocaba", regional: "Sorocaba" },
  { titulo: "Parceria com empresa local gerou estágios", descricao: "Convênio firmado com indústria da região abriu 40 vagas de estágio para alunos do curso técnico.", impacto: "40 vagas abertas", tipo: "positivo", escola: "FATEC Campinas", regional: "Campinas" },
  { titulo: "Falta de manutenção preventiva gerou interdições", descricao: "Dois laboratórios foram interditados por falta de manutenção elétrica preventiva, afetando 120 alunos.", impacto: "2 labs interditados", tipo: "atencao", escola: "ETEC Albert Einstein", regional: "São Paulo" },
];

interface AprendizagemPanelProps {
  filterEscola?: string;
  filterRegional?: string;
}

const AprendizagemPanel = ({ filterEscola, filterRegional }: AprendizagemPanelProps) => {
  const filtered = learnings.filter((l) => {
    if (filterEscola && !l.escola.includes(filterEscola)) return false;
    if (filterRegional && l.regional !== filterRegional) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <p className="text-xs text-muted-foreground italic py-4 text-center">
        Nenhuma aprendizagem registrada para esta unidade.
      </p>
    );
  }

  return (
    <div className="w-full space-y-3">
      {filtered.map((l, i) => (
        <div
          key={i}
          className="flex gap-3 bg-background rounded-md p-4 transition-shadow duration-200"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className={`shrink-0 mt-0.5 h-8 w-8 rounded-full flex items-center justify-center ${l.tipo === "positivo" ? "bg-success/10" : "bg-warning/15"}`}>
            {l.tipo === "positivo" ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-warning" />
            )}
          </div>
          <div className="flex-1 space-y-1.5">
            <h4 className="text-xs font-bold text-foreground leading-snug">{l.titulo}</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{l.descricao}</p>
            <div className="flex items-center gap-4 pt-1 flex-wrap">
              <span className={`text-[10px] font-semibold flex items-center gap-1 ${l.tipo === "positivo" ? "text-success" : "text-warning"}`}>
                <ArrowRight className="h-3 w-3" />
                {l.impacto}
              </span>
              <span className="text-[10px] text-muted-foreground">{l.escola} · {l.regional}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AprendizagemPanel;
