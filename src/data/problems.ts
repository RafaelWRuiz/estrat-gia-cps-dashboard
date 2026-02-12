export interface Problem {
  id: number;
  problema: string;
  regional: string;
  escola: string;
  eixo: string;
  evidencia: string;
  metaSmart: string;
  status: "good" | "warning" | "critical";
  totalAcoes: number;
  acoesAtrasadas: number;
}

export const problems: Problem[] = [
  { id: 1, problema: "Alta evasão no 1º semestre", regional: "São Paulo", escola: "ETEC Paulistano", eixo: "Permanência e sucesso do aluno", evidencia: "Evasão de 18% no 1º sem/2025", metaSmart: "18% → 10% até dez/2026", status: "critical", totalAcoes: 5, acoesAtrasadas: 3 },
  { id: 2, problema: "Baixo índice de aprovação em Matemática", regional: "São Paulo", escola: "ETEC Martin Luther King", eixo: "Qualidade pedagógica", evidencia: "Aprovação de 52% em Matemática", metaSmart: "52% → 75% até jun/2026", status: "critical", totalAcoes: 4, acoesAtrasadas: 2 },
  { id: 3, problema: "Falta de laboratórios atualizados", regional: "Campinas", escola: "ETEC Bento Quirino", eixo: "Infraestrutura", evidencia: "3 de 5 labs sem manutenção há 2 anos", metaSmart: "3 labs → 5 labs até mar/2026", status: "warning", totalAcoes: 3, acoesAtrasadas: 1 },
  { id: 4, problema: "Baixa participação em eventos comunitários", regional: "Sorocaba", escola: "ETEC Fernando Prestes", eixo: "Relação com a comunidade", evidencia: "Apenas 2 eventos realizados no ano", metaSmart: "2 → 8 eventos até dez/2026", status: "critical", totalAcoes: 6, acoesAtrasadas: 4 },
  { id: 5, problema: "Processos administrativos sem padronização", regional: "São Paulo", escola: "ETEC Mandaqui", eixo: "Gestão e processos", evidencia: "67% dos processos sem fluxo definido", metaSmart: "67% → 20% até set/2026", status: "warning", totalAcoes: 4, acoesAtrasadas: 1 },
  { id: 6, problema: "Evasão em cursos noturnos", regional: "Campinas", escola: "ETEC Polivalente", eixo: "Permanência e sucesso do aluno", evidencia: "Evasão de 22% no noturno", metaSmart: "22% → 12% até dez/2026", status: "critical", totalAcoes: 5, acoesAtrasadas: 3 },
  { id: 7, problema: "Ausência de formação continuada docente", regional: "Sorocaba", escola: "ETEC Botucatu", eixo: "Qualidade pedagógica", evidencia: "40% dos docentes sem capacitação no ano", metaSmart: "40% → 10% até jun/2026", status: "warning", totalAcoes: 3, acoesAtrasadas: 0 },
  { id: 8, problema: "Rede elétrica defasada", regional: "São Paulo", escola: "ETEC Albert Einstein", eixo: "Infraestrutura", evidencia: "4 interrupções elétricas no semestre", metaSmart: "4 → 0 interrupções até mar/2026", status: "critical", totalAcoes: 2, acoesAtrasadas: 2 },
  { id: 9, problema: "Baixa empregabilidade dos egressos", regional: "Campinas", escola: "ETEC Cons. Antônio Prado", eixo: "Relação com a comunidade", evidencia: "38% dos egressos empregados na área", metaSmart: "38% → 65% até dez/2026", status: "warning", totalAcoes: 5, acoesAtrasadas: 2 },
  { id: 10, problema: "Demora na tramitação de documentos", regional: "Sorocaba", escola: "ETEC Rubens de Faria", eixo: "Gestão e processos", evidencia: "Prazo médio de 15 dias úteis", metaSmart: "15 → 5 dias úteis até jun/2026", status: "warning", totalAcoes: 3, acoesAtrasadas: 1 },
  { id: 11, problema: "Reprovação elevada no módulo técnico", regional: "São Paulo", escola: "ETEC Paulistano", eixo: "Qualidade pedagógica", evidencia: "Reprovação de 28% no módulo III", metaSmart: "28% → 12% até dez/2026", status: "critical", totalAcoes: 4, acoesAtrasadas: 2 },
  { id: 12, problema: "Falta de acessibilidade física", regional: "Campinas", escola: "ETEC Bento Quirino", eixo: "Infraestrutura", evidencia: "2 blocos sem rampa/elevador", metaSmart: "2 blocos → 0 até mar/2026", status: "warning", totalAcoes: 2, acoesAtrasadas: 0 },
  { id: 13, problema: "Baixa adesão ao conselho de escola", regional: "São Paulo", escola: "ETEC Martin Luther King", eixo: "Relação com a comunidade", evidencia: "Quórum médio de 30%", metaSmart: "30% → 70% até jun/2026", status: "warning", totalAcoes: 3, acoesAtrasadas: 1 },
  { id: 14, problema: "Controle de patrimônio desatualizado", regional: "Sorocaba", escola: "ETEC Fernando Prestes", eixo: "Gestão e processos", evidencia: "Inventário com 18 meses de atraso", metaSmart: "18 → 0 meses até set/2026", status: "critical", totalAcoes: 3, acoesAtrasadas: 3 },
  { id: 15, problema: "Abandono em estágio obrigatório", regional: "São Paulo", escola: "ETEC Mandaqui", eixo: "Permanência e sucesso do aluno", evidencia: "15% de desistência no estágio", metaSmart: "15% → 5% até dez/2026", status: "warning", totalAcoes: 4, acoesAtrasadas: 1 },
  { id: 16, problema: "Wifi instável nos blocos de aula", regional: "Campinas", escola: "ETEC Polivalente", eixo: "Infraestrutura", evidencia: "60% dos alunos reportam instabilidade", metaSmart: "60% → 10% até mar/2026", status: "critical", totalAcoes: 2, acoesAtrasadas: 1 },
  { id: 17, problema: "Falta de material didático atualizado", regional: "Sorocaba", escola: "ETEC Botucatu", eixo: "Qualidade pedagógica", evidencia: "35% dos materiais com mais de 5 anos", metaSmart: "35% → 5% até jun/2026", status: "warning", totalAcoes: 3, acoesAtrasadas: 0 },
  { id: 18, problema: "Ausência de parcerias com empresas", regional: "São Paulo", escola: "ETEC Albert Einstein", eixo: "Relação com a comunidade", evidencia: "Apenas 1 parceria formal ativa", metaSmart: "1 → 6 parcerias até dez/2026", status: "critical", totalAcoes: 4, acoesAtrasadas: 2 },
  { id: 19, problema: "Reuniões pedagógicas sem registro formal", regional: "Campinas", escola: "ETEC Cons. Antônio Prado", eixo: "Gestão e processos", evidencia: "70% sem ata ou encaminhamento", metaSmart: "70% → 0% até jun/2026", status: "warning", totalAcoes: 2, acoesAtrasadas: 0 },
  { id: 20, problema: "Alunos sem acesso a reforço escolar", regional: "Sorocaba", escola: "ETEC Rubens de Faria", eixo: "Permanência e sucesso do aluno", evidencia: "Nenhum programa de reforço ativo", metaSmart: "0 → 3 programas até mar/2026", status: "critical", totalAcoes: 3, acoesAtrasadas: 2 },
  { id: 21, problema: "Falta de plano de manutenção predial", regional: "São Paulo", escola: "ETEC Paulistano", eixo: "Infraestrutura", evidencia: "Sem cronograma preventivo", metaSmart: "0 → 1 plano ativo até jun/2026", status: "warning", totalAcoes: 2, acoesAtrasadas: 1 },
  { id: 22, problema: "Baixa taxa de conclusão no prazo", regional: "Campinas", escola: "ETEC Polivalente", eixo: "Permanência e sucesso do aluno", evidencia: "Apenas 55% concluem no prazo regular", metaSmart: "55% → 80% até dez/2026", status: "critical", totalAcoes: 5, acoesAtrasadas: 3 },
  { id: 23, problema: "Docentes sem plano de aula digital", regional: "São Paulo", escola: "ETEC Martin Luther King", eixo: "Qualidade pedagógica", evidencia: "72% usam apenas formato impresso", metaSmart: "72% → 20% até set/2026", status: "warning", totalAcoes: 3, acoesAtrasadas: 1 },
  { id: 24, problema: "Comunicação ineficiente com responsáveis", regional: "Sorocaba", escola: "ETEC Fernando Prestes", eixo: "Relação com a comunidade", evidencia: "Canal único (mural físico)", metaSmart: "1 → 3 canais até jun/2026", status: "warning", totalAcoes: 4, acoesAtrasadas: 2 },
  { id: 25, problema: "Sistema de chamada manual e inconsistente", regional: "Campinas", escola: "ETEC Bento Quirino", eixo: "Gestão e processos", evidencia: "Divergência de 12% entre registros", metaSmart: "12% → 2% até mar/2026", status: "critical", totalAcoes: 3, acoesAtrasadas: 2 },
];

export const eixos = [
  "Permanência e sucesso do aluno",
  "Qualidade pedagógica",
  "Gestão e processos",
  "Infraestrutura",
  "Relação com a comunidade",
];
