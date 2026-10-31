import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const TechnologyArchitecture: React.FC = () => {
  const { isDark } = useTheme();

  const techNodes = [
    {
      id: 'langgraph',
      name: 'LangGraph',
      role: 'Workflow State Machine',
      desc: 'Coordinates specialist agents and research workflows with checkpointing and state persistence.',
      icon: 'account_tree',
    },
    {
      id: 'hybrid-rag',
      name: 'Hybrid RAG',
      role: 'Dual-Vector Retrieval',
      desc: 'Combines dense semantic retrieval and sparse BM25 keyword search for pinpoint legal statutory accuracy.',
      icon: 'sync_alt',
    },
    {
      id: 'knowledge-graph',
      name: 'Knowledge Graph',
      role: 'Entity & Authority Topology',
      desc: 'Represents relationships between legal entities, statutory provisions, precedents, and judicial concepts.',
      icon: 'hub',
    },
    {
      id: 'mcp-tools',
      name: 'MCP Tools',
      role: 'Model Context Protocol',
      desc: 'Provides structured, sandboxed connections to external judicial tools, gazettes, and legal databases.',
      icon: 'extension',
    },
    {
      id: 'agent-orchestration',
      name: 'Agent Orchestration',
      role: 'Specialist Sub-agents',
      desc: 'Coordinates specialized agents (Statutory, Precedent, Citation, Report) through bounded iterations.',
      icon: 'groups',
    },
    {
      id: 'harness-engineering',
      name: 'Harness Engineering',
      role: 'Validation & Governance',
      desc: 'Supports controlled execution, evidence sufficiency gates, uncertainty tracking, and human review interrupts.',
      icon: 'security',
    },
  ];

  return (
    <section id="technology" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-widest border mb-4 ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#064E3B]'
            }`}
          >
            <span>SYSTEM ARCHITECTURE</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-headline mb-5 ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Intelligence with a system behind it.
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
            }`}
          >
            LegalLens AI is engineered on deterministic state machine principles, multi-agent coordination, and verifiable retrieval pipelines.
          </p>
        </div>

        {/* Central Orchestration Architecture Visual */}
        <div className="relative mb-14">
          {/* Ambient center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Central Hub Card */}
          <div className="max-w-xl mx-auto mb-10 relative z-10">
            <div
              className={`rounded-2xl p-6 sm:p-7 border text-center transition-all shadow-xl relative overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-b from-[#13251E] to-[#0A1410] border-emerald-400/40 shadow-[0_0_35px_rgba(16,185,129,0.2)]'
                  : 'bg-white border-[#059669]/30 shadow-[0_10px_30px_rgba(5,150,105,0.12)]'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 mb-3 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>CORE STATE MACHINE</span>
              </div>
              <h3 className="text-2xl font-black font-headline tracking-tight mb-2">
                LegalLens AI — Orchestration
              </h3>
              <p
                className={`text-xs sm:text-[13px] leading-relaxed max-w-md mx-auto ${
                  isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'
                }`}
              >
                Central state machine managing workflow transitions, checkpointing, evidence sufficiency evaluations, and bounded retrieval cycles.
              </p>
            </div>
          </div>

          {/* 6 Connected Nodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {techNodes.map((node) => (
              <div
                key={node.id}
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-400/50 hover:bg-[#13251E] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                    : 'bg-white border-[rgba(5,150,105,0.16)] hover:border-[#059669] hover:bg-[#F4F8F6]/80 shadow-[0_4px_16px_rgba(5,150,105,0.06)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all group-hover:scale-105 ${
                        isDark
                          ? 'bg-[#060D0A] border-emerald-500/30 text-emerald-400'
                          : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#059669]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{node.icon}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold uppercase">
                      {node.role}
                    </span>
                  </div>

                  <h4
                    className={`text-lg font-bold font-headline mb-2 transition-colors ${
                      isDark ? 'text-white group-hover:text-emerald-300' : 'text-[#0F172A] group-hover:text-[#059669]'
                    }`}
                  >
                    {node.name}
                  </h4>

                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
                    }`}
                  >
                    {node.desc}
                  </p>
                </div>

                <div
                  className={`pt-3 border-t text-[11px] font-mono flex items-center gap-1.5 ${
                    isDark ? 'border-emerald-500/10 text-[#7E9F90]' : 'border-[rgba(5,150,105,0.12)] text-[#52796F]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px] text-emerald-500">link</span>
                  <span>Connected to Central Orchestrator</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
