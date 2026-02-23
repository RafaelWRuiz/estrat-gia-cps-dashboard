export type Prioridade = "baixo" | "medio" | "alto" | "critico";
export type SituacaoProblema = "aberto" | "em_analise" | "em_tratamento" | "resolvido";
export type TipoEvidencia = "indicador" | "relatorio" | "observacao" | "outro";
export type StatusAcao = "planejada" | "em_execucao" | "concluida";
export type ResultadoAlcancado = "sim" | "parcial" | "nao";

export type EstagioProblema =
  | "problema_identificado"
  | "com_evidencia"
  | "meta_definida"
  | "acoes_em_execucao"
  | "resultado_avaliado";

export interface Evidencia {
  id: string;
  problemaId: string;
  tipo: TipoEvidencia;
  descricao: string;
  valorIndicador?: number;
  data: string;
  anexo?: string;
}

export interface MetaSmart {
  id: string;
  problemaId: string;
  descricao: string;
  indicadorResultado: string;
  valorAtual: number;
  valorAlvo: number;
  prazoFinal: string;
  responsavel: string;
}

export interface Acao {
  id: string;
  metaId: string;
  problemaId: string;
  descricao: string;
  responsavel: string;
  dataInicio: string;
  dataTermino: string;
  status: StatusAcao;
  observacoes: string;
}

export interface Avaliacao {
  id: string;
  problemaId: string;
  resultadoAlcancado: ResultadoAlcancado;
  valorFinalIndicador?: number;
  oqueFuncionou: string;
  oqueNaoFuncionou: string;
  aprendizagemInstitucional: string;
  recomendacoes: string;
}

export interface ProblemaGestao {
  id: string;
  unidadeEscolar: string;
  eixoEstrategico: string;
  descricao: string;
  indicadorRelacionado?: string;
  prioridade: Prioridade;
  situacao: SituacaoProblema;
  criadoEm: string;
}

export const prioridadeLabels: Record<Prioridade, string> = {
  baixo: "Baixo",
  medio: "Médio",
  alto: "Alto",
  critico: "Crítico",
};

export const situacaoLabels: Record<SituacaoProblema, string> = {
  aberto: "Aberto",
  em_analise: "Em análise",
  em_tratamento: "Em tratamento",
  resolvido: "Resolvido",
};

export const tipoEvidenciaLabels: Record<TipoEvidencia, string> = {
  indicador: "Indicador",
  relatorio: "Relatório",
  observacao: "Observação",
  outro: "Outro",
};

export const statusAcaoLabels: Record<StatusAcao, string> = {
  planejada: "Planejada",
  em_execucao: "Em execução",
  concluida: "Concluída",
};

export const resultadoLabels: Record<ResultadoAlcancado, string> = {
  sim: "Sim",
  parcial: "Parcial",
  nao: "Não",
};

export const estagioLabels: Record<EstagioProblema, string> = {
  problema_identificado: "Problema identificado",
  com_evidencia: "Com evidência",
  meta_definida: "Meta definida",
  acoes_em_execucao: "Ações em execução",
  resultado_avaliado: "Resultado avaliado",
};

export function calcularEstagio(
  problemaId: string,
  evidencias: Evidencia[],
  metas: MetaSmart[],
  acoes: Acao[],
  avaliacoes: Avaliacao[]
): EstagioProblema {
  const temAvaliacao = avaliacoes.some((a) => a.problemaId === problemaId);
  if (temAvaliacao) return "resultado_avaliado";

  const acoesDoProblema = acoes.filter((a) => a.problemaId === problemaId);
  const temAcaoEmExecucao = acoesDoProblema.some((a) => a.status === "em_execucao" || a.status === "concluida");
  if (temAcaoEmExecucao) return "acoes_em_execucao";

  const temMeta = metas.some((m) => m.problemaId === problemaId);
  if (temMeta) return "meta_definida";

  const temEvidencia = evidencias.some((e) => e.problemaId === problemaId);
  if (temEvidencia) return "com_evidencia";

  return "problema_identificado";
}
