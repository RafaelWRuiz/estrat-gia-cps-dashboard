import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type {
  ProblemaGestao, Evidencia, MetaSmart, Acao, Avaliacao,
} from "@/data/gestao-types";

interface GestaoState {
  problemas: ProblemaGestao[];
  evidencias: Evidencia[];
  metas: MetaSmart[];
  acoes: Acao[];
  avaliacoes: Avaliacao[];
}

interface GestaoContextType extends GestaoState {
  addProblema: (p: Omit<ProblemaGestao, "id" | "criadoEm">) => string;
  addEvidencia: (e: Omit<Evidencia, "id">) => void;
  addMeta: (m: Omit<MetaSmart, "id">) => void;
  addAcao: (a: Omit<Acao, "id">) => void;
  addAvaliacao: (a: Omit<Avaliacao, "id">) => void;
  updateAcao: (id: string, updates: Partial<Acao>) => void;
}

const GestaoContext = createContext<GestaoContextType | null>(null);

const STORAGE_KEY = "ppg-gestao-data";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const sampleData: GestaoState = {
  problemas: [
    { id: "p1", unidadeEscolar: "ETEC Paulistano", eixoEstrategico: "Permanência e sucesso do aluno", descricao: "Alta evasão no 1º semestre", indicadorRelacionado: "Taxa de evasão", prioridade: "critico", situacao: "em_tratamento", criadoEm: "2025-03-01" },
    { id: "p2", unidadeEscolar: "ETEC Martin Luther King", eixoEstrategico: "Qualidade pedagógica", descricao: "Baixo índice de aprovação em Matemática", indicadorRelacionado: "Taxa de aprovação", prioridade: "alto", situacao: "em_analise", criadoEm: "2025-04-10" },
    { id: "p3", unidadeEscolar: "ETEC Bento Quirino", eixoEstrategico: "Infraestrutura", descricao: "Falta de laboratórios atualizados", prioridade: "medio", situacao: "aberto", criadoEm: "2025-05-15" },
    { id: "p4", unidadeEscolar: "ETEC Botucatu", eixoEstrategico: "Qualidade pedagógica", descricao: "Ausência de formação continuada docente", prioridade: "medio", situacao: "em_tratamento", criadoEm: "2025-02-20" },
  ],
  evidencias: [
    { id: "e1", problemaId: "p1", tipo: "indicador", descricao: "Evasão de 18% no 1º sem/2025", valorIndicador: 18, data: "2025-06-01" },
    { id: "e2", problemaId: "p2", tipo: "relatorio", descricao: "Aprovação de 52% em Matemática", valorIndicador: 52, data: "2025-06-15" },
    { id: "e3", problemaId: "p4", tipo: "observacao", descricao: "40% dos docentes sem capacitação no ano", valorIndicador: 40, data: "2025-05-01" },
  ],
  metas: [
    { id: "m1", problemaId: "p1", descricao: "Reduzir evasão de 18% para 10%", indicadorResultado: "Taxa de evasão", valorAtual: 18, valorAlvo: 10, prazoFinal: "2026-12-31", responsavel: "Coord. Pedagógico" },
    { id: "m2", problemaId: "p4", descricao: "Reduzir docentes sem capacitação de 40% para 10%", indicadorResultado: "% docentes capacitados", valorAtual: 40, valorAlvo: 10, prazoFinal: "2026-06-30", responsavel: "Direção" },
  ],
  acoes: [
    { id: "a1", metaId: "m1", problemaId: "p1", descricao: "Programa de tutoria para alunos em risco", responsavel: "Prof. Silva", dataInicio: "2025-08-01", dataTermino: "2026-06-30", status: "em_execucao", observacoes: "" },
    { id: "a2", metaId: "m1", problemaId: "p1", descricao: "Reforço escolar semanal", responsavel: "Coord. Pedagógico", dataInicio: "2025-09-01", dataTermino: "2026-06-30", status: "planejada", observacoes: "" },
    { id: "a3", metaId: "m2", problemaId: "p4", descricao: "Ciclo de workshops pedagógicos", responsavel: "Direção", dataInicio: "2025-07-01", dataTermino: "2025-12-31", status: "em_execucao", observacoes: "Primeiro módulo concluído" },
  ],
  avaliacoes: [],
};

function loadState(): GestaoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return sampleData;
}

export function GestaoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GestaoState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addProblema = useCallback((p: Omit<ProblemaGestao, "id" | "criadoEm">) => {
    const id = uid();
    setState((s) => ({
      ...s,
      problemas: [...s.problemas, { ...p, id, criadoEm: new Date().toISOString().slice(0, 10) }],
    }));
    return id;
  }, []);

  const addEvidencia = useCallback((e: Omit<Evidencia, "id">) => {
    setState((s) => ({ ...s, evidencias: [...s.evidencias, { ...e, id: uid() }] }));
  }, []);

  const addMeta = useCallback((m: Omit<MetaSmart, "id">) => {
    setState((s) => ({ ...s, metas: [...s.metas, { ...m, id: uid() }] }));
  }, []);

  const addAcao = useCallback((a: Omit<Acao, "id">) => {
    setState((s) => ({ ...s, acoes: [...s.acoes, { ...a, id: uid() }] }));
  }, []);

  const addAvaliacao = useCallback((a: Omit<Avaliacao, "id">) => {
    setState((s) => ({ ...s, avaliacoes: [...s.avaliacoes, { ...a, id: uid() }] }));
  }, []);

  const updateAcao = useCallback((id: string, updates: Partial<Acao>) => {
    setState((s) => ({
      ...s,
      acoes: s.acoes.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  }, []);

  return (
    <GestaoContext.Provider
      value={{ ...state, addProblema, addEvidencia, addMeta, addAcao, addAvaliacao, updateAcao }}
    >
      {children}
    </GestaoContext.Provider>
  );
}

export function useGestao() {
  const ctx = useContext(GestaoContext);
  if (!ctx) throw new Error("useGestao must be used within GestaoProvider");
  return ctx;
}
