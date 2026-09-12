import { Calculator, ArrowLeftRight, Scale, Repeat, Receipt } from "lucide-react"

export function AdvancedIndicators() {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Cálculos e Indicadores Avançados de Performance
        </h3>
        <span className="text-xs text-muted-foreground">Calibrados pelo Objetivo: Vendas & Performance</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* CAC Real vs Meta */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Receipt className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">CAC Real vs Meta</div>
          <div className="text-xl font-bold text-foreground">R$ 14,22</div>
          <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Meta: R$ 18,00 (+21% margem)
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">Custo de aquisição controlado e favorável.</p>
        </div>

        {/* LTV / CAC Ratio */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">LTV / CAC Ratio</div>
          <div className="text-xl font-bold text-foreground">4.2x</div>
          <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" /> Excelente ({">"} 3.0x recomendado)
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">Retorno no ciclo de vida do cliente saudável.</p>
        </div>

        {/* Breakeven ROAS */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Scale className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Breakeven ROAS</div>
          <div className="text-xl font-bold text-foreground">1,80x</div>
          <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-1">
            <span className="flex items-center justify-center h-3 w-3 rounded bg-emerald-500/20 text-emerald-500"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span> Margem Segurança: 62,6%
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">ROAS Real (4.82x) bem acima do ponto de equilíbrio.</p>
        </div>

        {/* Frequência / Fadiga */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Repeat className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Frequência / Fadiga</div>
          <div className="text-xl font-bold text-foreground">2.0x</div>
          <div className="text-xs font-semibold text-blue-500 flex items-center gap-1 mt-1">
            <span className="flex items-center justify-center h-3 w-3 rounded bg-blue-500/20 text-blue-500"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span> Saturação baixa (12% fadiga)
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">Espaço aberto para escala sem exaustão criativa.</p>
        </div>

        {/* Ticket Médio */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Receipt className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Ticket Médio (AOV)</div>
          <div className="text-xl font-bold text-foreground">R$ 68,40</div>
          <div className="text-xs font-semibold text-primary flex items-center gap-1 mt-1">
            <Receipt className="h-3 w-3" /> Receita: R$ 233.928
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">3.420 transações faturadas no período.</p>
        </div>

      </div>
    </div>
  )
}

function CheckCircle2(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}
